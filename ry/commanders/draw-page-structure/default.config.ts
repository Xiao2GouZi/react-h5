#!/usr/bin/env node


interface IConfig {
	/** 待生成骨架屏的页面地址 */
	url: string,
	/** 针对局部生成骨架屏	document.body */
	rootNode: string | string[],
	/** 骨架屏主题色 #ecf0f2 */
	background?: string,
	/** css3动画属性	 */
	animation?: string,
	/** 设备类型 */
	device?: "mobile" | "pc" | "pad"
	/** 添加请求头 */
	extraHTTPHeaders?: any,
	/** 开始生成之前的操作	 */
	init?: () => void,
	/** 定制某个节点如何生成	 */
	includeElement?: (node: any, draw: any) => boolean
	/** 回调的骨架屏节点	 */
	writePageStructure?: (html: string, filepath: string) => void
}

export const filename = 'dps.config.js'

export const config = (url: string): string => {
	return `const dpsConfig = {
		url: '${url}',      // 待生成骨架屏页面的地址，用百度（https://baidu.com）试试也可以
		// header: {
		// 	height: 40,
		// 	background: '#1b9af4'
		// },
		// background: '#eee',
		// animation: 'opacity 1s linear infinite;',
		// includeElement: function(node, draw) {
			// 定制某个节点画出来的样子，带上return false
			// if(node.id == 'ui-alert') {
				// 跳过该节点及其子节点
				// return false;
			// }
			// if(node.tagName.toLowerCase() === 'img') {
				// 对该图片生成宽100%，高8%，颜色为红色的色块
				// draw({
					// width: 100,
					// height: 8,
					// left: 0,
					// top: 0,
					// zIndex: 99999999,
					// background: 'red'
				// });
				// return false;
			// } 
		// },
		// writePageStructure: function(html) {
			// 自己处理生成的骨架屏
			// fs.writeFileSync(filepath, html);
			// console.log(html)
		// },
		init: function() {
			// 生成骨架屏之前的操作，比如删除干扰节点
		}
	}
	
	module.exports = dpsConfig;
	`
}

