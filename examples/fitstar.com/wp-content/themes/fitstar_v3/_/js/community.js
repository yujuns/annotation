jQuery(window).ready(function($) {

	// ==========================================================================
	// LIVE STATS
	// ==========================================================================	
	var $stats = $('#community-stats li');
	$stats.each(function(i, stat) {
		var val = $(this).data('start-val');
		var interval = $(this).data('interval');
		var $target = $(stat).find('em');
		
		setInterval(function() {
			val++;
			$target.text(addCommas(val));
		}, interval);
		
		
		if (touchDevice) {
			$(stat).click(function(e) {
				$stats.not(this).removeClass('hover-state');
				$(this).toggleClass('hover-state');
				
			});
			
		} else {
			$(stat).hover(
				function() { $(stat).addClass('hover-state'); },
				function() { $(stat).removeClass('hover-state'); }
			);
		}
		
	});
	
	function addCommas(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}


	// ==========================================================================
	// INSTAGRAM FEED
	// ==========================================================================	
	var $instagram = $('#instagram-feed');
	var $overlay = $instagram.find('.overlay');
	var $caption_container = $('#instagram-caption');
	var $caption_target = $caption_container.find('.caption-target');
	var $instagram_media = $instagram.find('.instagram-media');
	
	// Remove overlay on click
	$overlay.find('a').click(function(e) {
		e.preventDefault();
		$instagram.removeClass('has-overlay');
	});
	
	// Rollovers
	$instagram_media.each(function(i, media) {
		var $media = $(media);
		var $caption = $(media).find('.caption');
		var caption_html = $caption.html();
		
		$media.hover(
			function() {
				$caption.addClass('active');
				$caption_target.html(caption_html);
			},
			function() {
				$caption.removeClass('active');
				$caption_target.empty();
			}
		
		);		
	});


	// ==========================================================================
	// TWEETS & TESTIMONIALS
	// ==========================================================================
	$("#tweets-and-testimonials .icon-plus").click(function () {
		$("#tweets-and-testimonials").removeClass("inactive");
		$("#tweets-and-testimonials").addClass("active");
	});

	$("#close").click(function () {
		$("#user-avatars li").removeClass('active');
		$("#user-avatars li").removeClass('fade');
		$("#tweets-and-testimonials").addClass("inactive");
		$("#tweets-and-testimonials").removeClass("active");
	});

	$("#user-avatars li").click(function (e) {
		e.preventDefault();
	  	
		if (!$("#tweets-and-testimonials").hasClass("active")) return;
		
	  	if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('#user-avatars li').removeClass("fade");
			
		} else {
			$(this).addClass('active');
			$('#user-avatars li').not(this).removeClass('active');
			$('#user-avatars li').not(this).each(function(){
	    		$(this).addClass("fade");

			});
		}
			  	
	});
});
