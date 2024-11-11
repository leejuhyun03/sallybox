const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = (app) => {
	app.use(
		'/api/*',
		createProxyMiddleware({target:'http://192.168.16.4:8085'}))
}