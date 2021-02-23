module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "postcss-pxtorem": {
      rootValue: 100,
      propList: ['*'],
      minPixelValue: 1,
      selectorBlackList: [] // 过滤掉.threems-开头的class，不进行rem转换
    }
  }
}
