
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 开启gzip压缩， 按需引用
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包分析

const apiConfig = require('./src/api.config')
const path = require('path')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const title = 'vue-cyan-pro'
const devPort = 8081
const MY_ENV = process.env.MY_ENV
const resolve = (dir) => path.join(__dirname, dir)
const mockServer = () => {
  if (process.env.NODE_ENV === 'development') return require('./mock3/mock-server.js')
  else return ''
}

process.env.VUE_APP_TITLE = title || 'vue-cyan'

module.exports = {
  publicPath: IS_PROD ? '/' : './', // 开发以及部署时的URL
  indexPath: 'index.html', // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  lintOnSave: true, // 开发环境每次保存时是否输出为eslint编译警告
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  pwa: {}, // 向 PWA 插件传递选项。
  devServer: {
    hot: true,
    port: devPort,
    open: true, // 配置自动启动浏览器
    noInfo: false,
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: false,
      errors: true
    },
    // before: mockServer(),
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
        target: `http://localhost:3300`,
        changeOrigin: true,
        pathRewrite: {
          '^/mock': ''
        }
      }
      //      '/jianshu': {
      //        target: apiConfig(MY_ENV, 'jianshu'),
      //        secure: true,
      //        changeOrigin: true,
      //        pathRewrite: {
      //          '^/jianshu': ''
      //        },
      //        onProxyReq(proxyReq) {
      //          proxyReq.setHeader('Accept', '*/*')
      //        }
      //      }
    }
  },

  // chainWebpack 这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则
  // 和具名插件，可以通过其提供的一些方法链式调用，在cli-service中就使用了这个插件

  chainWebpack: config => {
    config.resolve.symlinks(true) // 修复热更新失效
    // config.plugin('html').tap(args => {
    //   args[0].title = name
    //   return args
    // })
    config.plugin('define')
      .tap(args => {
      // MY_ENV定义在了package.json，process.env.MY_ENV在全局使用
        Object.assign(args[0]['process.env'], {
          MY_ENV: JSON.stringify(MY_ENV)
        })
        return args
      })
      .end()
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@axios', resolve('src/axios'))
      .set('@plugin', resolve('src/plugin'))
    // 压缩图片
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     mozjpeg: { progressive: true, quality: 65 },
    //     optipng: { enabled: false },
    //     pngquant: { quality: [0.65, 0.9], speed: 4 },
    //     gifsicle: { interlaced: false },
    //     webp: { quality: 75 }
    //   })
    // 打包分析
    // 打包之后自动生成一个名叫report.html文件(可忽视)
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
  },

  /*
    configureWebpack是调整webpack配置最简单的一种方式，可以新增也可以覆盖cli中的配置。
    可以是一个对象：被 webpack-merge 合并到webpack 的设置中去
    也可以是一个函数：如果你需要基于环境有条件地配置行为，就可以进行一些逻辑处理，可以直接修改或新增配置，(该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。
    在函数内，你可以直接修改配置，或者返回一个将会被合并的对象。
  */

  configureWebpack: config => {
    // 开启 gzip 压缩
    // 需要 npm i -D compression-webpack-plugin
    const plugins = []
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 需要压缩的文件正则
          threshold: 10240, // 文件大小大于这个值时启用压缩
          minRatio: 0.8,
          deleteOriginalAssets: false // 压缩后保留原文件
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/css/index.scss";'
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
