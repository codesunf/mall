module.exports = {
	plugins: {
		autoprefixer: {},
		"postcss-px-to-viewport": {
			//视口的宽度，对应的是我们设计稿的宽度
			viewportWidth: 375,
			//视口的高度，对应的是我们设计稿的高度（也可以不配置）
			viewportHeight: 667,
			//指定px转换为视窗单位值得小数位数（很多时候无法整除）
			unitPrecision: 5,
			//指定需要转化成的视窗单位，建议使用vw
			viewportUnit: 'vw',
			//排除包含指定字符串所有的类
			selectorBlackList: ['ignore','tabbar','tab-bar-item'],
			//使用正则表达式排除包含指定字符串的文件,在js中使用正则：/相关规则/
			exclude: [/TabBar/],
			//小于或等于1px不转换为视窗单位
			minPixelValue: 1,
			//允许在媒体查询中转换px
			mediaQuery: false
		}
	}
}
