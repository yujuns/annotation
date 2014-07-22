jQuery(window).ready(function($) {


	// ==========================================================================
	// SMOOTH SCROLL
	// ==========================================================================
	$('#hero a').click(function(e) {
		e.preventDefault();
		var header_height = $('header.global').height();
		var target_href = $(this).attr("href");
		var target = target_href.substr(target_href.indexOf("#"));
		$('html, body').animate({
			scrollTop: $(target).offset().top - header_height
		}, 500);
	});


	// ==========================================================================
	// TABS
	// ==========================================================================
	$(".tabs.pricing li").click(function() {
        $(".tabs.pricing li").removeClass('active');
        $(this).addClass("active");
        $(".tab_content.price").hide();
        var selected_tab = $(this).find("a").attr("href");
        $(selected_tab).fadeIn();
        return false;
    });

	var $premium_tabs = $(".tabs.premium li");
	var premium_active = 0;
	$premium_tabs.each(function(i, tab) {

		var $tab = $(tab);
		$tab.click(function(e) {
			e.preventDefault();
			
			$premium_tabs.removeClass('active above below');
			
			// previous tab open?
			if (i == (premium_active + 1)) {
				$premium_tabs.eq(premium_active).addClass('above');
				
			// next tab open?
			} else if (i == (premium_active - 1)) {
				$premium_tabs.eq(premium_active).addClass('below');
			}
			
			$(this).addClass('active');
			
			
	        $(".tab_content.premium_feature").hide();
	        var selected_tab = $(this).find("a").attr("href");
	        $(selected_tab).fadeIn();
			premium_active = i;
	    });  
    });
	
	
	var $basic_tabs = $(".tabs.basic li");
	var basic_active = 0;
	$basic_tabs.each(function(i, tab) {

		var $tab = $(tab);
		$tab.click(function(e) {
			e.preventDefault();
			
			$basic_tabs.removeClass('active above below');
			
			// previous tab open?
			if (i == (basic_active + 1)) {
				$basic_tabs.eq(basic_active).addClass('above');
				
			// next tab open?
			} else if (i == (basic_active - 1)) {
				$basic_tabs.eq(basic_active).addClass('below');
			}
			
			$(this).addClass('active');
			
			
	        $(".tab_content.basic_feature").hide();
	        var selected_tab = $(this).find("a").attr("href");
	        $(selected_tab).fadeIn();
			basic_active = i;
	    });  
    });




	// ==========================================================================
	// FAQ
	// ==========================================================================
	$('.accordionButton').click(function() {
		$('.accordionButton').removeClass('on');
		$('.accordionContent').slideUp('normal');
		
		if($(this).next().is(':hidden') == true) {
			$(this).addClass('on');
			$(this).next().slideDown('normal');
		}	
	}); 
	$('.accordionContent').hide();	
	
	
	// TOUR
	if (touchDevice) {
		$('#tour-dropdown li').click(function(e) {
			$(this).toggleClass('hover-state');
			
		});
		
	} else {
		$('#tour-dropdown li').hover(
			function() { $(this).addClass('hover-state'); },
			function() { $(this).removeClass('hover-state'); }
		);
	}
	
	
	
		
	
});