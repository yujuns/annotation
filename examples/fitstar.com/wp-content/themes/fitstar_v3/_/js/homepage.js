/*
 * Let's detect major resizes (desktop<->mobile) and reload the homepage.  
 * 
 */
var tabletDeviceOnload = (tabletDevice || smallScreen);
jQuery(window).ready(function($) {
	//console.log('load', tabletDeviceOnload);
	$(window).on('fitstar.redraw', function() {
		testEnv();
		//console.log('redraw', tabletDevice);
		if ( (tabletDevice || smallScreen) != tabletDeviceOnload) {
			location.reload();
			window.location = window.location;
		}		
	});	
});

jQuery(window).ready(function($) {

	// ==========================================================================
	// TRIPLE THREAT (SLIDING PANELS)
	// ==========================================================================
	var $sliding_panels = $("#sliding-panels .columns");
	$sliding_panels.each(function(i, panel) {
		$(panel).on('mouseenter touchend',
			function () {
				$sliding_panels.removeClass("static");
				$sliding_panels.removeClass("active");
				$sliding_panels.removeClass("inactive");
				
				$(this).addClass("active");
				$sliding_panels.not(this).addClass("inactive");
			}
		);
		$(panel).on('mouseleave',
			function () {
				$(panel).removeClass("active");
				$sliding_panels.addClass("static");
				$sliding_panels.not(this).removeClass("inactive");
			}
		);
		$(panel).find('.close-slide').click(function(e) {
			e.preventDefault();
				$(panel).removeClass("active");
				$(panel).addClass("static");
				$sliding_panels.not(this).addClass("static");
				$sliding_panels.not(this).removeClass("inactive");
		});
		
	});
	


	// ==========================================================================
	// INTRO TABS
	// ==========================================================================
	var $tabs = $(".tabs.overview li");
	var active = 0;
	$tabs.each(function(i, tab) {

		var $tab = $(tab);
		$tab.click(function(e) {
			e.preventDefault();
			
			$tabs.removeClass('active above below');
			
			// previous tab open?
			if (i == (active + 1)) {
				$tabs.eq(active).addClass('above');
				
			// next tab open?
			} else if (i == (active - 1)) {
				$tabs.eq(active).addClass('below');
			}
			
			$(this).addClass('active');
			
	        $(".tab_content").hide();
	        var selected_tab = $(this).find("a").attr("href");
	        $(selected_tab).fadeIn(750);
			active = i;
	    });  
    });
});


// ==========================================================================
// ANIMATE THE HEADER
// ==========================================================================
jQuery(window).ready(function($) {
	
	var $header = $('header.global');

	// skip this whole block on smaller screens
	if (smallScreen || tabletDevice) {
		$header.removeClass('unfixed style-home');
		return;
	}
	
	var transitions = false;
	
	$header.find('nav ul li').removeClass('current-menu-item');
	
	function init_transitions() {
		
		transitions = {};
		
		var $l12 =  $header.find('.large-12');
		var $h1 = $header.find('.large-12 h1');
		var l12_offset_left_start = $l12.offset().left - $header.offset().left;
		var h1_offset_left_start = $h1.offset().left - $l12.offset().left;
		
		$l12.css({
			'float': '',
			'margin-left': ''
		});
		
		$header.removeClass('unfixed');
		
		var l12_offset_left_end = $l12.offset().left - $header.offset().left;
		var h1_offset_left_end = $h1.offset().left - $l12.offset().left;
		
		$header.addClass('unfixed');
		
		//console.log(l12_offset_left_start, l12_offset_left_end);
		//console.log(h1_offset_left_start, h1_offset_left_end);
		
		var l12_margin_left_start = l12_offset_left_start - l12_offset_left_end;
		$l12.css({
			'float': 'none',
			'margin-left': l12_margin_left_start
		});
		
		transitions.l12 = {
			$elem: $l12,
			props: [
				{
					'name': 'margin-left',
					'start': l12_margin_left_start,
					'end': 0
				}
			]
		};
		
		transitions.h1 = {
			$elem: $h1,
			props: [
				{
					'name': 'left',
					'start': h1_offset_left_start,
					'end': h1_offset_left_end
				}
			]
		};

		transitions.icon_fitstar = {
			$elem: $header.find('.icon-fitstar'),
			props: [
				{
					name: 'opacity',
					start: 0,
					end: 1
				}
			]
		};	
		
	}	
	
	// wait a second before calculataing the transitions
	setTimeout(function() {
		init_transitions();
		heroHeight = $(window).height() - $header.height();
	}, 1000);
		
	$(window).on('fitstar.scroll', function(){
		
		if (!transitions) {
			return;			
		}
		
		if (fitstar.scrollTop <= heroHeight) {
			
			if (!$header.hasClass('style-home')) {
				
				var props;
				
				$.each(transitions.l12.props, function(i, prop) {
					transitions.l12.$elem.css(prop.name, prop.start);			
				});
				
				$.each(transitions.h1.props, function(i, prop) {
					transitions.h1.$elem.css(prop.name, prop.start);
				});

				$.each(transitions.icon_fitstar.props, function(i, prop) {
					transitions.icon_fitstar.$elem.css(prop.name, prop.start);					
				});
				
				$header.addClass('style-home');
				$header.addClass('unfixed');
			}
			
			$header.css({
				position: 'absolute',
				top: -80
			});
		}
		if (fitstar.scrollTop > heroHeight) {
			
			if ($header.hasClass('style-home')) {
				$header.removeClass('style-home');
				
				var props;
				
				props = {};				
				$.each(transitions.l12.props, function(i, prop) {
					transitions.l12.$elem.css(prop.name, prop.start);
					props[prop.name] =  prop.end;					
				});
				transitions.l12.$elem.animate(props, 300);
				
				props = {};
				$.each(transitions.h1.props, function(i, prop) {
					transitions.h1.$elem.css(prop.name, prop.start);
					props[prop.name] =  prop.end;					
				});
				transitions.h1.$elem.animate(props, 300, function() {
					var props = {};
					$.each(transitions.icon_fitstar.props, function(i, prop) {
						transitions.icon_fitstar.$elem.css(prop.name, prop.start);
						props[prop.name] =  prop.end;					
					});
				
					transitions.icon_fitstar.$elem.animate(props, 300, function() {
						$header.removeClass('unfixed');
						
					});
				});
			}			
			$header.css({
				position: 'fixed',
				top: 0
			});
		}
	});
	$(window).trigger('scroll');
});


// ==========================================================================
// COMMUNITY SECTION
// ==========================================================================
jQuery(window).ready(function($) {
	
	// skip this whole block on smaller screens
	if (smallScreen || tabletDevice) {
		return;
	} 
	
	var $cmty = $("#community-slider");	
	var $bg = $cmty.find('.background-image');
	var $fixed_panel = $cmty.find('.fixed-panel');
	var $slides = $cmty.find(".slide");
	var header_offset, cmty_top, cmty_height, cmty_bottom, panel_height;
	
	function init() {
		
		header_offset = $('header.global').outerHeight();
		panel_height = $(window).height() - header_offset;
		
		cmty_height = $cmty.outerHeight();
		
		$fixed_panel.parent().css('height', cmty_height);
		
		cmty_top = $($cmty).offset().top - header_offset;
				
		cmty_bottom = (cmty_top + cmty_height) - panel_height;
		
		$.each([$bg, $fixed_panel], function(i, panel) {
			$(panel).css({
				'position': '',
				'top': '',
				'left': '',
				'height': '',
				'width': ''
			});
			
			$(panel).data('panel-width',$(panel).innerWidth());
			$(panel).data('panel-left', $(panel).offset().left);
			
			$(panel).css({
				'position': 'absolute',
				'top': '0',
				'left': 0,
				'height': panel_height,
				'width': $(panel).data('panel-width')
			});
		});
		
		$fixed_panel.data('panel-left', $fixed_panel.data('panel-left') - 15); // left-padding of container
	}
	
	$(window).on('fitstar.redraw', function() {
		init();
		scroll();
	}); 
	init();
	
	function scroll() {
		var scrollTop = fitstar.scrollTop;

		if (scrollTop < cmty_top) {
			$bg.css({
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'bottom': 'auto',
			});
			$fixed_panel.css({
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'bottom': 'auto',
			});
		}
		
		if (scrollTop >= cmty_top && scrollTop < cmty_bottom ) {
			$bg.css({
				'position': 'fixed',
				'top': header_offset,
				'bottom': 'auto',
				'left': $bg.data('panel-left')
			});
			$fixed_panel.css({
				'position': 'fixed',
				'top': header_offset,
				'bottom': 'auto',
				'left': $fixed_panel.data('panel-left')
			});	
		}
		
		if (scrollTop >= cmty_bottom) {
			$bg.css({
				'position': 'absolute',
				'top': 'auto',
				'bottom': 0,
				'left': 0
			});
			$fixed_panel.css({
				'position': 'absolute',
				'top': 'auto',
				'bottom': 0,
				'left': 0
			});
		}
	}
	
	$(window).on('fitstar.scroll',function(){
		scroll();
	});
	scroll();
});