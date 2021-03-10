### 项目基础

####1.样式：
共用```assets/css/css-component```下的样式组件，样式前缀以cv-开头

#### 2.组件：
```src/vueComponents```为项目内全局可使用的公共组件
复制demo直接运行可查看效果

#### 3.插件：
插件像element,axios整合到plugin中统一管理

#### 4.公共方法：
优先使用定义在utils中的方法

#### 5.mock数据
在mock文件夹下 ```node server.js``` 可运行
根目录下```gulp mock```运行，可实时更新
mock接口的前缀要加上`````/mock`````,通过前缀区分是mock接口数据还是真实后台接口数据。
