/**
 * 类型构造器
 */
(function(window) {
	/**
	 * @param {String/Function}
	 *            superClass 父类
	 * @param {Function}
	 *            classBody 类体
	 */
	function $class(superClass, classBody) {
		if (!superClass)
			superClass = Object;
		var clazz = function() {
			return function() {
				if (typeof this._init == "function") {
					this._init.apply(this, arguments);
					// if (arguments[0] != '!@#%^&*()') {// 用以区分是new对象还是继承原型
					// this._create.apply(this, arguments);
					// }
				}
			};
		}();
		var p = clazz.prototype = new superClass();
		// var p = clazz.prototype = new superClass('!@#%^&*()');
		p.constructor = clazz;
		var _super = superClass.prototype;
		classBody.apply(p, [ _super ]);
		return clazz;
	}
	if (typeof define === "function" && define.amd) {
		define(function() {
			return $class;
		});
	} else {
		window.$class = $class;
	}
})(window);
