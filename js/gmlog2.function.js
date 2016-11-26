/*
 * GMLOG2 系统函数定义文件
 * by siitake.cn
 * 
 */
/*
 * 系统函数（基于jQuery编写）
 * 函数命名规则：驼峰式单词或单词缩写
 * set* 设置*
 * get* 获取*
 * init* 初始化*数据
 * 
 */
$.extend({
	initSite: function() {  // 初始化站点数据
		$("title").text(I.n + (I.s != "" ? (" - " + I.s) : ""));  // 网站标题
		$(".x-mbar-tit").html("<a href='#!home'>" + I.n + "</a>");  // 小屏版标题
		$(".x-menu-box").append($.initNav(C, "x-menu", "c"));  // 侧栏目录部分
		$(".x-menu-box").append($.initNav(L, "x-menu", "l"));  // 侧栏链接部分
		$(".x-copy").text("Version: " + V);  // 显示版本
	},
	initNav: function(o, c, r) {  // 初始化导航数据
		var nav = $("<ul>").addClass(c);
		for(var _o in o) {
			var li = $("<li>");
			if(typeof(o[_o][1]) == "object") {
				li.addClass("x-menu-dropdowm");
				var a = $("<a>", {
					href: "javascript:;",
					html: o[_o][0] + "<span class='x-menu-dropdowm-si'></span>",
				}).bind("click", function() {
					$(this).parent().siblings().find("ul").removeClass("x-menu-dropdowm-on");
					$(this).next("ul").toggleClass("x-menu-dropdowm-on");
				});
				li.append(a);
				var dm = $("<ul>");
				for(var __o in o[_o][1]) {
					var _li = $("<li>");
					var _a;
					if(o[_o][1][__o][2]) {
						_a = $("<a>", {
							href: o[_o][1][__o][2],
							title: o[_o][1][__o][1],
							text: o[_o][1][__o][0],
							target: "_blank"
						});
					} else {
						_a = $("<a>", {
							href: "#!" + r + "/" + __o,
							title: o[_o][1][__o][1],
							text: o[_o][1][__o][0]
						});
					}
					_li.append(_a);
					dm.append(_li);
				}
				li.append(dm);
			} else {
				var a = $("<a>", {
					href: "#!" + r + "/" + _o,
					title: o[_o][1],
					text: o[_o][0]
				}).bind("click", function() {
					$(".x-menu-dropdowm > ul").removeClass("x-menu-dropdowm-on");
				});
				li.append(a);
			}
			nav.append(li);
		}
		return nav;
	},
	initHash: function() {  // 初始化站点哈希（即"#"后面的字符串）
		var str = location.hash;
		if(str == "") {
			location.hash = "!home";
			return "initHash->home";
		}
		var sa = str.split("#");
		for(var _sa in sa) {
			if(sa[_sa].indexOf("!") != -1 && sa[_sa].indexOf("!") == 0) {
				str = sa[_sa];
				sa = str.split("!");
				str = sa[1];
				if(str.indexOf("/") != -1) {
					sa = str.split("/");
					var hashs = new Array;
					for(var s in sa) {
						hashs.push(sa[s]);
					}
					return hashs;
				}
				return new Array(str);
			}
		}
	},
	initHome: function() {  // 初始化索引页面
		$.backTop(0.5);
		$("#x-main").html("");
		$("title").text(I.n + (I.s != "" ? (" - " + I.s) : ""));
		$.getPosts(N, N - E, function(id) {
			$.setPostList(id);
		});
		$.initPagePointer(1);
	},
	initPages: function(p) {  // 初始化分页
		$.backTop(0.5);
		$("#x-main").html("");
		$.getPosts(N - (E * (p - 1)), N - (E * p), function(id) {
			$.setPostList(id);
		});
		$("title").text(I.n + "(第" + p + "页)" + (I.s != "" ? (" - " + I.s) : ""));
		$.initPagePointer(p);
	},
	initLinkPage: function(l) {  // 初始化单页
		$.backTop(0.1);
		$("#x-main").html("");
		var post = $("<div>").addClass("x-post-item");
		var tit = $("<h1>");
		var cont = $("<div>").addClass("x-post-item-cont");
		// “特殊”单页判定
		if(l == "links") {  // 友链
			$("title").text("链接  - " + I.n);
			tit.text("小伙伴们");
			$.ajax({
				url: "page/links?" + $.hourStamp(5),
				async: false,
				beforeSend: function() {
					$.loading(true);
				},
				success: function(hrt) {
					var links = new Array();
					links = hrt.split("\n");
					for(i = 0; i < links.length; i++) {
						linki = links[i].split("||");
						var linkitem = $("<div>").addClass("x-linkitem");
						var linkname = $("<h2>").addClass("x-linkname").text(linki[0]);
						var linkdesc = $("<span>").addClass("x-linkdesc").text(linki[1]);
						var linkhref = $("<a>", {
							href: linki[2],
							target: "_blank"
						});
						var linklogo = $("<img>").addClass("x-linklogo").attr("src", linki[3]);
						linkhref.append(linklogo);
						linkhref.append(linkname);
						linkhref.append(linkdesc);
						linkitem.append(linkhref);
						cont.append(linkitem);
					}
					cont.append($("<div style='clear:both'></div>"));
					$.echo("链接>换链的小伙伴请在本页留言嗷", 2);
					$.loading(false);
				},
				error: function(xhr) {
					$.echo("信息获取失败请刷新(F5)重试！", 1);
				}
			});
			$.getDuoshuo(l, "链接");
		} else if(l == "gmlog2") {  // 程序说明页
			location.hash = "!1";
		} else {  // “状况外(404)”页面，可于此前无限自定义单页数据/转向
			tit.text("链接暂未启用");
			cont.text("即将返回首页 (╯‵□′)╯︵┻━┻");
			setTimeout("location.hash = '!home'", 2000);
			$.echo("链接暂不可用已自动返回首页！", 1);
		}
		post.append(tit);
		post.append(cont);
		$("#x-main").append(post);
	},
	initPost: function(id) {  // 初始化文章页
		$.backTop(0.1);
		$("#x-main").html("");
		$.getPosts(id, id, function(id) {
			var post = $("<div>").addClass("x-post-item");
			var tit = $("<h1>").text(P[id].title);
			post.append(tit);
			var meta = $("<div>").addClass("x-post-item-meta");
			var datt = $("<date>").text(P[id].date);
			meta.append(datt);
			var cate = $("<cate>");
			var cata = $("<a>", {
				href: "#!c/" + P[id].category,
				text: C[P[id].category][0]
			});
			cate.append(cata);
			meta.append(cate);
			post.append(meta);
			var img = $("<img>").attr("src", (P[id].cover != undefined && P[id].cover.trim() != "") ? P[id].cover : ('img/covers/Cover' + Math.floor((Math.random() * 5) + 1) + '.jpg'));
			post.append(img);
			var cont = $("<div>").addClass("x-post-item-cont").html(M.makeHtml(P[id].post));
			post.append(cont);
			$("#x-main").append(post);
			$("title").text(P[id].title + " - " + I.n);
			$('head').append('<link rel="stylesheet" type="text/css" href="js/highlight/styles/googlecode.css"/>');
			$.ajax({
				url: 'js/highlight/highlight.pack.js',
				type: 'GET',
				dataType: 'script',
				cache: true,
				beforeSend: function() {
					$.loading(true);
				},
				success: function() {
					hljs.initHighlighting();
					$.loading(false);
				}
			});
			$.getDuoshuo(id, P[id].title);
		});
		$.initPostPointer(id);
	},
	initCate: function(cate, pn) {  // 初始化分类目录
		$.backTop(0.1);
		$("#x-main").html("");
		$.getPosts(N, 0, function(id) {
			if(id == 1) {
				$.initCatePointer(pn, P[cate].length, cate);
				for(i = P[cate].length - (E * (pn - 1)); i > P[cate].length - (E * pn); i--) {
					if(i >= 1) {
						$.setPostList(parseInt(P[cate][i - 1]));
						$("title").text(C[cate][0] + "(第" + pn + "页)" + " - " + I.n);
					}
				}
			}
		});
	},
	initPagePointer: function(p) {  // 初始化翻页按钮
		var cp = Math.ceil(N / E);
		if(p > cp || p < 1) {
			location.hash = "!home";
			$.echo("请求无效返回首页。", 1);
		} else if(p == 1 && p == cp) {
			$.setPointer(false, false);
		} else if(p == 1) {
			$.setPointer("#!p/" + (p + 1), false);
		} else if(p == cp) {
			$.setPointer(false, "#!p/" + (p - 1));
		} else {
			$.setPointer("#!p/" + (p + 1), "#!p/" + (p - 1));
		}
	},
	initCatePointer: function(p, n, c) {  // 初始化分类下翻页按钮
		var cp = Math.ceil(n / E);
		if(p > cp || p < 1) {
			location.hash = "!home";
			$.echo("请求无效返回首页。", 1);
		} else if(p == 1 && p == cp) {
			$.setPointer(false, false);
		} else if(p == 1) {
			$.setPointer("#!c/" + c + "/" + (p + 1), false);
		} else if(p == cp) {
			$.setPointer(false, "#!c/" + c + "/" + (p - 1));
		} else {
			$.setPointer("#!c/" + c + "/" + (p + 1), "#!c/" + c + "/" + (p - 1));
		}
	},
	initPostPointer: function(id) {  // 初始化文章下翻页按钮
		if(id > N || id < 1) {
			location.hash = "!home";
			$.echo("请求无效返回首页。", 1);
		} else if(id == 1 && id == N) {
			$.setPointer(false, false);
		} else if(id == 1) {
			$.setPointer(false, "#!" + (id + 1));
		} else if(id == N) {
			$.setPointer("#!" + (id - 1), false);
		} else {
			$.setPointer("#!" + (id - 1), "#!" + (id + 1));
		}
	},
	setPointer: function(o, n) {  // 设置翻页按钮
		if(o) {
			$("#x-older").attr("href", o);
			$("#x-older-li").removeClass("x-disabled");
		} else {
			$("#x-older").attr("href", "javascript:;");
			$("#x-older-li").addClass("x-disabled");
		}
		if(n) {
			$("#x-newer").attr("href", n);
			$("#x-newer-li").removeClass("x-disabled");
		} else {
			$("#x-newer").attr("href", "javascript:;");
			$("#x-newer-li").addClass("x-disabled");
		}
	},
	setPostList: function(id) {  // 设置文章列表
		var post = $("<div>").addClass("x-post-item");
		var tit = $("<h1>");
		var ta = $("<a>", {
			href: "#!" + id,
			text: P[id].title
		});
		tit.append(ta);
		post.append(tit);
		var cover = $("<div>").addClass("x-post-item-cover");
		var ia = $("<a>", {
			href: "#!" + id,
		});
		var img = $("<img>").attr("src", (P[id].cover != undefined && P[id].cover.trim() != "") ? P[id].cover : ('img/covers/Cover' + Math.floor((Math.random() * 5) + 1) + '.jpg'));
		ia.append(img);
		cover.append(ia);
		post.append(cover);
		var meta = $("<div>").addClass("x-post-item-meta");
		var datt = $("<date>").text(P[id].date);
		meta.append(datt);
		var cate = $("<cate>");
		var cata = $("<a>", {
			href: "#!c/" + P[id].category,
			text: C[P[id].category][0]
		});
		cate.append(cata);
		meta.append(cate);
		post.append(meta);
		var cont = $("<div>").addClass("x-post-item-cont").text($.removeHtml(M.makeHtml(P[id].post)).substr(0, 140) + '…');
		post.append(cont);
		var more = $("<more>");
		var mora = $("<a>", {
			href: "#!" + id,
			text: "阅读全文 >>"
		});
		more.append(mora);
		post.append(more);
		$("#x-main").append(post);
	},
	getPosts: function(id, num, func) {  // 获取文章数据
		if(!P[id]) {
			$.ajax({
				url: "article/" + $.ID(id) + "." + P["_cates"][$.ID(id)] + "?" + $.hourStamp(5),
				async: true,
				beforeSend: function() {
					$.loading(true);
				},
				success: function(result) {
					var tmp = result.split('\n>>>--->');
					var inf = tmp[0].split('\n');
					var infs = new Array();
					for(i = 0; i < inf.length; i++) {
						var iTmp = inf[i].split(': ');
						infs[iTmp[0]] = iTmp[1];
					}
					P[id] = {
						category: infs.category.trim(),
						cover: infs.cover,
						date: infs.date,
						title: infs.title,
						post: tmp[1]
					};
					func(id);
					if(--id > num && id > 0) {
						$.getPosts(id, num, func);
					}
					$.loading(false);
				}
			});
		} else {
			func(id);
			if(--id > num && id > 0) {
				$.getPosts(id, num, func);
			}
		}
	},
	getDuoshuo: function(id, tit) {  // 连接多说评论
		duoshuoQuery = {
			short_name: D
		};
		$.getScript("http://static.duoshuo.com/embed.js", function() {
			var el = $("<div>").attr("data-thread-key", id).attr("data-url", "http://i.siitake.cn/#!" + (isNaN(id) ? "l/" : "") + id).attr("data-title", tit);
			DUOSHUO.EmbedThread(el);
			$(".x-comments").html(el);
			$.echo("多说评论拉取成功。", 1);
		});
	},
	searchPost: function() {  // “搜索”文章数据
		if(N == 0) {
			$.ajax({
				url: "article?" + $.hourStamp(5),
				async: false,
				beforeSend: function() {
					$.loading(true);
				},
				/*
				 * 实际上因为“纯前端”的关系，如果不使用脚本的话，就没办法一次性获取到所有文章的全部或者部分信息
				 * 如果远程遍历文件的话，会极大的拖慢博客加载的速度，还会产生报错信息
				 * 所以香菇想到了容器的“列目录”
				 * 使用 ajax 获取到“列目录”生成的索引页，即可解析出全部文章的文件信息
				 * 此处针对香菇使用的 Nginx 做的“列目录”解析
				 * article 目录中还有一个 index.php 文件，是针对没有列目录权限但支持 php 的主机做出的应急解决方案
				 * index.html 文件是用来在纯静态环境下模拟“列目录”生成的索引页
				 * 如果使用容器自身的“列目录”获取文章数据，需要删除 index.php 和 index.html 文件
				 * 如果使用 index.php 获取文章数据，仅删除 index.html 即可
				 * 
				 */
				success: function(html) {
					var posts = $(html).find("a");
					for(i = 1; i < posts.length; i++) {
						var ct = posts[i].text.split(".");
						if(!P["_cates"]) {
							P["_cates"] = new Array();
						}
						P["_cates"][ct[0]] = ct[1];
						if(!P[ct[1]]) {
							P[ct[1]] = new Array();
						}
						P[ct[1]].push(ct[0]);
					}
					N = $(html).find("a").length - 1;
					$.echo("完美继承1代所有槽点的全新博客系统\nGMLOG v" + V + " (" + U + ")\nBy siitake.cn", 0);
					//未经允许请不要删除上面打印的信息。是的！你没有看错！冰天雪地360度无死角卖萌打滚求留版权。(；′⌒`)
					$.echo("共检测到<" + N + ">篇文章。", 1);
					$.echo("初始化分类数据成功！", 1);
					$.loading(false);
				},
				error: function(xhr) {
					$.echo("程序初始化失败请刷新(F5)重试！", 1);
				}
			});
		}
	},
	readyToJump: function(h) {  // 解析哈希值并设置跳转目标
		$(".x-page-pointer").removeClass("x-page-pointer-off");
		$(".x-comments").html("");
		$.mbarMenuOff();
		if(h[0] == "home") {
			$.echo("首页", 2);
			$.initHome();
		} else if(!isNaN(h[0])) {
			$.echo("文章<" + h[0] + ">", 2);
			$.initPost(parseInt(h[0]));
		} else if(h[0] == "p") {
			$.echo("第<" + h[1] + ">页", 2);
			$.initPages(parseInt(h[1]));
		} else if(h[0] == "c") {
			if(h[2]) {
				$.echo("第<" + h[2] + ">页" + h[1], 2);
				$.initCate(h[1], parseInt(h[2]));
			} else {
				$.echo(C[h[1]][0], 2);
				$.initCate(h[1], 1);
			}
		} else if(h[0] == "l") {
			$(".x-page-pointer").addClass("x-page-pointer-off");
			$.initLinkPage(h[1]);
		}
	},
	ID: function(id) {  // 格式化“ID”
		if(id < 10) {
			return '000' + id;
		} else if(id > 9 && id < 100) {
			return '00' + id;
		} else if(id > 99 && id < 1000) {
			return '0' + id;
		} else {
			return id;
		}
	},
	echo: function(s, t) {  // “然并卵”的控制台包装函数
		switch(t) {
			case 0:
				console.log("%c" + s, "color:blue");
				break;
			case 1:
				console.log("%c[系统]:" + s, "color:red");
				break;
			case 2:
				console.log("%c[位置]:" + s, "color:green");
				break;
			default:
				console.log(s);
				break;
		}
	},
	hourStamp: function(t) {  // 时间戳，将置于请求参数用来刷新缓存
		var now = new Date();
		var year = now.getFullYear();
		var month = (1 + now.getMonth()) < 10 ? ("0" + (1 + now.getMonth())) : (1 + now.getMonth());
		var day = now.getDate() < 10 ? ("0" + now.getDate()) : now.getDate();
		var hour = now.getHours() < 10 ? ("0" + now.getHours()) : now.getHours();
		var minute = now.getMinutes() < 10 ? ("0" + now.getMinutes()) : now.getMinutes();
		var min_t = Math.ceil(minute / t);
		return "" + year + month + day + hour + "-" + min_t;
	},
	removeHtml: function(s) {  // 移除字符串中 html 标记的工具函数
		s = s.replace(/<\/?[^>]*>/g, '');
		s = s.replace(/[ | ]*\n/g, '\n');
		s = s.replace(/\n[\s| | ]*\r/g, '\n');
		s = s.replace(/&nbsp;/ig, '');
		return s;
	},
	previewHTML: function(s) {  // 新标签预览 html 代码块的工具函数
		testwin = open("", "testwin", "status=no,menubar=yes,toolbar=no");
		testwin.document.open();
		testwin.document.write(s);
		testwin.document.close();
	},
	loading: function(b) {  // loading 动画
		$("#x-lbox").css("display", b ? "block" : "none");
	},
	backTop: function(n) {  // 回到顶部
		$("body,html").animate({
			scrollTop: 0
		}, 1000 * n);
	},
	backTopBtn: function() {  // 回到顶部按钮
		var offset = 300,
			offset_opacity = 1200,
			scroll_top_duration = 700,
			$back_to_top = $('.cd-top');
		$(window).scroll(function() {
			($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
			if($(this).scrollTop() > offset_opacity) {
				$back_to_top.addClass('cd-fade-out');
			}
		});
		$back_to_top.on('click', function(event) {
			event.preventDefault();
			$('body,html').animate({
				scrollTop: 0,
			}, scroll_top_duration);
		});
	},
	mbarMenuOn: function() {  // 开启小屏版菜单栏
		$(".x-mbar-menu").attr("onclick", "$.mbarMenuOff()");
		$(".x-mbar-menu > span:eq(0)").addClass("x-mbar-menu-rd");
		$(".x-mbar-menu > span:eq(1)").addClass("x-mbar-menu-dn");
		$(".x-mbar-menu > span:eq(2)").addClass("x-mbar-menu-ru");
		$(".x-mbar").addClass("x-mbar-on");
		$(".g-sd1").addClass("g-sd1-on");
		$(".g-mn1c").addClass("g-mn1c-on");
	},
	mbarMenuOff: function() {  // 关闭小屏版菜单栏
		$(".x-mbar-menu").attr("onclick", "$.mbarMenuOn()");
		$(".x-mbar-menu > span:eq(0)").removeClass("x-mbar-menu-rd");
		$(".x-mbar-menu > span:eq(1)").removeClass("x-mbar-menu-dn");
		$(".x-mbar-menu > span:eq(2)").removeClass("x-mbar-menu-ru");
		$(".x-mbar").removeClass("x-mbar-on");
		$(".g-sd1").removeClass("g-sd1-on");
		$(".g-mn1c").removeClass("g-mn1c-on");
	}
});
$(window).bind(  // 绑定哈希变化监听
	"hashchange",
	function() {
		$.readyToJump($.initHash());
	}
);
$(window).resize(function() {  // 绑定视口变化监听
	$.mbarMenuOff();
});
$(document).ready(function() {  // 必要的初始函数调用
	$.initSite();
	$.searchPost();
	$.readyToJump($.initHash());
	$.backTopBtn();
});