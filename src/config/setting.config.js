/**
 * @description 导出默认通用配置
 */

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const setting = {

  /** token相关 **/

  // token名称
  tokenName: 'accessToken',
  // token在localStorage、sessionStorage存储的key的名称
  tokenTableName: 'vue-admin-cyan-2021',
  // token存储位置localStorage sessionStorage
  storage: 'localStorage',
  // 不经过token校验的路由
  routesWhiteList: ['/login', '/register', '/404', '/401', '/home'],
  // token失效回退到登录页时是否记录本次的路由
  recordRoute: true,

  /** 登录权限相关 **/

  // 是否开启登录token拦截
  loginInterception: false,
  // 是否开启登录RSA加密
  loginRSA: true,
  // intelligence和all两种方式，前者后端权限只控制permissions不控制view文件的import（前后端配合，减轻后端工作量），all方式完全交给后端前端只负责加载
  authentication: 'intelligence',

  /** 显示相关**/
  // 标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: 'vue-cyan-pro',
  // 是否显示顶部进度条
  progressBar: true,
  // 加载时显示文字
  loadingText: '正在加载中...',
  // 是否显示logo，不显示时设置false，显示时请填写remixIcon图标名称，暂时只支持设置remixIcon
  logo: 'vuejs-fill',
  // 是否显示在页面高亮错误
  errorLog: ['development', 'production'],

  // 进行编译的依赖
  transpileDependencies: [],
  // 缓存路由的最大数量
  keepAliveMaxNum: 99,
  // 路由模式，可选值为 history 或 hash
  routerMode: 'hash',
  // vertical布局时是否只保持一个子菜单的展开
  uniqueOpened: true,
  // vertical布局时默认展开的菜单path，使用逗号隔开建议只展开一个
  defaultOopeneds: ['/vab'],
  // 需要加loading层的请求，防止重复提交
  debounce: ['doEdit'],
  // 需要自动注入并加载的模块
  providePlugin: { maptalks: 'maptalks', 'window.maptalks': 'maptalks' },
  // npm run build时是否自动生成7z压缩包
  build7z: false,
  // 代码生成机生成在view下的文件夹名称
  templateFolder: 'project',
  // 是否显示终端donation打印
  donation: true
}
module.exports = setting
