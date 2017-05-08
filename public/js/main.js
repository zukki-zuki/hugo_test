var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* global jQuery */

/**
 * jQueryオブジェクトの拡張
 *
 * @date 2016-12-07
 */
 (function ($) {
	/**
  * userAgent判定フラグ
  *
  * @date 2016-06-02
  */
  var ua = navigator.userAgent.toLowerCase();
  $.ua = {
		// Windows
		isWindows: /windows/.test(ua),
		// Mac
		isMac: /macintosh/.test(ua),
		// IE
		isIE: /msie (\d+)|trident/.test(ua),
		// IE9未満
		isLtIE9: /msie (\d+)/.test(ua) && RegExp.$1 < 9,
		// IE10未満
		isLtIE10: /msie (\d+)/.test(ua) && RegExp.$1 < 10,
		// Firefox
		isFirefox: /firefox/.test(ua),
		// WebKit
		isWebKit: /applewebkit/.test(ua),
		// Chrome
		isChrome: /chrome/.test(ua),
		// Safari
		isSafari: /safari/.test(ua) && !/chrome/.test(ua) && !/mobile/.test(ua),
		// iOS
		isIOS: /i(phone|pod|pad)/.test(ua),
		// iOS Chrome
		isIOSChrome: /crios/.test(ua),
		// iPhone、iPod touch
		isIPhone: /i(phone|pod)/.test(ua),
		// iPad
		isIPad: /ipad/.test(ua),
		// Android
		isAndroid: /android/.test(ua),
		// モバイル版Android
		isAndroidMobile: /android(.+)?mobile/.test(ua),
		// タッチデバイス
		isTouchDevice: 'ontouchstart' in window,
		// スマートフォン
		isMobile: /i(phone|pod)/.test(ua) || /android(.+)?mobile/.test(ua),
		// タブレット型端末
		isTablet: /ipad/.test(ua) || /android/.test(ua) && !/mobile/.test(ua)
	};

	/**
  * ロールオーバー
  *
  * @date 2012-10-01
  *
  * @example $('.rollover').rollover();
  * @example $('.rollover').rollover({ over: '-ov' });
  * @example $('.rollover').rollover({ current: '_cr', currentOver: '_cr_ov' });
  * @example $('.rollover').rollover({ down: '_click' });
  */
  $.fn.rollover = function (options) {
  	var defaults = {
  		over: '_ov',
  		current: null,
  		currentOver: null,
  		down: null
  	};
  	var settings = $.extend({}, defaults, options);
  	var over = settings.over;
  	var current = settings.current;
  	var currentOver = settings.currentOver;
  	var down = settings.down;
  	return this.each(function () {
  		var src = this.src;
  		var ext = /\.(gif|jpe?g|png)(\?.*)?/.exec(src)[0];
  		var isCurrent = current && new RegExp(current + ext).test(src);
  		if (isCurrent && !currentOver) return;
  		var search = isCurrent && currentOver ? current + ext : ext;
  		var replace = isCurrent && currentOver ? currentOver + ext : over + ext;
  		var overSrc = src.replace(search, replace);
  		new Image().src = overSrc;
  		$(this).mouseout(function () {
  			this.src = src;
  		}).mouseover(function () {
  			this.src = overSrc;
  		});

  		if (down) {
  			var downSrc = src.replace(search, down + ext);
  			new Image().src = downSrc;
  			$(this).mousedown(function () {
  				this.src = downSrc;
  			});
  		}
  	});
  };

	/**
  * フェードロールオーバー
  *
  * @date 2012-11-21
  *
  * @example $('.faderollover').fadeRollover();
  * @example $('.faderollover').fadeRollover({ over: '-ov' });
  * @example $('.faderollover').fadeRollover({ current: '_cr', currentOver: '_cr_ov' });
  */
  $.fn.fadeRollover = function (options) {
  	var defaults = {
  		over: '_ov',
  		current: null,
  		currentOver: null
  	};
  	var settings = $.extend({}, defaults, options);
  	var over = settings.over;
  	var current = settings.current;
  	var currentOver = settings.currentOver;
  	return this.each(function () {
  		var src = this.src;
  		var ext = /\.(gif|jpe?g|png)(\?.*)?/.exec(src)[0];
  		var isCurrent = current && new RegExp(current + ext).test(src);
  		if (isCurrent && !currentOver) return;
  		var search = isCurrent && currentOver ? current + ext : ext;
  		var replace = isCurrent && currentOver ? currentOver + ext : over + ext;
  		var overSrc = src.replace(search, replace);
  		new Image().src = overSrc;

  		$(this).parent().css('display', 'block').css('width', $(this).attr('width')).css('height', $(this).attr('height')).css('background', 'url("' + overSrc + '") no-repeat');

  		$(this).parent().hover(function () {
  			$(this).find('img').stop().animate({ opacity: 0 }, 200);
  		}, function () {
  			$(this).find('img').stop().animate({ opacity: 1 }, 200);
  		});
  	});
  };

	/**
  * スムーズスクロール
  *
  * @date 2016-12-07
  *
  * @example $.scroller();
  * @example $.scroller({ cancelByMousewheel: true });
  * @example $.scroller({ scopeSelector: '#container', noScrollSelector: '.no-scroll' });
  * @example $.scroller('#content');
  * @example $.scroller('#content', { marginTop: 200, callback: function() { console.log('callback')} });
  */
  $.scroller = function () {
  	var self = $.scroller.prototype;
  	if (!arguments[0] || _typeof(arguments[0]) === 'object') {
  		self.init.apply(self, arguments);
  	} else {
  		self.scroll.apply(self, arguments);
  	}
  };

  $.scroller.prototype = {
		// 初期設定
		defaults: {
			callback: function callback() {},
			cancelByMousewheel: false,
			duration: 500,
			easing: 'swing',
			hashMarkEnabled: false,
			marginTop: 0,
			noScrollSelector: '.noscroll',
			scopeSelector: 'body'
		},

		// 初期化
		init: function init(options) {
			var self = this;
			var settings = this.settings = $.extend({}, this.defaults, options);
			$(settings.scopeSelector).find('a[href^="#"]').not(settings.noScrollSelector).each(function () {
				var hash = this.hash || '#';
				var eventName = 'click.scroller';
				$(this).off(eventName).on(eventName, function (e) {
					e.preventDefault();
					this.blur();
					self.scroll(hash, settings);
				});
			});
		},

		// スクロールを実行
		scroll: function scroll(id, options) {
			var settings = options ? $.extend({}, this.defaults, options) : this.settings ? this.settings : this.defaults;
			if (!settings.hashMarkEnabled && id === '#') return;

			var dfd = $.Deferred();
			var win = window;
			var doc = document;
			var $doc = $(doc);
			var $page = $('html, body');
			var scrollEnd = id === '#' ? 0 : $(id + ', a[name="' + id.substr(1) + '"]').eq(0).offset().top - settings.marginTop;
			var windowHeight = $.ua.isAndroidMobile ? Math.ceil(win.innerWidth / win.outerWidth * win.outerHeight) : win.innerHeight || doc.documentElement.clientHeight;
			var scrollableEnd = $doc.height() - windowHeight;
			if (scrollableEnd < 0) scrollableEnd = 0;
			if (scrollEnd > scrollableEnd) scrollEnd = scrollableEnd;
			if (scrollEnd < 0) scrollEnd = 0;
			scrollEnd = Math.floor(scrollEnd);

			$page.stop().animate({ scrollTop: scrollEnd }, {
				duration: settings.duration,
				easing: settings.easing,
				complete: function complete() {
					dfd.resolve();
				}
			});

			dfd.done(function () {
				settings.callback();
				$doc.off('.scrollerMousewheel');
			});

			if (settings.cancelByMousewheel) {
				var mousewheelEvent = 'onwheel' in document ? 'wheel.scrollerMousewheel' : 'mousewheel.scrollerMousewheel';
				$doc.one(mousewheelEvent, function () {
					dfd.reject();
					$page.stop();
				});
			}
		}
	};

	/**
  * 文字列からオブジェクトに変換したクエリを取得
  *
  * @example $.getQuery();
  * @example $.getQuery('a=foo&b=bar&c=foobar');
  */
  $.getQuery = function (str) {
  	if (!str) str = location.search;
  	str = str.replace(/^.*?\?/, '');
  	var query = {};
  	var temp = str.split(/&/);
  	for (var i = 0, l = temp.length; i < l; i++) {
  		var param = temp[i].split(/=/);
  		query[param[0]] = decodeURIComponent(param[1]);
  	}
  	return query;
  };

	/**
  * 画像をプリロード
  *
  * @date 2012-09-12
  *
  * @example $.preLoadImages('/img/01.jpg');
  */
  var cache = [];
  $.preLoadImages = function () {
  	var args_len = arguments.length;
  	for (var i = args_len; i--;) {
  		var cacheImage = document.createElement('img');
  		cacheImage.src = arguments[i];
  		cache.push(cacheImage);
  	}
  };
})(jQuery);


var earth_school = function ($) {
	// 初期化
	var _init = function _init() {
		$(function () {
			if (!$.ua.isTouchDevice) {
				$('.rollover').rollover();
			}
			$.scroller();
		});
	};

	var headerUI = function() {
		var $body = $('body');
		var $hdr = $('#header');
		var $btn = $('#header__btn');

		var init = function() {
			bind();
		};

		var bind = function() {
			$btn.on('click', function(event) {
				event.preventDefault();
				navUI.toggle();
			});
		};

		var navUI = {
			isOpen: false,
			toggle: function() {
				if (this.isOpen) {
					this.close();
				} else {
					this.open();
				}
			},
			open: function() {
				this.isOpen = true;
				$body.addClass('is-open');
			},
			close: function() {
				this.isOpen = false;
				$body.removeClass('is-open');
			}
		};

		return {
			init: init,
			navUI: navUI
		};
	}();

	return {
		init: function init() {
			window.console = window.console || {
				log: function log() {}
			};
			_init();
			headerUI.init();
		}
	};
}(jQuery);

$(earth_school.init);
