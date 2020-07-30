# create-webpack-slim

快速创建一个简单的webpack app

##使用方法

```
npx create-webpack-slim my-app
cd my-app
yarn install
yarn start
```

##包含配置

- 开发环境 `webpack.config.dev.js`
- - babel
- - css module
- - html template
- - devServer

- 生产环境 `webpack.config.prod.js`
- - css extract
- - hash8 filename
- - copy public
- - split chunks

> 你可以修改`webpack.config.prod.js`中`output.publicPath`配置来配置静态资源的url前缀

Happy coding!