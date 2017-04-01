// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    // env: require('./prod.env'),
    env: {NODE_ENV: '"production"'},
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    // env: require('./dev.env'),
    env: {NODE_ENV: '"development"'},
    port: 8081,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable: {},
    proxyTable: {
      '/npcloud-manager-1.0/npcloud': {
        target: 'http://172.16.61.188:18087/npcloud-manager-1.0/npcloud',
        changeOrigin: true,
        pathRewrite: {
          '^/npcloud-manager-1.0/npcloud': ''
        }
      },
      '/cms/service': {
        target: 'http://172.16.61.223:8018/cms/service',
        changeOrigin: true,
        pathRewrite: {
          '^/cms/service': ''
        }
      }
    },
    /*proxyTable: {
      '/npcloud-manager-1.0/npcloud': {
        target: 'http://172.16.61.207:8070/npcloud-manager-1.0/npcloud',
        changeOrigin: true,
        pathRewrite: {
          '^/npcloud-manager-1.0/npcloud': ''
        }
      }
    },*/
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
