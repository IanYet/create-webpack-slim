# create-webpack-slim

!()[https://img.shields.io/badge/Windows-passsing-blue] !()[https://img.shields.io/badge/MacOS-passsing-yellow] !()[https://img.shields.io/badge/Linux-passsing-green]

Quickly create a simple webpack app

## Usage

```
npx create-webpack-slim my-app
cd my-app
yarn install
yarn start
```

![create-webpack-slim](https://raw.githubusercontent.com/IanYet/image/master/create-webpack-slim.png)

## Content

- dev config `webpack.config.dev.js`
- - babel
- - css module
- - html template
- - devServer

- prod config `webpack.config.prod.js`
- - css extract
- - hash8 filename
- - copy public
- - split chunks

> You can modify the `output.publicPath` configuration in `webpack.config.prod.js` to set the url prefix for static resources.

## loaders

```
babel-loader
css-loader
file-loader
style-loader
url-loader
MiniCssExtractPlugin.loader
```

## plugins

```
clean-webpack-plugin
copy-webpack-plugin
html-webpack-plugin
mini-css-extract-plugin
```


Happy coding!