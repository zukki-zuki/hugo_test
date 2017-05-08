/* global jQuery */

/** earth_campaign School **/

(function ($) {
	var earth_campaign = window.earth_campaign || {};

	earth_campaign.School = function () {

		var $window = $(window);
		var $document = $(document);

		var _init = function(){
			animation.init();
			pagetopUI.init();
			_colorbox.init();
		};

		var animation = {
			init: function() {
				this.visual();
				this.detail01();
				this.detail02();
				this.detail03();
				this.detail04();
				this.detail05();
				this.memories();
				this.link();
			},
			visual: function() {
				var $target = $('#visual');
				var timeline = new TimelineLite({paused: true, delay: 0.5});
				var waypoint;

				waypoint = $target.waypoint({
					handler: function(direction) {
						timeline.play();
						this.destroy();
					},
					offset: '75%'
				});

				timeline
				.fromTo($('#header').find('.logo'), 0.4, {alpha: 0, y: 20}, {alpha: 1, y: 0, ease: Cubic.easeOut})
				.fromTo($target.find('.visual_subheading'), 0.4, {scale: 0}, {alpha: 1,scale: 1, transformOrigin: '50% 150%', ease: Back.easeOut.config(1.4)}, '=0.1')
				.fromTo($target.find('.visual_heading'), 0.4, {scale: 0}, {alpha: 1,scale: 1, ease: Back.easeOut.config(1.4)}, '-=0.4')
				.fromTo($target.find('.visual_txt'), 0.7, {alpha: 0, y: 15}, {alpha: 1, y: 0, ease: Cubic.easeOut}, '-=0.1')
				// .fromTo($target.find('.visual_illust05'), 0.5, {alpha: 0, y: 100}, {alpha: 1, y: 0, ease: Back.easeOut.config(1.2)}, '-=0.1')
				.fromTo($target.find('.visual_illust01'), 0.3, {alpha: 0, x: -100}, {alpha: 1, x: 0, ease: Back.easeOut.config(1.2)}, '-=0.2')
				.fromTo($target.find('.visual_illust02'), 0.4, {alpha: 0, x: 100, y: -30}, {alpha: 1, x: 0, y: 0, ease: Back.easeOut.config(1.2)}, '-=0.3')
				.fromTo($target.find('.visual_illust03'), 0.3, {scale: 0}, {alpha: 1,scale: 1, transformOrigin: '50% 100%', ease: Back.easeOut.config(1.2)}, '-=0.4')
				.fromTo($target.find('.visual_illust04'), 0.3, {alpha: 0, x: 20, y: -20}, {alpha: 1, x: 0, y: 0, ease: Back.easeOut.config(1.2)}, '-=0.3')
				;
			},

			detail01: function() {
				var $target = $('#detail01');
				var timeline = new TimelineLite({paused: true, delay: 0.2});
				var waypoint;

				waypoint = $target.waypoint({
					handler: function(direction) {
						timeline.play();
						this.destroy();
					},
					offset: '74%'
				});

				timeline
				.fromTo($target.find('.detail01_img img'), 0.5, {scale: 0}, {alpha: 1,scale: 1, transformOrigin: '50% 100%', ease: Back.easeOut.config(1.2)})
				.fromTo($target.find('.detail01_txt'), 0.4, {alpha: 0, y: 100}, {alpha: 1, y: 0, ease: Circ.easeOut})
				.fromTo($target.find('.detail01_illust01'), 0.5, {scale: 0}, {alpha: 1,scale: 1, transformOrigin: '50% 100%', ease: Back.easeOut.config(1.2)}, '-=0.3')
				.fromTo($target.find('.detail01_flag'), 0.2, {alpha: 0, x: -200}, {alpha: 1, x: 0, ease: Circ.easeOut}, '-=0.5')
				;
			},

			detail02: function() {
				var $target = $('#detail02');
				var timeline = new TimelineLite({paused: true, delay: 0.2});
				var waypoint;

				waypoint = $target.waypoint({
					handler: function(direction) {
						timeline.play();
						this.destroy();
					},
					offset: '74%'
				});

				timeline
				.fromTo($target.find('.detail02_img img'), 0.5, {scale: 0}, {scale: 1, transformOrigin: '50% 100%', ease: Back.easeOut.config(1.2)})
				.fromTo($target.find('.detail02_txt'), 0.4, {alpha: 0, y: 100}, {alpha: 1, y: 0, ease: Circ.easeOut})
				.fromTo($target.find('.detail02_illust01'), 0.5, {scale: 0}, {scale: 1, transformOrigin: '50% 100%', ease: Back.easeOut.config(1.2)}, '-=0.3')
				.fromTo($target.find('.detail02_illust02'), 0.5, {alpha: 0, x: 20, y: -20}, {alpha: 1, x: 0, y: 0, ease: Back.easeOut.config(1.2)}, '-=0.3')
				.fromTo($target.find('.detail02_flag'), 0.2, {alpha: 0, x: 200}, {alpha: 1, x: 0, ease: Circ.easeOut}, '-=0.5')
				;
			},

			detail03: function() {
				var $target = $('#detail03');
				var timeline = new TimelineLite({paused: true, delay: 0.2});
				var waypoint;

				waypoint = $target.waypoint({
					handler: function(direction) {
						timeline.play();
						this.destroy();
					},
					offset: '74%'
				});

				timeline
				.fromTo($target.find('.detail03_img img'), 0.5, {scale: 0}, {scale: 1, transformOrigin: '50% 100%', ease: Back.easeOut.config(1.2)})
				.fromTo($target.find('.detail03_txt'), 0.4, {alpha: 0, y: 100}, {alpha: 1, y: 0, ease: Circ.easeOut})
				.fromTo($target.find('.detail03_illust01'), 0.5, {scale: 0}, {scale: 1, transformOrigin: '50% 100%', ease: Back.easeOut.config(1.2)}, '-=0.3')
				.fromTo($target.find('.detail03_flag'), 0.2, {alpha: 0, x: -200}, {alpha: 1, x: 0, ease: Circ.easeOut}, '-=0.5')
				;
			},

			detail04: function() {
				var $target = $('#detail04');
				var timeline = new TimelineLite({paused: true, delay: 0.2});
				var waypoint;

				waypoint = $target.waypoint({
					handler: function(direction) {
						timeline.play();
						this.destroy();
					},
					offset: '74%'
				});

				timeline
				.fromTo($target.find('.detail04_img img'), 0.5, {scale: 0}, {scale: 1, transformOrigin: '50% 100%', ease: Back.easeOut.config(1.2)})
				.fromTo($target.find('.detail04_txt'), 0.4, {alpha: 0, y: 100}, {alpha: 1, y: 0, ease: Circ.easeOut})
				.fromTo($target.find('.detail04_illust01'), 0.5, {scale: 0}, {scale: 1, transformOrigin: '50% 100%', ease: Back.easeOut.config(1.2)}, '-=0.3')
				.fromTo($target.find('.detail04_flag'), 0.2, {alpha: 0, x: 200}, {alpha: 1, x: 0, ease: Circ.easeOut}, '-=0.5')
				;
			},

			detail05: function() {
				var $target = $('#detail05');
				var timeline = new TimelineLite({paused: true, delay: 0.2});
				var waypoint;

				waypoint = $target.waypoint({
					handler: function(direction) {
						timeline.play();
						this.destroy();
					},
					offset: '74%'
				});

				timeline
				.fromTo($target.find('.detail05_img img'), 0.5, {scale: 0}, {scale: 1, transformOrigin: '50% 100%', ease: Back.easeOut.config(1.2)})
				.fromTo($target.find('.detail05_txt'), 0.4, {alpha: 0, y: 100}, {alpha: 1, y: 0, ease: Circ.easeOut})
				.fromTo($target.find('.detail05_illust01'), 0.5, {scale: 0}, {scale: 1, transformOrigin: '50% 100%', ease: Back.easeOut.config(1.2)}, '-=0.3')
				.fromTo($target.find('.detail05_flag'), 0.2, {alpha: 0, x: -200}, {alpha: 1, x: 0, ease: Circ.easeOut}, '-=0.5')
				;
			},

			memories: function() {
				var $target = $('#memories');
				var timeline = new TimelineLite({paused: true, delay: 0.2});
				var waypoint;

				waypoint = $target.waypoint({
					handler: function(direction) {
						timeline.play();
						this.destroy();
					},
					offset: '88%'
				});

				timeline
				.fromTo($target.find('.memories_heading'), 0.4, {alpha: 0, y: 20}, {alpha: 1, y: 0, ease: Back.easeOut.config(1.2)})
				;
			},

			link: function() {
				var $target = $('#link');
				var timeline = new TimelineLite({paused: true, delay: 0});
				var waypoint;

				waypoint = $target.waypoint({
					handler: function(direction) {
						timeline.play();
						this.destroy();
					},
					offset: '85%'
				});

				timeline
				.fromTo($target.find('img'), 0.4, {alpha: 0, y: 100}, {alpha: 1, y: 0, ease: Back.easeOut.config(1.2)})
				;
			},
		};

		var pagetopUI = {
			$pagetop: $('#pagetop'),
			$target: $('#detail01'),
			duration: 0.4,
			easing: 'Cubic.easeOut',
			yffset: 20,
			eventOffset: '75%',

			init: function() {
				var self = this;

				TweenMax.set(self.$pagetop, {autoAlpha: 0, y: self.yffset});

				this.toggleVisible();
			},

			toggleVisible: function() {
				var self = this;
				var waypoint;

				waypoint = self.$target.waypoint({
					handler: function(direction) {
						if (direction === 'down') {
							TweenMax.to(self.$pagetop, self.duration, {autoAlpha: 1, y: 0, ease: self.easing});
						} else if (direction === 'up') {
							TweenMax.to(self.$pagetop, self.duration, {autoAlpha: 0, y: self.yffset, ease: self.easing});
						}
					},
					offset: self.eventOffset
				});
			}
		};

		var _colorbox = {
			init: function init(){

				var setElm = $('.gallery'),
				slideSpeed = 1000;
				var selfWrap;

				setElm.each(function(){
					var self = $(this),
					selfWidth = self.innerWidth(),
					findUl = self.find('ul'),
					findLi = findUl.find('li'),
					listWidth = findLi.outerWidth(),
					listCount = findUl.length,
					loopWidth = 945 * 3;

					if(loopWidth > selfWidth){
						var frag = 1;
						function loopMove(){
							TweenMax.to('.loopSliderWrap', 20, { left : '-' + (945*frag) + 'px', ease:'linear', onComplete: function(){
								if(frag == 1){
									TweenMax.set('.gallery_list-01',  { left : loopWidth + 'px' });
									frag++;
								} else if (frag == 2){
									TweenMax.set('.gallery_list-02',  { left : loopWidth + 945 + 'px' });
									frag++;
								} else{
									$('.loopSliderWrap').css({left: 0});
									$('.gallery_list-01').css({left: 0});
									$('.gallery_list-02').css({left: 945});
									$('.gallery_list-03').css({left: 1890});
									frag = 1;
								}
								loopMove();
							}});
						}
					}
					loopMove();

					$('.gallery_list').magnificPopup({
					  delegate: 'a',
					  type: 'image',
					  gallery: { //ギャラリー表示にする
					    enabled:true
					  }
					  });

				});
			}
		};

		return {
			init: _init
		};
	}().init();
})(jQuery);
