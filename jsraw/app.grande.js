var activeClass = 'active',
		$allWork = $('section'),
		$animateWrap = $('.animate-wrap'),
		$workMenu = $('menu'),
		$btnClose = $('#button-close');

$(window).ready(function() {

	$('article').on('click', 'a', function(e) {
		e.preventDefault();

		$this = $(this),
		id = $this.attr('data-post-id');

		$animateWrap.toggleClass(activeClass);
		$('section[data-work-id="' + id + '"]').toggleClass(activeClass);

		window.scrollTo(0,0);

	});

	$workMenu.on('click', $btnClose, function(e) {
		e.preventDefault();
		closeWork();
	});

	$('.video-container').fitVids();

}); // doc.ready

function closeWork() {
	$animateWrap.removeClass(activeClass);
	$allWork.removeClass(activeClass);
}