'use strict'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')
const name = '叫号大屏'
const port = process.env.port || process.env.npm_config_port || 8899 // dev port

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: isProduction ? '/' : './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://120.78.194.238:9999', // Set the domain name and port number of the interface you call
        changeOrigin: true, // cross domain
        pathRewrite: {
          '^/api': '/api'
        }
      },
      // [process.env.VUE_APP_BASE_API]: {
      '/mock': {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: function() {
      require('./mock/mock-server.js')
    }
  },
  // chainWebpack 这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则
  // 和具名插件，可以通过其提供的一些方法链式调用，在cli-service中就使用了这个插件
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = name
      return args
    })
  },
  /*
    configureWebpack是调整webpack配置最简单的一种方式，可以新增也可以覆盖cli中的配置。
    可以是一个对象：被 webpack-merge 合并到webpack 的设置中去
    也可以是一个函数：如果你需要基于环境有条件地配置行为，就可以进行一些逻辑处理，可以直接修改或新增配置，(该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。
    在函数内，你可以直接修改配置，或者返回一个将会被合并的对象。
  */
  configureWebpack: config => {
    // gzip 压缩js css json
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css', 'json'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    config.resolve.alias['@'] = resolve('src')
    config.resolve.alias['@components'] = resolve('src/components')
    config.resolve.alias['@views'] = resolve('src/views')
    config.resolve.alias['@assets'] = resolve('src/assets')
    config.resolve.alias['@axios'] = resolve('src/axios')
    config.resolve.alias['@plugin'] = resolve('src/plugin')
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/css/index.scss";'
      }
    }
  }
}
