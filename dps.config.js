
const dpsConfig = {
	url: 'http://rydev.com:3000/login',      // 待生成骨架屏页面的地址，用百度（https://baidu.com）试试也可以
	rootNode: ['#login-header', '#login-input-info'],
	// output: {
	// 	filepath: '/Users/bank/Desktop/ry-react-ts/src',   // 生成骨架屏的存放页面，一般为项目的入口页面
	// 	injectSelector: '#app'  // 生成的骨架屏插入页面的节点
	// },
	// header: {
	// 	height: 40,
	// 	background: '#1b9af4'
	// },
	// background: '#eee',
	animation: 'opacity 1s linear infinite;',
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



// const dpsConfig = {
// 	// 默认生成位置为当前项目目录skeleton文件夹，已有骨架屏页面不会再次生成，新页面配置只需要添加新条目即可
// 	visa_guide: {
// 		url: '/Users/bank/Desktop/ry-react-ts/src', // 必填项
// 	},
// 	call_charge: {
// 		// url: 'http://localhost:8081/sfe-app/call_charge.html?rights_id=25', // 必填项 待生成骨架屏页面的地址，用百度（https://baidu.com）试试也可以
// 		url:'https://www.baidu.com',
// 		device: 'pc', // 非必填，默认mobile
// 		background: '#eee', // 非必填
// 		animation: 'opacity 1s linear infinite;', // 非必填
// 		headless: false, // 非必填
// 		customizeElement: function (node) { // 非必填
// 			//返回值枚举如果是true表示不会向下递归到这层为止，如果返回值是一个对象那么节点的档子就按照对象里面的样式来绘制
// 			//如果返回值为0表示正常递归渲染
// 			//如果返回值为1表示渲染当前节点不在向下递归
// 			//如果返回值为2表示对当前节点不作任何处理
// 			if (node.className === 'navs-bottom-bar') {
// 				return 2;
// 			}
// 			return 0;
// 		},
// 		showInitiativeBtn: true,// 非必填 如果此值设置为true表示开发需要主动触发生成骨架屏了，此时headless需设置为false
// 		writePageStructure: function (html) { // 非必填
// 			// 自己处理生成的骨架屏
// 			// fs.writeFileSync(filepath, html);
// 			// console.log(html)
// 		},
// 		init: function () { // 非必填
// 			// 生成骨架屏之前的操作，比如删除干扰节点
// 		}
// 	}
// }


// module.exports = dpsConfig;

