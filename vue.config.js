module.exports = {	
	devServer: {
		proxy: {
			'/store': {
				target: 'http://csgx.gxk8090.com',
				// target: 'http://api.gxk8090.com',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	},
	assetsDir: "store"
}