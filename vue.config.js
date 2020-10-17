'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const mpConfig = require('./public/static/config');
const packageInfo = require('./package.json');
//定义版本信息变量，可解决html引入资源的缓存问题
process.env.VUE_APP_VERSION = packageInfo.version
/* 开发环境下请求地址前缀 */
process.env.VUE_APP_API = '/api'

/* h5项目打包后的子路径，改成在manifest.json里面定义 */
// const serverPATH = '/'
const devCofig = {
  //开发环境端口
  port: 8080,
  //项目接口地址
  serverUrl: 'http://192.168.1.9'
}

module.exports = {
  publicPath: mpConfig.publicPath,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: packageInfo.title,
    resolve: {
      alias: {
        '@': resolve('src'),
        'assets': resolve('src/assets'),
        'vue$': 'vue/dist/vue.esm.js' 
      }
    }
  },
  chainWebpack: (config) => {
      // 发行或运行时启用了压缩时会生效
      config.optimization.minimizer('terser').tap((args) => {
          const compress = args[0].terserOptions.compress
          // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
          compress.drop_console = true
          compress.pure_funcs = [
              '__f__', // App 平台 vue 移除日志代码
              // 'console.debug' // 可移除指定的 console 方法
          ]
          return args
      })
      config
      .plugin('html')
      .tap(args => {
        args[0].title= packageInfo.title
        return args
      })

      //每一个sass内都可以使用css/themes/common里面的变量
      const oneOfsMap = config.module.rule('scss').oneOfs.store
      oneOfsMap.forEach(item => {
        item
          .use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({
            resources: [path.resolve(__dirname, 'src/styles/themes/common.scss')]
          })
          .end()
      })
  },
	/* h5项目打包后的子路径，改成在manifest.json里面定义 */
	// publicPath: process.env.NODE_ENV === 'production'? serverPATH: '/',
	devServer: {
	  host:"0.0.0.0",
	  port: devCofig.port,
	  open: true, // opens browser window automatically
	  proxy:{
		'/api': {
      target: `${devCofig.serverUrl}:8090`,//设置你调用的接口域名和端口号
      // target: `${devCofig.serverUrl}:8089`,//设置你调用的接口域名和端口号
      
		  changeOrigin: true, //跨域
		  pathRewrite: {
			'^/api': '/api'
		  }
		}
	  },
	},
	
}