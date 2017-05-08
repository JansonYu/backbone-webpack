webpackJsonp([0,2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(6);
	
	var _router = __webpack_require__(8);
	
	var _dataService = __webpack_require__(126);
	
	var _URLS = __webpack_require__(128);
	
	var _global = __webpack_require__(127);
	
	(0, _dataService.getJSON)(_URLS.GET_USER_INFO, { id: 123 }).then(function (data) {
	    _global.global.login(data);
	    Backbone.history.start({ pushState: false });
	})['catch'](function (e) {
	    return alert(e);
	});

/***/ },

/***/ 2:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ir":"reset__ir___3dNQv","hidden":"reset__hidden___25WLJ","visuallyhidden":"reset__visuallyhidden___HSi4K","focusable":"reset__focusable___4l3yY","invisible":"reset__invisible___3DgyP","clearfix":"reset__clearfix___3XRkC"};

/***/ },

/***/ 6:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.router = undefined;
	
	var _backbone = __webpack_require__(12);
	
	var _backbone2 = _interopRequireDefault(_backbone);
	
	var _util = __webpack_require__(14);
	
	var _Header = __webpack_require__(125);
	
	var _Footer = __webpack_require__(137);
	
	var _Home = __webpack_require__(141);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _Manage = __webpack_require__(147);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var header = null;
	var footer = null;
	
	var $main = $('#main');
	var currentView = null;
	var inited = false;
	var Router = _backbone2['default'].Router.extend({
	
	  routes: {
	    "": "home", // #home
	    "home": "home", // #home
	    "manage/:id": "manage" // #manage/1
	  },
	
	  home: function home() {
	    this._switchView(_Home2['default']);
	    //FIXME ie8下如果url带有hash会导致白屏，特殊处理,通过在url里加path参数实现
	    if (!inited) {
	      inited = true;
	      var path = _util.util.getURLParams()['path'];
	      if (path) {
	        setTimeout(function (e) {
	          location.hash = path;
	        }, 500);
	      }
	    }
	  },
	
	  manage: function manage(id) {
	    this._switchView(_Manage.Manage, { id: id });
	  },
	
	  _switchView: function _switchView(View, param) {
	    !header && (header = new _Header.Header());
	    !footer && (footer = new _Footer.Footer());
	    currentView && currentView.remove && currentView.remove();
	    $main.html('');
	    var view = new View(param);
	    $main.append(view.$el);
	    currentView = view;
	  }
	
	});
	
	var router = new Router();
	exports.router = router;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.util = undefined;
	
	var _moment = __webpack_require__(15);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var util = {
	
	  /**
	   * isValidDate
	   * @param {Date}
	   * @return {Boolean}
	   */
	  isValidDate: function isValidDate(time) {
	    if (Object.prototype.toString.call(time) != "[object Date]") {
	      time = this.parseDate(time);
	    }
	    return !isNaN(time.getTime());
	  },
	
	
	  /**
	  * 转换日期，一天以上显示日期；一天以内显示“X小时前”，一小时以内显示“刚刚”
	  * @param {Date}
	  * @return {String}
	  */
	  formatDateBefore: function formatDateBefore(time) {
	    if (!this.isValidDate(time)) {
	      return time;
	    }
	    var rs = (0, _moment2['default'])(time).format('YYYY-MM-DD');
	    time = util.parseDate(time);
	    var now = new Date().getTime();
	    var hours = Math.floor((now - time.getTime()) / 3600 / 1000);
	    if (hours == 0) {
	      rs = '刚刚';
	    } else if (hours > 0 && hours < 24) {
	      rs = hours + '小时前';
	    }
	    return rs;
	  },
	
	  /**
	  * 转换日期，eg:2016-6-18 20:00
	  * @param {Date}
	  * @return {String}
	  */
	  formatDateTime: function formatDateTime(time) {
	    return (0, _moment2['default'])(time).format('YYYY-MM-DD H:mm');
	  },
	
	  /**
	  * 转换日期，eg:6.18
	  * @param {Date}
	  * @return {String}
	  */
	  formatDate: function formatDate(time) {
	    return (0, _moment2['default'])(time).format('M.D');
	  },
	
	  /**
	  * 转换时间24小时制，eg:20:30
	  * @param {Date}
	  * @return {String}
	  */
	  formatTime: function formatTime(time) {
	    return (0, _moment2['default'])(time).format('H:mm');
	  },
	
	
	  /**
	   * 解析时间，按东八区解析
	   * @str {String|Number}
	   * @return {Date}
	   */
	  parseDate: function parseDate(str) {
	    if (!str) {
	      return new Date();
	    }
	    if (typeof str == 'number') {
	      return new Date(str);
	    }
	    //东八区时间
	    if (typeof str == 'string' && str.indexOf('+08') < 0) {
	      str = str + '+08:00';
	    }
	    return new Date(str);
	  },
	
	
	  /**
	   * 将对象的属性转换为日期
	   * @param {Object} 要转换的对象
	   * @param {Array[String]} 属性数组
	   * @return {Object}
	   */
	  convertProp2Date: function convertProp2Date(obj, props) {
	    props.forEach(function (item) {
	      obj[item] = util.parseDate(obj[item]);
	    });
	    return obj;
	  },
	
	
	  /**
	   * 获取URL参数
	   * @return {Object} {key:value}
	   */
	  getURLParams: function getURLParams() {
	    function parseParams(str) {
	      var rs = {};
	      var i = str.indexOf('?');
	      if (i >= 0) {
	        str = str.substr(i + 1);
	        var params = str.split('&');
	        params.forEach(function (s) {
	          var p = s.split('=');
	          if (p.length >= 2) {
	            rs[p[0]] = p[1];
	          }
	        });
	      }
	      return rs;
	    }
	
	    return Object.assign({}, parseParams(location.search), parseParams(location.hash));
	  },
	
	  /**
	   * 设置URL参数
	   * @param {Object} {key:value}
	   * @return {String}
	   */
	  toURLParams: function toURLParams(param) {
	    var rs = [];
	    for (var key in param) {
	      rs.push(key + '=' + encodeURIComponent(param[key]));
	    }
	    return rs.join('&');
	  },
	  getNodeText: function getNodeText(node) {
	    var rs = [];
	    if (node.nodeName == 'P' || node.nodeName == 'DIV' || node.nodeName == 'BR') {
	      rs.push('\r\n');
	    }
	
	    if (node.nodeType == 3) {
	      //textnode
	      rs.push(node.nodeValue);
	    }
	    var childNodes = node.childNodes;
	
	    if (childNodes) {
	      for (var i = 0, len = childNodes.length; i < len; i++) {
	        rs.push(this.getNodeText(childNodes[i]));
	      }
	    }
	
	    return rs.join('');
	  },
	  getNodeTextWithImgPlaceHolder: function getNodeTextWithImgPlaceHolder(node) {
	    //将图片替换成响应的占位符[L图片Y]
	    var rs = [];
	    if (node.nodeName == 'P' || node.nodeName == 'DIV' || node.nodeName == 'BR') {
	      rs.push('\r\n');
	    }
	
	    if (node.nodeName == 'IMG') {
	      //图片
	      rs.push('[L图片Y]');
	    }
	
	    if (node.nodeType == 3) {
	      //textnode
	      rs.push(node.nodeValue);
	    }
	    var childNodes = node.childNodes;
	
	    if (childNodes) {
	      for (var i = 0, len = childNodes.length; i < len; i++) {
	        rs.push(this.getNodeTextWithImgPlaceHolder(childNodes[i]));
	      }
	    }
	
	    return rs.join('');
	  },
	
	
	  //获取当前时间YYYY-MM-DD hh:mm:ss
	  getTime: function getTime() {
	    var date = new Date();
	    var year = date.getFullYear();
	    var month = date.getMonth() + 1;
	    var day = date.getDate();
	
	    var hour = date.getHours();
	    var minute = date.getMinutes();
	    var second = date.getSeconds();
	
	    var result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	
	    return result;
	  },
	
	  //按字符截取字符串
	  getStrByCharNums: function getStrByCharNums(str, num) {
	    var _num = 0;
	    var rs = [];
	    for (var i = 0, len = str.length; i < len; i++) {
	      if (str.charCodeAt(i) > 255) {
	        _num += 2;
	      } else {
	        _num++;
	      }
	      if (_num > num) {
	        break;
	      } else {
	        rs.push(str[i]);
	      }
	    }
	
	    return rs.join('');
	  },
	
	  //判断一个字符串是否符合链接规则
	  testUrl: function testUrl(str) {
	    return str.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g);
	  }
	};
	
	exports.util = util;

/***/ },

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Header = undefined;
	
	var _dataService = __webpack_require__(126);
	
	var _URLS = __webpack_require__(128);
	
	var _global = __webpack_require__(127);
	
	var _util = __webpack_require__(14);
	
	var _header = __webpack_require__(129);
	
	var _header2 = _interopRequireDefault(_header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var template = __webpack_require__(133);
	
	
	var Model = Backbone.Model.extend({
	  defaults: {}
	});
	
	var Header = Backbone.View.extend({
	
	  el: "#header",
	
	  events: {},
	
	  initialize: function initialize(options) {
	    this.model = new Model();
	    this.listenTo(this.model, 'change', this.render);
	    this.model.set({ userId: _global.global.userId });
	    this.model.set('hasLogin', _global.global.hasLogin);
	    this.model.set({ nickname: _global.global.nickname });
	    this.model.set({ loginUrl: 'http://www.baidu.com' });
	  },
	  render: function render() {
	    //var data = {userId: 705981}
	    this.$el.html(template.render(Object.assign({}, this.model.toJSON(), _header2['default'])));
	  }
	});
	
	exports.Header = Header;

/***/ },

/***/ 126:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getJSONP = exports.getJSON = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * 所有访问数据的接口调用该服务
	                                                                                                                                                                                                                                                                               */
	
	
	var _global = __webpack_require__(127);
	
	var getJSONP = function getJSONP(url, data) {
		return new Promise(function (resolve, reject) {
			getData(url, data, "POST", "jsonp", resolve, reject);
		});
	};
	var getJSON = function getJSON(url, data) {
		return new Promise(function (resolve, reject) {
			getData(url, data, "POST", "json", resolve, reject);
		});
	};
	
	var getData = function getData(url, data, method, dataType, success, error, theOptions) {
		var options = {
			url: url,
			method: method,
			data: data,
			dataType: dataType
		};
		$.extend(options, theOptions);
		if (typeof data == 'string') {
			options.contentType = 'application/json';
		}
		var request = $.ajax(options);
	
		request.done(function (data) {
			if (dataType == 'json' || dataType == 'jsonp') {
				// dataType == json || jsonp
				if ((typeof data === "undefined" ? "undefined" : _typeof(data)) == 'object' && typeof data.rs != 'undefined') {
					if (data.rs == 1) {
						if (typeof success == 'function') {
							success.call(this, data.resultMessage, request);
						}
					} else {
						if (typeof error == 'function') {
							error.call(this, data.rsdesp, request);
						} else {
							alert(data.rsdesp);
						}
					}
				}
			} else {
				//dataType == html
				if (typeof data == 'string' && data != 'error') {
					if (typeof success == 'function') {
						success.call(this, data, request);
					}
				} else {
					if (typeof error == 'function') {
						error.call(this, '请求数据失败，请稍后再试', jqXHR);
					} else {
						alert('请求数据失败，请稍后再试');
					}
				}
			}
		});
	
		request.fail(function (jqXHR, textStatus) {
			if (jqXHR.status == 401) {
				//TODO go to login page
				window.location.href = "#/login";
				return;
			}
			if (typeof error == 'function') {
				error.call(this, '请求数据失败，请稍后再试', jqXHR);
			} else {
				alert('请求数据失败，请稍后再试');
			}
		});
	};
	
	$(document).ajaxStart(function () {
		if (_global.global.showAjaxConnectionTip) {
			$(".warn-box-small").show();
		} else {
			_global.global.showAjaxConnectionTip = true;
		}
	});
	$(document).ajaxStop(function () {
		$(".warn-box-small").hide();
	});
	
	exports.getJSON = getJSON;
	exports.getJSONP = getJSONP;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },

/***/ 127:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var global = {
	    hasLogin: '',
	    userId: '',
	    nickname: '',
	    login: function login(params) {
	        this.hasLogin = params.hasLogin;
	        this.userId = params.userId ? params.userId : -1;
	        this.nickname = params.nickname;
	    },
	    logout: function logout() {
	        this.hasLogin = false;
	        this.userId = '';
	        this.nickname = '';
	    },
	
	    showAjaxConnectionTip: true
	};
	
	exports.global = global;

/***/ },

/***/ 128:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var COUNT_FOLLOW_BY_USER_ID = exports.COUNT_FOLLOW_BY_USER_ID = '/community-pc-war/user/countFollowByUserId.action';
	var GET_USER_INFO = exports.GET_USER_INFO = '/community-pc-war/common/getUserInfo.action';

/***/ },

/***/ 129:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"main":"header__main___39kaE common__h80___3CTSR","logo":"header__logo___231tM common__fl___3B3Aa common__ml30___2r7BV","user-info":"header__user-info___2AYKC common__fr___1SbkI common__tar___3MD04 common__pr15___2rxzC common__w150___29KB4"};

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(134);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"");t.b(t.v(t.f("main",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("  <div class=\"");t.b(t.v(t.f("logo",c,p,0)));t.b("\"></div>\r");t.b("\n" + i);if(!t.s(t.f("hasLogin",c,p,1),c,p,1,0,0,"")){t.b("    <a class=\"btn btn-login\" href=\"");t.b(t.v(t.f("loginUrl",c,p,0)));t.b("\">登录</a>\r");t.b("\n" + i);t.b("    <a class=\"btn btn-register\" href=\"");t.b(t.v(t.f("loginUrl",c,p,0)));t.b("\">注册</a>\r");t.b("\n" + i);};if(t.s(t.f("hasLogin",c,p,1),c,p,0,222,294,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"");t.b(t.v(t.f("user-info",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("    ");t.b(t.v(t.f("nickname",c,p,0)));t.b(" | 退出\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);});c.pop();}t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"{{main}}\">\r\n  <div class=\"{{logo}}\"></div>\r\n  {{^hasLogin}}\r\n    <a class=\"btn btn-login\" href=\"{{loginUrl}}\">登录</a>\r\n    <a class=\"btn btn-register\" href=\"{{loginUrl}}\">注册</a>\r\n  {{/hasLogin}}\r\n  {{#hasLogin}}\r\n    <div class=\"{{user-info}}\">\r\n    {{nickname}} | 退出\r\n    </div>\r\n  {{/hasLogin}}\r\n</div>", H);return T; }();

/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */
	
	// This file is for use with Node.js. See dist/ for browser files.
	
	var Hogan = __webpack_require__(135);
	Hogan.Template = __webpack_require__(136).Template;
	Hogan.template = Hogan.Template;
	module.exports = Hogan;


/***/ },

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */
	
	(function (Hogan) {
	  // Setup regex  assignments
	  // remove whitespace according to Mustache spec
	  var rIsWhitespace = /\S/,
	      rQuot = /\"/g,
	      rNewline =  /\n/g,
	      rCr = /\r/g,
	      rSlash = /\\/g,
	      rLineSep = /\u2028/,
	      rParagraphSep = /\u2029/;
	
	  Hogan.tags = {
	    '#': 1, '^': 2, '<': 3, '$': 4,
	    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
	    '{': 10, '&': 11, '_t': 12
	  };
	
	  Hogan.scan = function scan(text, delimiters) {
	    var len = text.length,
	        IN_TEXT = 0,
	        IN_TAG_TYPE = 1,
	        IN_TAG = 2,
	        state = IN_TEXT,
	        tagType = null,
	        tag = null,
	        buf = '',
	        tokens = [],
	        seenTag = false,
	        i = 0,
	        lineStart = 0,
	        otag = '{{',
	        ctag = '}}';
	
	    function addBuf() {
	      if (buf.length > 0) {
	        tokens.push({tag: '_t', text: new String(buf)});
	        buf = '';
	      }
	    }
	
	    function lineIsWhitespace() {
	      var isAllWhitespace = true;
	      for (var j = lineStart; j < tokens.length; j++) {
	        isAllWhitespace =
	          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
	          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
	        if (!isAllWhitespace) {
	          return false;
	        }
	      }
	
	      return isAllWhitespace;
	    }
	
	    function filterLine(haveSeenTag, noNewLine) {
	      addBuf();
	
	      if (haveSeenTag && lineIsWhitespace()) {
	        for (var j = lineStart, next; j < tokens.length; j++) {
	          if (tokens[j].text) {
	            if ((next = tokens[j+1]) && next.tag == '>') {
	              // set indent to token value
	              next.indent = tokens[j].text.toString()
	            }
	            tokens.splice(j, 1);
	          }
	        }
	      } else if (!noNewLine) {
	        tokens.push({tag:'\n'});
	      }
	
	      seenTag = false;
	      lineStart = tokens.length;
	    }
	
	    function changeDelimiters(text, index) {
	      var close = '=' + ctag,
	          closeIndex = text.indexOf(close, index),
	          delimiters = trim(
	            text.substring(text.indexOf('=', index) + 1, closeIndex)
	          ).split(' ');
	
	      otag = delimiters[0];
	      ctag = delimiters[delimiters.length - 1];
	
	      return closeIndex + close.length - 1;
	    }
	
	    if (delimiters) {
	      delimiters = delimiters.split(' ');
	      otag = delimiters[0];
	      ctag = delimiters[1];
	    }
	
	    for (i = 0; i < len; i++) {
	      if (state == IN_TEXT) {
	        if (tagChange(otag, text, i)) {
	          --i;
	          addBuf();
	          state = IN_TAG_TYPE;
	        } else {
	          if (text.charAt(i) == '\n') {
	            filterLine(seenTag);
	          } else {
	            buf += text.charAt(i);
	          }
	        }
	      } else if (state == IN_TAG_TYPE) {
	        i += otag.length - 1;
	        tag = Hogan.tags[text.charAt(i + 1)];
	        tagType = tag ? text.charAt(i + 1) : '_v';
	        if (tagType == '=') {
	          i = changeDelimiters(text, i);
	          state = IN_TEXT;
	        } else {
	          if (tag) {
	            i++;
	          }
	          state = IN_TAG;
	        }
	        seenTag = i;
	      } else {
	        if (tagChange(ctag, text, i)) {
	          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
	                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
	          buf = '';
	          i += ctag.length - 1;
	          state = IN_TEXT;
	          if (tagType == '{') {
	            if (ctag == '}}') {
	              i++;
	            } else {
	              cleanTripleStache(tokens[tokens.length - 1]);
	            }
	          }
	        } else {
	          buf += text.charAt(i);
	        }
	      }
	    }
	
	    filterLine(seenTag, true);
	
	    return tokens;
	  }
	
	  function cleanTripleStache(token) {
	    if (token.n.substr(token.n.length - 1) === '}') {
	      token.n = token.n.substring(0, token.n.length - 1);
	    }
	  }
	
	  function trim(s) {
	    if (s.trim) {
	      return s.trim();
	    }
	
	    return s.replace(/^\s*|\s*$/g, '');
	  }
	
	  function tagChange(tag, text, index) {
	    if (text.charAt(index) != tag.charAt(0)) {
	      return false;
	    }
	
	    for (var i = 1, l = tag.length; i < l; i++) {
	      if (text.charAt(index + i) != tag.charAt(i)) {
	        return false;
	      }
	    }
	
	    return true;
	  }
	
	  // the tags allowed inside super templates
	  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};
	
	  function buildTree(tokens, kind, stack, customTags) {
	    var instructions = [],
	        opener = null,
	        tail = null,
	        token = null;
	
	    tail = stack[stack.length - 1];
	
	    while (tokens.length > 0) {
	      token = tokens.shift();
	
	      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
	        throw new Error('Illegal content in < super tag.');
	      }
	
	      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
	        stack.push(token);
	        token.nodes = buildTree(tokens, token.tag, stack, customTags);
	      } else if (token.tag == '/') {
	        if (stack.length === 0) {
	          throw new Error('Closing tag without opener: /' + token.n);
	        }
	        opener = stack.pop();
	        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
	          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
	        }
	        opener.end = token.i;
	        return instructions;
	      } else if (token.tag == '\n') {
	        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
	      }
	
	      instructions.push(token);
	    }
	
	    if (stack.length > 0) {
	      throw new Error('missing closing tag: ' + stack.pop().n);
	    }
	
	    return instructions;
	  }
	
	  function isOpener(token, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].o == token.n) {
	        token.tag = '#';
	        return true;
	      }
	    }
	  }
	
	  function isCloser(close, open, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].c == close && tags[i].o == open) {
	        return true;
	      }
	    }
	  }
	
	  function stringifySubstitutions(obj) {
	    var items = [];
	    for (var key in obj) {
	      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
	    }
	    return "{ " + items.join(",") + " }";
	  }
	
	  function stringifyPartials(codeObj) {
	    var partials = [];
	    for (var key in codeObj.partials) {
	      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
	    }
	    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
	  }
	
	  Hogan.stringify = function(codeObj, text, options) {
	    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
	  }
	
	  var serialNo = 0;
	  Hogan.generate = function(tree, text, options) {
	    serialNo = 0;
	    var context = { code: '', subs: {}, partials: {} };
	    Hogan.walk(tree, context);
	
	    if (options.asString) {
	      return this.stringify(context, text, options);
	    }
	
	    return this.makeTemplate(context, text, options);
	  }
	
	  Hogan.wrapMain = function(code) {
	    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
	  }
	
	  Hogan.template = Hogan.Template;
	
	  Hogan.makeTemplate = function(codeObj, text, options) {
	    var template = this.makePartials(codeObj);
	    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
	    return new this.template(template, text, this, options);
	  }
	
	  Hogan.makePartials = function(codeObj) {
	    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
	    for (key in template.partials) {
	      template.partials[key] = this.makePartials(template.partials[key]);
	    }
	    for (key in codeObj.subs) {
	      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
	    }
	    return template;
	  }
	
	  function esc(s) {
	    return s.replace(rSlash, '\\\\')
	            .replace(rQuot, '\\\"')
	            .replace(rNewline, '\\n')
	            .replace(rCr, '\\r')
	            .replace(rLineSep, '\\u2028')
	            .replace(rParagraphSep, '\\u2029');
	  }
	
	  function chooseMethod(s) {
	    return (~s.indexOf('.')) ? 'd' : 'f';
	  }
	
	  function createPartial(node, context) {
	    var prefix = "<" + (context.prefix || "");
	    var sym = prefix + node.n + serialNo++;
	    context.partials[sym] = {name: node.n, partials: {}};
	    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
	    return sym;
	  }
	
	  Hogan.codegen = {
	    '#': function(node, context) {
	      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
	                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
	                      't.rs(c,p,' + 'function(c,p,t){';
	      Hogan.walk(node.nodes, context);
	      context.code += '});c.pop();}';
	    },
	
	    '^': function(node, context) {
	      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
	      Hogan.walk(node.nodes, context);
	      context.code += '};';
	    },
	
	    '>': createPartial,
	    '<': function(node, context) {
	      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
	      Hogan.walk(node.nodes, ctx);
	      var template = context.partials[createPartial(node, context)];
	      template.subs = ctx.subs;
	      template.partials = ctx.partials;
	    },
	
	    '$': function(node, context) {
	      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
	      Hogan.walk(node.nodes, ctx);
	      context.subs[node.n] = ctx.code;
	      if (!context.inPartial) {
	        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
	      }
	    },
	
	    '\n': function(node, context) {
	      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
	    },
	
	    '_v': function(node, context) {
	      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	    },
	
	    '_t': function(node, context) {
	      context.code += write('"' + esc(node.text) + '"');
	    },
	
	    '{': tripleStache,
	
	    '&': tripleStache
	  }
	
	  function tripleStache(node, context) {
	    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	  }
	
	  function write(s) {
	    return 't.b(' + s + ');';
	  }
	
	  Hogan.walk = function(nodelist, context) {
	    var func;
	    for (var i = 0, l = nodelist.length; i < l; i++) {
	      func = Hogan.codegen[nodelist[i].tag];
	      func && func(nodelist[i], context);
	    }
	    return context;
	  }
	
	  Hogan.parse = function(tokens, text, options) {
	    options = options || {};
	    return buildTree(tokens, '', [], options.sectionTags || []);
	  }
	
	  Hogan.cache = {};
	
	  Hogan.cacheKey = function(text, options) {
	    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
	  }
	
	  Hogan.compile = function(text, options) {
	    options = options || {};
	    var key = Hogan.cacheKey(text, options);
	    var template = this.cache[key];
	
	    if (template) {
	      var partials = template.partials;
	      for (var name in partials) {
	        delete partials[name].instance;
	      }
	      return template;
	    }
	
	    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
	    return this.cache[key] = template;
	  }
	})( true ? exports : Hogan);


/***/ },

/***/ 136:
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */
	
	var Hogan = {};
	
	(function (Hogan) {
	  Hogan.Template = function (codeObj, text, compiler, options) {
	    codeObj = codeObj || {};
	    this.r = codeObj.code || this.r;
	    this.c = compiler;
	    this.options = options || {};
	    this.text = text || '';
	    this.partials = codeObj.partials || {};
	    this.subs = codeObj.subs || {};
	    this.buf = '';
	  }
	
	  Hogan.Template.prototype = {
	    // render: replaced by generated code.
	    r: function (context, partials, indent) { return ''; },
	
	    // variable escaping
	    v: hoganEscape,
	
	    // triple stache
	    t: coerceToString,
	
	    render: function render(context, partials, indent) {
	      return this.ri([context], partials || {}, indent);
	    },
	
	    // render internal -- a hook for overrides that catches partials too
	    ri: function (context, partials, indent) {
	      return this.r(context, partials, indent);
	    },
	
	    // ensurePartial
	    ep: function(symbol, partials) {
	      var partial = this.partials[symbol];
	
	      // check to see that if we've instantiated this partial before
	      var template = partials[partial.name];
	      if (partial.instance && partial.base == template) {
	        return partial.instance;
	      }
	
	      if (typeof template == 'string') {
	        if (!this.c) {
	          throw new Error("No compiler available.");
	        }
	        template = this.c.compile(template, this.options);
	      }
	
	      if (!template) {
	        return null;
	      }
	
	      // We use this to check whether the partials dictionary has changed
	      this.partials[symbol].base = template;
	
	      if (partial.subs) {
	        // Make sure we consider parent template now
	        if (!partials.stackText) partials.stackText = {};
	        for (key in partial.subs) {
	          if (!partials.stackText[key]) {
	            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
	          }
	        }
	        template = createSpecializedPartial(template, partial.subs, partial.partials,
	          this.stackSubs, this.stackPartials, partials.stackText);
	      }
	      this.partials[symbol].instance = template;
	
	      return template;
	    },
	
	    // tries to find a partial in the current scope and render it
	    rp: function(symbol, context, partials, indent) {
	      var partial = this.ep(symbol, partials);
	      if (!partial) {
	        return '';
	      }
	
	      return partial.ri(context, partials, indent);
	    },
	
	    // render a section
	    rs: function(context, partials, section) {
	      var tail = context[context.length - 1];
	
	      if (!isArray(tail)) {
	        section(context, partials, this);
	        return;
	      }
	
	      for (var i = 0; i < tail.length; i++) {
	        context.push(tail[i]);
	        section(context, partials, this);
	        context.pop();
	      }
	    },
	
	    // maybe start a section
	    s: function(val, ctx, partials, inverted, start, end, tags) {
	      var pass;
	
	      if (isArray(val) && val.length === 0) {
	        return false;
	      }
	
	      if (typeof val == 'function') {
	        val = this.ms(val, ctx, partials, inverted, start, end, tags);
	      }
	
	      pass = !!val;
	
	      if (!inverted && pass && ctx) {
	        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
	      }
	
	      return pass;
	    },
	
	    // find values with dotted names
	    d: function(key, ctx, partials, returnFound) {
	      var found,
	          names = key.split('.'),
	          val = this.f(names[0], ctx, partials, returnFound),
	          doModelGet = this.options.modelGet,
	          cx = null;
	
	      if (key === '.' && isArray(ctx[ctx.length - 2])) {
	        val = ctx[ctx.length - 1];
	      } else {
	        for (var i = 1; i < names.length; i++) {
	          found = findInScope(names[i], val, doModelGet);
	          if (found !== undefined) {
	            cx = val;
	            val = found;
	          } else {
	            val = '';
	          }
	        }
	      }
	
	      if (returnFound && !val) {
	        return false;
	      }
	
	      if (!returnFound && typeof val == 'function') {
	        ctx.push(cx);
	        val = this.mv(val, ctx, partials);
	        ctx.pop();
	      }
	
	      return val;
	    },
	
	    // find values with normal names
	    f: function(key, ctx, partials, returnFound) {
	      var val = false,
	          v = null,
	          found = false,
	          doModelGet = this.options.modelGet;
	
	      for (var i = ctx.length - 1; i >= 0; i--) {
	        v = ctx[i];
	        val = findInScope(key, v, doModelGet);
	        if (val !== undefined) {
	          found = true;
	          break;
	        }
	      }
	
	      if (!found) {
	        return (returnFound) ? false : "";
	      }
	
	      if (!returnFound && typeof val == 'function') {
	        val = this.mv(val, ctx, partials);
	      }
	
	      return val;
	    },
	
	    // higher order templates
	    ls: function(func, cx, partials, text, tags) {
	      var oldTags = this.options.delimiters;
	
	      this.options.delimiters = tags;
	      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
	      this.options.delimiters = oldTags;
	
	      return false;
	    },
	
	    // compile text
	    ct: function(text, cx, partials) {
	      if (this.options.disableLambda) {
	        throw new Error('Lambda features disabled.');
	      }
	      return this.c.compile(text, this.options).render(cx, partials);
	    },
	
	    // template result buffering
	    b: function(s) { this.buf += s; },
	
	    fl: function() { var r = this.buf; this.buf = ''; return r; },
	
	    // method replace section
	    ms: function(func, ctx, partials, inverted, start, end, tags) {
	      var textSource,
	          cx = ctx[ctx.length - 1],
	          result = func.call(cx);
	
	      if (typeof result == 'function') {
	        if (inverted) {
	          return true;
	        } else {
	          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
	          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
	        }
	      }
	
	      return result;
	    },
	
	    // method replace variable
	    mv: function(func, ctx, partials) {
	      var cx = ctx[ctx.length - 1];
	      var result = func.call(cx);
	
	      if (typeof result == 'function') {
	        return this.ct(coerceToString(result.call(cx)), cx, partials);
	      }
	
	      return result;
	    },
	
	    sub: function(name, context, partials, indent) {
	      var f = this.subs[name];
	      if (f) {
	        this.activeSub = name;
	        f(context, partials, this, indent);
	        this.activeSub = false;
	      }
	    }
	
	  };
	
	  //Find a key in an object
	  function findInScope(key, scope, doModelGet) {
	    var val;
	
	    if (scope && typeof scope == 'object') {
	
	      if (scope[key] !== undefined) {
	        val = scope[key];
	
	      // try lookup with get for backbone or similar model data
	      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
	        val = scope.get(key);
	      }
	    }
	
	    return val;
	  }
	
	  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
	    function PartialTemplate() {};
	    PartialTemplate.prototype = instance;
	    function Substitutions() {};
	    Substitutions.prototype = instance.subs;
	    var key;
	    var partial = new PartialTemplate();
	    partial.subs = new Substitutions();
	    partial.subsText = {};  //hehe. substext.
	    partial.buf = '';
	
	    stackSubs = stackSubs || {};
	    partial.stackSubs = stackSubs;
	    partial.subsText = stackText;
	    for (key in subs) {
	      if (!stackSubs[key]) stackSubs[key] = subs[key];
	    }
	    for (key in stackSubs) {
	      partial.subs[key] = stackSubs[key];
	    }
	
	    stackPartials = stackPartials || {};
	    partial.stackPartials = stackPartials;
	    for (key in partials) {
	      if (!stackPartials[key]) stackPartials[key] = partials[key];
	    }
	    for (key in stackPartials) {
	      partial.partials[key] = stackPartials[key];
	    }
	
	    return partial;
	  }
	
	  var rAmp = /&/g,
	      rLt = /</g,
	      rGt = />/g,
	      rApos = /\'/g,
	      rQuot = /\"/g,
	      hChars = /[&<>\"\']/;
	
	  function coerceToString(val) {
	    return String((val === null || val === undefined) ? '' : val);
	  }
	
	  function hoganEscape(str) {
	    str = coerceToString(str);
	    return hChars.test(str) ?
	      str
	        .replace(rAmp, '&amp;')
	        .replace(rLt, '&lt;')
	        .replace(rGt, '&gt;')
	        .replace(rApos, '&#39;')
	        .replace(rQuot, '&quot;') :
	      str;
	  }
	
	  var isArray = Array.isArray || function(a) {
	    return Object.prototype.toString.call(a) === '[object Array]';
	  };
	
	})( true ? exports : Hogan);


/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Footer = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _footer = __webpack_require__(138);
	
	var _footer2 = _interopRequireDefault(_footer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var template = __webpack_require__(140);
	
	var Model = Backbone.Model.extend({
	  defaults: {}
	});
	
	var Footer = Backbone.View.extend({
	
	  el: "#footer",
	
	  initialize: function initialize(options) {
	    this.render();
	  },
	  render: function render() {
	    this.$el.html(template.render(_extends({}, _footer2['default'])));
	  }
	});
	
	exports.Footer = Footer;

/***/ },

/***/ 138:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"main":"footer__main___3-RBh common__w_100___2QxCw common__h50___1g1kO common__white___1EM3B common__tac___1O5q-","text":"footer__text___2ZHGo"};

/***/ },

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(134);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"");t.b(t.v(t.f("main",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("      <h1 class=\"");t.b(t.v(t.f("text",c,p,0)));t.b("\">Footer</h1>          \r");t.b("\n" + i);t.b("</div>\r");t.b("\n" + i);t.b("\r");t.b("\n" + i);t.b("<!-- 数据加载提示 -->\r");t.b("\n" + i);t.b("<div class=\"warn-box warn-box-small\" style=\"display:none;\">\r");t.b("\n" + i);t.b("    <div class=\"warn-tip-img\">\r");t.b("\n" + i);t.b("        <img src=\"images/icon/loading.png\">\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);t.b("    <div class=\"warn-tip-msg-box\">\r");t.b("\n" + i);t.b("        <div class=\"warn-tip-msg\">数据加载中</div>\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"{{main}}\">\r\n      <h1 class=\"{{text}}\">Footer</h1>          \r\n</div>\r\n\r\n<!-- 数据加载提示 -->\r\n<div class=\"warn-box warn-box-small\" style=\"display:none;\">\r\n    <div class=\"warn-tip-img\">\r\n        <img src=\"images/icon/loading.png\">\r\n    </div>\r\n    <div class=\"warn-tip-msg-box\">\r\n        <div class=\"warn-tip-msg\">数据加载中</div>\r\n    </div>\r\n</div>", H);return T; }();

/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _home = __webpack_require__(142);
	
	var _home2 = _interopRequireDefault(_home);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var template = __webpack_require__(146);
	
	
	var Model = Backbone.Model.extend({
	  defaults: {
	    showGotoTop: true
	  }
	});
	
	var Home = Backbone.View.extend({
	
	  events: {
	    'click #gotoTop': 'gotoTop',
	    'click #refreshBtn': 'refresh'
	  },
	
	  gotoTop: function gotoTop() {
	    $(window).scrollTop(0);
	  },
	
	  refresh: function refresh() {
	    this.render(); //刷新页面
	    this.gotoTop(); //回到顶部
	  },
	
	  initialize: function initialize(options) {
	    this.model = new Model();
	    this.listenTo(this.model, "change", this.render);
	    this.render();
	
	    var that = this;
	    $(window).on('scroll', function () {
	      //滚动监听，控制按钮的显示与隐藏
	      var top = $(this).scrollTop();
	      var height = $(window).height();
	      var bottomHeight = $('#footer').offset().top; //footer距离顶部的高度
	      //if (top > height) {
	      if (top + height > bottomHeight) {
	        that.$el.find('.hanging-block').css('bottom', '280px').show();
	      } else {
	        that.$el.find('.hanging-block').css('bottom', '120px').show();
	      }
	      // } else {
	      //   that.$el.find('.hanging-block').hide();
	      // }
	    });
	  },
	
	  render: function render() {
	    var data = this.model.toJSON();
	    this.$el.html(template.render(Object.assign({}, data, _home2['default'])));
	  }
	
	});
	
	exports['default'] = Home;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },

/***/ 142:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"main":"home__main___3k70K common__p20___3gg_y","title":"home__title___10FUx common__tac___1O5q-","spacing":"home__spacing___3lP0r common__w_100___2QxCw common__mt10___1-YWA common__mb10___2KIgB","operate":"home__operate___3SjaF common__w_100___2QxCw common__ofh___3x62z","icon":"home__icon___Nj_bC common__fl___3B3Aa","icon-refresh":"home__icon-refresh___3mA2O home__icon___Nj_bC common__fl___3B3Aa","icon-gotop":"home__icon-gotop___2oZLQ common__ml15___Z8n-y home__icon___Nj_bC common__fl___3B3Aa","text":"home__text___2RyOQ common__fl___3B3Aa"};

/***/ },

/***/ 146:
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(134);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(" <div class=\"");t.b(t.v(t.f("main",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("    <div>\r");t.b("\n" + i);t.b("        <h1 class=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\">如何发ajax</h1>\r");t.b("\n" + i);t.b("        <div>\r");t.b("\n" + i);t.b("                <span>引用依赖：</span><code>import {getJSON} from '../common/dataService';</code>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("        <div>\r");t.b("\n" + i);t.b("                <span>方法名称：</span><code>getJSON</code>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("        <div>\r");t.b("\n" + i);t.b("                <span>参数：</span><code>(url, params)</code>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("        <div>\r");t.b("\n" + i);t.b("                <span>例子：</span><br>\r");t.b("\n" + i);t.b("                <code>\r");t.b("\n" + i);t.b("                    getJSON(IF_EXIST_NEW_MESSAGES, <br>\r");t.b("\n" + i);t.b("                            &nbsp&nbsp&nbsp&nbsp&nbsp{userId : global.userId, reqTime: util.getTime()})<br>\r");t.b("\n" + i);t.b("                        &nbsp&nbsp&nbsp&nbsp&nbsp.then(data => this.model.set({systemMessageCount: data, userId: global.userId}))<br>\r");t.b("\n" + i);t.b("                        &nbsp&nbsp&nbsp&nbsp&nbsp.catch(e => alert(e));<br>\r");t.b("\n" + i);t.b("                </code>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("        <div class=\"");t.b(t.v(t.f("spacing",c,p,0)));t.b("\"></div>\r");t.b("\n" + i);t.b("        <h1 class=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\">如何增加router</h1>\r");t.b("\n" + i);t.b("        <div>\r");t.b("\n" + i);t.b("                在router.js中的routes增加route。\r");t.b("\n" + i);t.b("                routers的key对应路由hash，value对应方法名称\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("        <div>\r");t.b("\n" + i);t.b("                <span>例子：</span><br>\r");t.b("\n" + i);t.b("                <code>\r");t.b("\n" + i);t.b("                    routes: {\r");t.b("\n" + i);t.b("                        \"\":        \"home\",  // #home\r");t.b("\n" + i);t.b("                        \"home\":        \"home\",  // #home\r");t.b("\n" + i);t.b("                        \"manage/:id\":  \"manage\" // #manage/1\r");t.b("\n" + i);t.b("                      },\r");t.b("\n" + i);t.b("                </code>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("        <div><a style=\"color: blue;\" href=\"#manage/123\">跳转到#manage，id=123</a></div>\r");t.b("\n" + i);t.b("        <div class=\"");t.b(t.v(t.f("spacing",c,p,0)));t.b("\"></div>\r");t.b("\n" + i);t.b("        <h1 class=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\">如何增加一个页面</h1>\r");t.b("\n" + i);t.b("        <div>在src中为每一个页面增加一个文件夹，对应hash的第一层。如#manage对应manage文件夹</div>\r");t.b("\n" + i);t.b("        <div>在文件夹中，新建一个js和html，分别是脚本和模板内容</div>\r");t.b("\n" + i);t.b("        <div>js和html的名字与文件夹保持一致，首字母大写</div>\r");t.b("\n" + i);t.b("        <div class=\"");t.b(t.v(t.f("spacing",c,p,0)));t.b("\"></div>\r");t.b("\n" + i);t.b("        <h1 class=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\">如何使用hogan</h1>\r");t.b("\n" + i);t.b("        <div>使用mustache-loader来处理模板，注意虽然名字是mustache-loader，但是使用的是hogan</div>\r");t.b("\n" + i);t.b("        <div>\r");t.b("\n" + i);t.b("                <span>例子：</span><br>\r");t.b("\n" + i);t.b("                <code>\r");t.b("\n" + i);t.b("                    var template = require('./Header.html');<br>\r");t.b("\n" + i);t.b("                    var data = this.model.toJSON();<br>\r");t.b("\n" + i);t.b("                    this.$el.html(template.render(data));\r");t.b("\n" + i);t.b("                </code>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("        <div class=\"");t.b(t.v(t.f("spacing",c,p,0)));t.b("\"></div>\r");t.b("\n" + i);t.b("        <h1 class=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\">前端启动server: </h1>\r");t.b("\n" + i);t.b("        <code>npm start</code>\r");t.b("\n" + i);t.b("        <div class=\"");t.b(t.v(t.f("spacing",c,p,0)));t.b("\"></div>\r");t.b("\n" + i);t.b("        <h1 class=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\">前端编译: </h1>\r");t.b("\n" + i);t.b("        <code>npm run dist</code><br>\r");t.b("\n" + i);t.b("        <span style=\"color:red\">前端编译前，记得svn up</span><br>\r");t.b("\n" + i);t.b("        <span style=\"color:red\">提交编译后的代码，记得要与frontend同级的webapp目录下的编译后的代码也要提交</span>\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);t.b("    <div class=\"");t.b(t.v(t.f("spacing",c,p,0)));t.b("\"></div>\r");t.b("\n" + i);t.b("    <div class=\"");t.b(t.v(t.f("operate",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("        <div class=\"");t.b(t.v(t.f("icon-refresh",c,p,0)));t.b("\"></div>\r");t.b("\n" + i);t.b("        <div id=\"refreshBtn\" class=\"");t.b(t.v(t.f("text",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("            <a>刷新</a>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("        <div class=\"");t.b(t.v(t.f("icon-gotop",c,p,0)));t.b("\"></div>\r");t.b("\n" + i);t.b("        <div class=\"");t.b(t.v(t.f("text",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("            <a id=\"gotoTop\">返回顶部</a>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);t.b(" </div>");return t.fl(); },partials: {}, subs: {  }}, " <div class=\"{{main}}\">\r\n    <div>\r\n        <h1 class=\"{{title}}\">如何发ajax</h1>\r\n        <div>\r\n                <span>引用依赖：</span><code>import {getJSON} from '../common/dataService';</code>\r\n        </div>\r\n        <div>\r\n                <span>方法名称：</span><code>getJSON</code>\r\n        </div>\r\n        <div>\r\n                <span>参数：</span><code>(url, params)</code>\r\n        </div>\r\n        <div>\r\n                <span>例子：</span><br>\r\n                <code>\r\n                    getJSON(IF_EXIST_NEW_MESSAGES, <br>\r\n                            &nbsp&nbsp&nbsp&nbsp&nbsp{userId : global.userId, reqTime: util.getTime()})<br>\r\n                        &nbsp&nbsp&nbsp&nbsp&nbsp.then(data => this.model.set({systemMessageCount: data, userId: global.userId}))<br>\r\n                        &nbsp&nbsp&nbsp&nbsp&nbsp.catch(e => alert(e));<br>\r\n                </code>\r\n        </div>\r\n        <div class=\"{{spacing}}\"></div>\r\n        <h1 class=\"{{title}}\">如何增加router</h1>\r\n        <div>\r\n                在router.js中的routes增加route。\r\n                routers的key对应路由hash，value对应方法名称\r\n        </div>\r\n        <div>\r\n                <span>例子：</span><br>\r\n                <code>\r\n                    routes: {\r\n                        \"\":        \"home\",  // #home\r\n                        \"home\":        \"home\",  // #home\r\n                        \"manage/:id\":  \"manage\" // #manage/1\r\n                      },\r\n                </code>\r\n        </div>\r\n        <div><a style=\"color: blue;\" href=\"#manage/123\">跳转到#manage，id=123</a></div>\r\n        <div class=\"{{spacing}}\"></div>\r\n        <h1 class=\"{{title}}\">如何增加一个页面</h1>\r\n        <div>在src中为每一个页面增加一个文件夹，对应hash的第一层。如#manage对应manage文件夹</div>\r\n        <div>在文件夹中，新建一个js和html，分别是脚本和模板内容</div>\r\n        <div>js和html的名字与文件夹保持一致，首字母大写</div>\r\n        <div class=\"{{spacing}}\"></div>\r\n        <h1 class=\"{{title}}\">如何使用hogan</h1>\r\n        <div>使用mustache-loader来处理模板，注意虽然名字是mustache-loader，但是使用的是hogan</div>\r\n        <div>\r\n                <span>例子：</span><br>\r\n                <code>\r\n                    var template = require('./Header.html');<br>\r\n                    var data = this.model.toJSON();<br>\r\n                    this.$el.html(template.render(data));\r\n                </code>\r\n        </div>\r\n        <div class=\"{{spacing}}\"></div>\r\n        <h1 class=\"{{title}}\">前端启动server: </h1>\r\n        <code>npm start</code>\r\n        <div class=\"{{spacing}}\"></div>\r\n        <h1 class=\"{{title}}\">前端编译: </h1>\r\n        <code>npm run dist</code><br>\r\n        <span style=\"color:red\">前端编译前，记得svn up</span><br>\r\n        <span style=\"color:red\">提交编译后的代码，记得要与frontend同级的webapp目录下的编译后的代码也要提交</span>\r\n    </div>\r\n    <div class=\"{{spacing}}\"></div>\r\n    <div class=\"{{operate}}\">\r\n        <div class=\"{{icon-refresh}}\"></div>\r\n        <div id=\"refreshBtn\" class=\"{{text}}\">\r\n            <a>刷新</a>\r\n        </div>\r\n        <div class=\"{{icon-gotop}}\"></div>\r\n        <div class=\"{{text}}\">\r\n            <a id=\"gotoTop\">返回顶部</a>\r\n        </div>\r\n    </div>\r\n </div>", H);return T; }();

/***/ },

/***/ 147:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Manage = undefined;
	
	var _manage = __webpack_require__(148);
	
	var _manage2 = _interopRequireDefault(_manage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var template = __webpack_require__(150);
	
	
	var Model = Backbone.Model.extend({
	  defaults: {
	    text: "这是Manage页面",
	    id: ""
	  }
	});
	
	var Manage = Backbone.View.extend({
	
	  initialize: function initialize(options) {
	    this.model = new Model();
	    this.listenTo(this.model, "change", this.render);
	    this.model.set({
	      id: options.id
	    });
	  },
	
	  render: function render() {
	    var data = this.model.toJSON();
	    this.$el.html(template.render(Object.assign({}, data, _manage2['default'])));
	  }
	
	});
	
	exports.Manage = Manage;

/***/ },

/***/ 148:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"main":"manage__main___fPYoh common__p20___3gg_y","title":"manage__title___VZ23P common__tac___1O5q-"};

/***/ },

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(134);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(" <div class=\"");t.b(t.v(t.f("main",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("    <h1 class=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\">Manage</h1>\r");t.b("\n" + i);t.b("    <div>\r");t.b("\n" + i);t.b("        <h2>text: ");t.b(t.v(t.f("text",c,p,0)));t.b("</h2>\r");t.b("\n" + i);t.b("        <h2>id: ");t.b(t.v(t.f("id",c,p,0)));t.b("</h2>\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);t.b(" </div>");return t.fl(); },partials: {}, subs: {  }}, " <div class=\"{{main}}\">\r\n    <h1 class=\"{{title}}\">Manage</h1>\r\n    <div>\r\n        <h2>text: {{text}}</h2>\r\n        <h2>id: {{id}}</h2>\r\n    </div>\r\n </div>", H);return T; }();

/***/ }

});
//# sourceMappingURL=index.js.map