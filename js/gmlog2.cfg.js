/*
 * GMLOG2 站点配置文件
 * by siitake.cn
 * 
 */
// 站点信息
var I = {
	u: 'http://i.siitake.cn/',
	n: '香菇社长',
	s: '普通的香菇，并没有成精。',
	d: '普通的香菇，并没有成精。',
	f: 'favicon.png',
	a: '香菇',
};
// 文章分类
var C = {
	essay: ['随笔', '中二癌患者的日常'],
	image: ['映像', '不会扒图的香菇不是好社长'],
	study: ['学习', '菇生下来就是活到死学到死'],
};
// 导航链接扩展
var L = {
	links: ['链接', '链接'],
	more: ['更多', {
		music: ['音乐', '循环洗脑什么的'],
		film: ['追剧', '养肥了再看系列'],
		project: ['挖坑', '千年大坑急需填'],
	}],
	about: ['关于', {
		siitake: ['香菇', '关于香菇'],
		gmlog2: ['程序', '关于GMLOG2'],
		donate: ['捐赠', '大爷来点赏钱嘛'],
		weibo: ['Weibo', '微博', 'http://weibo.com/600120933'],
		github: ['GitHub', 'GitHub仓库', 'https://github.com/siitakechan'],
		bilibili: ['Bilibili Live', 'B站直播', 'http://live.bilibili.com/64285'],
	}],
};
// 文章统计
var N = 0;
// 每页显示文章数量
var E = 5;
// 文章缓存数组
var P = new Array();
// 实例化 Markdown 类库
var M = new Markdown.Converter();
// 设置多说社评
var duoshuoQuery;
var D = 'gmlog2test';  // 请一定修改成您自个儿的“shortname”
// 版本&更新时间
var V = '2.2.3(n) β';
var U = '2016.10.10';