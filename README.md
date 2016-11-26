GMLOG 2 —— 史上弃坑次数最多的博客程序
----

程序说明：

这是一个“纯前端”的博客系统，没有任何后端脚本支撑，完全由 HTML + CSS + JS + 其他静态资源组成。
阔四！为什么不说“纯静态”內？
因为这个神奇的博客（表脸）四阔以“在不改变博客程序本身的情况下发布文章”哒！
多亏我萌神奇的 Ajax 加持。
实现原理简单来说就是一句话：通过 Ajax 请求文章（或其他）资源加载到预先写好的 HTML 结构中实现内容的“动态”变化。
附程序中用到的第三方库：
jQuery、pagedown、highlight.js、duoshuo

目录结构：

```
├─article			// 存放文章
├─css				// 样式表
├─img				// 图片
│  └─covers			// 预置随机封面
├─js				// 支撑博客运行的 javascript 文件
│  └─highlight		// 第三方代码高亮工具包
│      └─styles		// 代码高亮样式
└─page				// 存放页面
```

更新日志：

v2.2.3(n) β (2016-10-10)

 - 开启多说评论，小伙伴们又可以愉快的吐槽辣；
 - 修复样式。


v2.2.2(n) β (2016-10-09)

 - 重做主题，解决众人吐槽的“大得喘不过气”的问题；
 - 优化分类数据预载，比快更快；
 - 更新[链接]页面；
 - 修改未启用页面跳转方式。


v2.2.1(n) β (2016-10-07)

 - 将封面缺省状态下随机封面不能显示的 BUG 修复；
 - 基于 nginx 特性优化请求方案，预读速度更给力；
 - 优化配置格式，更改部分全局变量名，区分开了导航中的“目录”与“链接”；
 - 规范部分系统函数参数名，收集“工具向”函数；
 - 以及颜控的控制台。


v2.2.0 β (2016-10-06)

添加了被遗忘的分页功能，重写页面样式，重写大约 80% 的 js 代码，优化了请求逻辑实现“预载提速”（实际上是把一次请求分成多次请求），预留导航扩展功能，暂时移除评论。


v2.1.0 α (2016-08-22)

试图仿“刘看山小站”样式，HTML 已完成但发现并不适合做文字类博客，故放弃。（小版本作废）


v2.0.1 α (2016-08-04)

修改 Loading 动画为纯 CSS 版本，修复文章图片溢出，修复段间距，修复背景动画位置，修复多说评论框文章标题获取……


v2.0.0 α (2016-07-30)

实现“博客”的基本功能，可以发布文章，支持分类，调用多说实现评论，但是貌似忘了做分页（好在开始写路由方案时扩展性比较好）；UI方面因为美感缺失已经尽力做到自己能接受的水准了，非主流动态响应式布局（什么鬼）；Hash + Ajax 无刷新加载……

Some废话：

程序开源，不懂可种各样的协议。
只做说明：自由修改、分享、但不可商用（这么辣鸡鬼才会商用）。
请尽量不要删除程序作者标识，如果您千方百计都要删菇也不可能万里追凶您说是吧。
&关于 GMLOG2 如果您有好的意见或建议，欢迎来访 http://siitake.cn/ 交流。

嗯！就这些。(香菇)