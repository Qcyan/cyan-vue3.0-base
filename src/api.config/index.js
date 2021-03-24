// @/api.config
const APIConfig = require('./apiConfig')
const apiConfig = new APIConfig()
apiConfig
  .add('mock', {
    test: 'https://test.com', // 测试环境地址
    prod: 'https://prod.com' // 预上线地址
  })
  .add('jianshu', {
    test: 'https://www.jianshu.com',
    prod: 'https://www.prod.jianshu.com'
  })

// 通过传入（'test','mock'）=> 得到对应链接 http://test.com
module.exports = (myenv, branch) => apiConfig.get(myenv, branch)

