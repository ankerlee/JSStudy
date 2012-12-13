(function(window) {
	function create() {
		// tests:测试脚本，页面所要涉及到的所有测试脚本
		// pages:子页面或子页面数组，格式：{id:'',url:''}或[{id:'',url:''},{id:'',url:''}]
		// callBacks:回调函数，与子页面一一对应，每加载完一个子页面，就执行该子页面对应的回调函数
		// complete:完成函数，所有子页面加载完成后执行
		function load(tests, pages, callBacks, complete) {
			var ts = [], pgs = [], cbs = [];
			if (tests) {
				if ($.isArray(tests)) {
					ts = tests;
				} else {
					ts.push(tests);
				}
			}
			if (pages) {
				if ($.isArray(pages)) {
					pgs = pages;
				} else {
					pgs.push(pages);
				}
			}
			if (callBacks) {
				if ($.isArray(callBacks)) {
					cbs = callBacks;
				} else {
					cbs.push(callBacks);
				}
			}

			if (ts.length > 0) {
				yepnope({
					load : ts,
					callback : function(url, result, key) {
						console.info("成功加载页面相关的【测试脚本】：" + url);
					},
					complete : function() {
						if (pgs.length == 0) {
							if (complete) {
								complete();
							}
						} else {
							doLoad();
						}
					}
				});
			} else {
				if (pgs.length == 0) {
					if (complete) {
						complete();
					}
				} else {
					doLoad();
				}
			}

			function doLoad() {
				var page = pgs.shift();
				var cb = cbs.shift();
				if (page) {
					$('#' + page.id).load(page.url, function() {
						loadPageSucc();
						doLoad();
					});
				}
				function loadPageSucc() {
					console.info("成功加载【子页面】：" + JSON.stringify(page));
					if (cb) {
						cb();
					}
					if (pgs.length == 0) {
						console.info("所有【子页面】加载完毕");
						if (complete) {
							complete();
						}
					}
				}
			}
		}
		var loader = {
			load : load,
			toPage : function(path) {
				var protocol = window.location.protocol;
				var flag = path.indexOf('?');
				var page, query;
				if (path.indexOf('?') != -1) {
					query = path.split("?")[1];
					path = path.split("?")[0];
				}
				page = eval('this.pages.' + path);
				if (!page) {
					alert('路径未定义');
					return false;
				}
				if (protocol == 'file:') {
					href = page.html;
				} else {
					href = page.jsp;
				}
				if (query)
					location.href = href + '?' + query;
				else
					location.href = href;
			},
			pages : {
				'login' : {
					'html' : 'file:///D:/demo/login/main.html',
					'jsp' : 'login.jsp'
				}
			}
		}
		return loader;
	}
	if (typeof define === "function" && define.amd) {
		define("loader", [ 'jquery', 'yepnope' ], function() {
			return create();
		});
	} else {
		window.loader = create();
	}
})(window);
