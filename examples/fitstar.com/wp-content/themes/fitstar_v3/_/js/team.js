jQuery(window).ready(function($) {

	var $team  = $('#team-members');
	var $overlay = $('#team-overlay');
	var $slider_outer = $('#team-slider-inner');
	var $slider = $('#team-slider');
	var $team_members = $('#team-members .team-member');
	var $advisors = $('#advisors .advisor');
	var $bio_container = $('#bio');
	$bio_container.data('orig-html', $bio_container.html());
	
	var $slider_prev = $('#slider-controls .back');
	var $slider_next = $('#slider-controls .forward');
	
	$team_members.each(function(i, member) {
		var $member = $(member);
		var $info_window = $member.find('.info-window');
		$info_window.remove();
		
		$member.find('.open-info').click(function(e) {
			e.preventDefault();			
			$overlay.addClass('active').hide().append($info_window).fadeIn(200);
		
			$info_window.find(".tabs li").click(function(e) {
				e.preventDefault();		
				$info_window.find(".tabs li").removeClass('active');
		        $(this).addClass("active");
		        $info_window.find(".tab_content").hide();
		        var selected_tab = $(this).find("a").attr("href");
		        $(selected_tab).fadeIn();
		    });
			
			$info_window.find(".icon-close").click(function(e) {
				e.preventDefault();		
				$overlay.fadeOut(200).empty();
				$overlay.removeClass('active');
			});
		});
	});
	
	
	var bio_active = false;
	$advisors.each(function(i, advisor) {
		var $advisor = $(advisor);
		var $bio = $advisor.find('.bio').removeClass('hidden');
		$bio.remove();
		
		$advisor.click(function(e) {
			$advisors.removeClass('active inactive');
			if (bio_active === i) {			
						
				$bio_container.fadeOut(200, function() {
					$bio_container.empty().html($bio_container.data('orig-html')).fadeIn(200)
				})
				bio_active = false;
				
			} else {
				$advisors.not($advisor).addClass('inactive');
				
				$advisor.addClass('active');
				$bio_container.fadeOut(200, function() {
					$bio_container.empty().append($bio).fadeIn(200);
				});
				bio_active = i;
			}
			
		});
		
		
		
	});
	
	if (touchDevice) {
		 $('#team-slider-outer').css('overflow-x','scroll');
	}
	
	var scrollWidth, scrollLeft, scrollWidth, memberWidth,prevPos, nextPos;
	var memberPositions = [];
	function update_controls() {
		scrollWidth = $team.width();
		scrollLeft = $slider_outer.scrollLeft();
		sliderWidth = $slider.width();
		
		memberWidth = $team_members.eq(0).width();
		
		prevPos = 0;
		$team_members.each(function(i, member) {
		
			var left = $(member).position().left;
			memberPositions[i] = left;
 		
		});
		
		
		if (scrollWidth + scrollLeft > sliderWidth)	{
			nextPos = $team_members.count + 1;
		} else {
			nextPos = Math.floor((scrollLeft + scrollWidth)  / memberWidth);
		}
		
		
		if (scrollLeft - scrollWidth <= 0)	{
			prevPos = 0;
		} else {
			prevPos = Math.ceil((scrollLeft - scrollWidth) / (memberWidth+2));
			
		}
		
		
		//console.log(scrollWidth, scrollLeft, sliderWidth, scrollWidth + scrollLeft);
		if (scrollLeft > 0) {
			$slider_prev.removeClass('disabled');
		} else {
			$slider_prev.addClass('disabled');
		}
		
		if (scrollLeft + scrollWidth < sliderWidth) {
			$slider_next.removeClass('disabled');
		} else {
			$slider_next.addClass('disabled');
		}
	}
	$(window).on('fitstar.redraw', function() {
		update_controls();
	});
	
	$slider_outer.on('scroll', function() {
		update_controls();
	});
	update_controls();
	
	$slider_prev.click(function(e) {
		
		e.preventDefault();
		if ($slider_prev.hasClass('disabled')) return;
		
		var scrollLeftTo = memberPositions[prevPos];
		$slider_outer.animate({'scrollLeft': scrollLeftTo}, 800, function() {update_controls();});
		
		
	});
	
	$slider_next.click(function(e) {
		e.preventDefault();
		if ($slider_next.hasClass('disabled')) return;
		
		var scrollLeftTo = memberPositions[nextPos];
			$slider_outer.animate({'scrollLeft': scrollLeftTo}, 800, function() {update_controls();});
		
	});
	


});