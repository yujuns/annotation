var smallScreen, tabletDevice;
var touchDevice = Modernizr.touch;
var ie_lte8 = window.attachEvent && !window.addEventListener;
var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );

function testEnv() {
	smallScreen = Modernizr.mq('all and (max-width: 767px)') 
	tabletDevice  =  Modernizr.mq('only screen and (min-width : 768px) and (max-width : 1024px)'); 
}
testEnv();

var fitstar = { 
	scrollTop: 0
};

/*
 * Trigger a "redraw" function when the page changes size/orientation 
 */

jQuery(window).on('resize orientationchange', function() {
	jQuery(window).trigger('fitstar.redraw');	
	
});

/*
 * Trigger a "custom scroll" function to wrap our scroll events
 */
jQuery(window).on('scroll', function() {
	fitstar.scrollTop = $(window).scrollTop();
	jQuery(window).trigger('fitstar.scroll');	
});

// also scroll on touch on iOS
if (iOS) {  
	$(window).get(0).addEventListener("touchmove", function(e) {
		fitstar.scrollTop = $(window).scrollTop();
		jQuery(window).trigger('fitstar.scroll');
	});		
} 


// run again once all loaded up
jQuery(window).on('load',function() {
	jQuery(window).trigger('fitstar.redraw');
});


/*
 * Helper Function
 * Get animation frame
 */	
function getFrame(current, start, stop, from, to, easing) {
	if (current <= start) return from;
	if (current >= stop) return to;	
	
	if (easing != null) {
		return jQuery.easing[easing](
			null,
			current - start,
			from,
			to - from,
			stop - start				
		);
		
	} else {
		var factor = (current - start) / (stop - start);
		return factor*(to - from) + from;		
	}
}

/*
 * Polyfills
 */
jQuery(document).ready(function($) {


	// // IE8 Grid Fix
	// if (ie_lte8) {
	// 	$('.large-12').addClass('twelve');
	// 	$('.large-11').addClass('eleven');
	// 	$('.large-10').addClass('ten');
	// 	$('.large-9').addClass('nine');
	// 	$('.large-8').addClass('eight');
	// 	$('.large-7').addClass('seven');
	// 	$('.large-6').addClass('six');
	// 	$('.large-5').addClass('five');
	// 	$('.large-4').addClass('four');
	// 	$('.large-3').addClass('three');
	// 	$('.large-2').addClass('two');
	// 	$('.large-1').addClass('one');
		
	// 	$('.push-12').addClass('push-twelve');
	// 	$('.push-11').addClass('push-eleven');
	// 	$('.push-10').addClass('push-ten');
	// 	$('.push-9').addClass('push-nine');
	// 	$('.push-8').addClass('push-eight');
	// 	$('.push-7').addClass('push-seven');
	// 	$('.push-6').addClass('push-six');
	// 	$('.push-5').addClass('push-five');
	// 	$('.push-4').addClass('push-four');
	// 	$('.push-3').addClass('push-three');
	// 	$('.push-2').addClass('push-two');
	// 	$('.push-1').addClass('push-one');
		
	// 	$('.pull-12').addClass('pull-twelve');
	// 	$('.pull-11').addClass('pull-eleven');
	// 	$('.pull-10').addClass('pull-ten');
	// 	$('.pull-9').addClass('pull-nine');
	// 	$('.pull-8').addClass('pull-eight');
	// 	$('.pull-7').addClass('pull-seven');
	// 	$('.pull-6').addClass('pull-six');
	// 	$('.pull-5').addClass('pull-five');
	// 	$('.pull-4').addClass('pull-four');
	// 	$('.pull-3').addClass('pull-three');
	// 	$('.pull-2').addClass('pull-two');
	// 	$('.pull-1').addClass('pull-one');
	// }
});
	
/*
 * Hero scroll effects
 * 
 */
jQuery(document).ready(function($) {
	
	// skip this whole block on smaller screens
	if (smallScreen || tabletDevice) {
		return;
	}
	
		
	var $hero = $('#hero');

	if ($hero.length && !$hero.hasClass('static') && !$('body').hasClass('page-template-page-homepage-php')) {
		
		var heroHeight = 600;
		var heroTopStart = 80;
		var heroTopEnd =  heroTopStart - 300;
		var $heroChildren = $hero.children();
			
		$(window).on('fitstar.scroll', function(){
			var scrollTop = fitstar.scrollTop;
			
			if (scrollTop < heroHeight) {
				$hero.css('display', 'block');
				
				$hero.css('top', getFrame(scrollTop, 0, heroHeight, heroTopStart, heroTopEnd));
				$heroChildren.css('opacity', getFrame(scrollTop, 0, heroHeight, 1, 0));
								
			}
			
			if (scrollTop >= heroHeight) {
				$hero.css('display', 'none');
			}
		});
	}

	if ($('body').hasClass('page-template-page-homepage-php')) {
		$(window).on('fitstar.scroll', function(){
			var scrollTop = fitstar.scrollTop;
			var height = $(window).height();
			
			if (scrollTop < height) {
				$hero.css('display', 'block');
				$('#location').css('display', 'none');
			}
			
			if (scrollTop >= height) {
				$hero.css('display', 'none');
				$('#location').css('display', 'block');
			}
		});
		
		
	}
	
});


/* 
 * Mobile menu
 */


jQuery(document).ready(function($) {
	
	var menuDrawer = {
		options: {
			menu: $('#menu'),
			pageContent: $('.master-wrapper'),
			menuBtn: $('#menu-btn')
		},
	
		init: function(options) {
	
			//allow custom options on init
			if (options && typeof(options) == 'object') {
				$.extend(menuDrawer.options, options);
			}
	
			menuDrawer.$menu = menuDrawer.options.menu;
			menuDrawer.$page = menuDrawer.options.pageContent;
			menuDrawer.$width = menuDrawer.$menu.innerWidth();
			menuDrawer.$btn = menuDrawer.options.menuBtn.click(function(e){
				e.preventDefault();
				if (menuDrawer.$page.data('state') === "open") {
					menuDrawer.hideMenu();
				} else {
					menuDrawer.revealMenu();
				}
			});
			/* close the drawer if any links inside the menu are clicked, 
			* needed for in-page anchors and close button */
			menuDrawer.$links = menuDrawer.$menu.find('a.close-btn').click(function(e){
				e.preventDefault();
				menuDrawer.hideMenu();
			});
		},
		revealMenu: function(){
			menuDrawer.$page.addClass('content');
			menuDrawer.$page.data('state', 'open').animate({
				left: -(menuDrawer.$width) + 'px'
			}, 300);
			$('#menu').fadeIn();
		},
		hideMenu: function(){
			menuDrawer.$page.data('state', 'closed').animate({
				left: 0
			}, 500);
			$('#menu').fadeOut();
		}
	};
	
	menuDrawer.init();

});


/*
 * Newsletter Signup
 */
jQuery(document).ready(function($) {
	
	// Newlsetter signup
	var $newsletter_signup = $('#newsletter-signup');
	if (!$newsletter_signup.length) return;
	
	
	// Load validator
	$.getScript(AppConfig.base_url + "/_/js/vendor/jquery-validate/jquery.validate.min.js", function(data, textStatus, jqxhr) {
		
		// validate input
		$newsletter_signup.validate({
			errorElement: 'em',
			errorClass: 'error',
			onkeyup: function(form) {
				$newsletter_signup.find('.form-error').hide();
			},
			submitHandler: function(form) {				
				// submit to mailchimp via jsonp
				var form_action = form.action.replace('/post?', '/post-json?').concat('&c=?');
				$(form).find('.form-error').removeClass('hidden').hide();
				
				$.ajax({
					url: form_action,
					method: 'get',
					dataType: "jsonp",
					data: $(form).serialize(),
					success: function(data) {
						if (data.result != "success") {
			              	$(form).find('.form-error').show().html(data.msg);
			            } else {				
							$(form).find('.newsletter-success').hide().removeClass('hidden').delay(350).fadeIn(300);			
			                $(form).children().not('.newsletter-success').fadeOut(300);
			            }									
					},
					error: function(jqXHR, textStatus, errorThrown) {
						// Something went wrong, do something to notify the user.
					}
				});							
			}
		});	
	});
	
});

/*
 * Videos
 * 
 */
jQuery(document).ready(function($) {
	
	var $header = $('header.global');
	var $close = $('.video-player  .icon-close');
	
	var $player = $('#inner-video-player');	
	
	var duration = 200;
	var hero_duration = 1000;
	
	var active_video;
	
	$('.inner-video').each(function(i, video) {		
	
		$(video).click(function(e) {
			e.preventDefault();
			if (active_video) {
				close();
			}
		
			play(video);
		});
		
	});
	
	$close.click(function(e) { e.preventDefault(); close(); });

	
	function play(video){
		
		
		
		active_video = video;
		
		var video_id = $(video).data('video-id');
		var video_src = 'http://player.vimeo.com/video/'+video_id+'?autoplay=1&title=0&badge=0&byline=0&portrait=0';
		
		var this_duration = duration;
		var $this_oembed = $('<iframe src="' + video_src + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
		var $this_player = $player;
		
		var hero_video = false;
		if (!(smallScreen || tabletDevice) && $(video).attr('id') == 'homepage-video-play') {
			hero_video = true;	
		}
		
		if (hero_video) {
			
			var this_duration = hero_duration;
			
			var $this_player = $('#homepage-video-player');
			
			var $logo = $('#large-logo');
			$logo.css('z-index', 3000);
			$logo.animate({'top':'40%'}, this_duration).animate({'opacity':0}, this_duration);
		
		} else {
			
			$header.addClass('video style-video');
		}
		
	
		$this_player.fadeIn(this_duration);
		$this_player.find('.player').append($this_oembed);

		
		setTimeout(function() {
			$this_oembed.show();
		}, this_duration + 500);
		
		
	}
	
	function close() {
		
		if (active_video) {
			video = active_video;
		} else {
			return;
		}
		
		
		
		var this_duration = duration;
		var $this_player = $player;
				
		var hero_video = false;
		if (!(smallScreen || tabletDevice) && $(video).attr('id') == 'homepage-video-play') {
			hero_video = true;		
		}
		
		if (hero_video) {
			
			var this_duration = hero_duration;
			
			var $this_player = $('#homepage-video-player');
			
			var $logo = $('#large-logo');
			
		
		} 				
		
		$this_oembed = $this_player.find('iframe');
		$this_oembed.attr('src', "about:blank");
		$this_oembed.remove();
		
		active_video = null;
		
		setTimeout(function() {
			
			if (hero_video) {
				$logo.animate({'opacity':1}, this_duration).animate({'top':'0'}, this_duration, function() {
					$logo.css('z-index', '');		
				});
				
				$this_player.delay(this_duration).fadeOut(this_duration, function(){
					
				});
			
			} else {
				$header.removeClass('style-video');
				
				$this_player.fadeOut(this_duration, function(){
					$header.removeClass('video');
					active_video = null;
				});
			
			}
			
			
			
		}, 500);
		
		
		
	}

});

/*
 * Header forms
 * 
 */
jQuery(document).ready(function($) {
	
	var $header = $('header.global');
	var $form = $('#inner-header-form');
	var $close = $form.find('.icon-close');
	
	// save the initial html for reload
	var gform_html = $form.html();
	
	// open the form
	$('.header-form-button').click(function(e) {
		e.preventDefault();
		$header.addClass('form style-form');
		$form.fadeIn(200);
	});

	// close the form
	$form.on("click", ".button-close, .icon-close", function(e) { 
		e.preventDefault();
		$header.removeClass('style-form');
		$form.fadeOut(200, function() {
			$header.removeClass('form');
			$form.html(gform_html);			
		});	
	});
});

/*
 * Select Wrapper
 * 
 */
jQuery(document).ready(function($) {

	if (!$("#fitstar-store .single-option-selector").parent().hasClass('select-field-wrapper')) {
		$( "#fitstar-store .single-option-selector" ).wrap( "<div class='select-field-wrapper'></div>" );
	}
});