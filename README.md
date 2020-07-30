# create-webpack-slim

Quickly create a simple webpack app

## Usage

```
npx create-webpack-slim my-app
cd my-app
yarn install
yarn start
```

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

Happy coding!