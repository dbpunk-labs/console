module.exports = {
	plugins: {
		"postcss-safe-parser": {},
		"postcss-flexbugs-fixes": {},
		"postcss-preset-env": {
			autoprefixer: {},
			stage: 3,
			features: {
				"custom-properties": false,
			},
		},
		// "postcss-plugin-px2rem": {
		// 	rootValue: 100,
		// 	// replace: true, // （布尔值）替换包含rems的规则，而不添加后备
		// 	// mediaQuery: false, // （布尔值）允许在媒体查询中转换px
		// 	minPixelValue: 2, // （数字）设置要替换的最小像素值
		// 	// selectorBlackList: [], // 忽略转换正则匹配项
		// 	// propList: ["*"], // 可以从px转换为rem的属性，匹配正则
		// 	exclude: /node_modules/i, // （字符串，正则表达式，函数）要忽略并保留为px的文件路径
		// },
	},
};
