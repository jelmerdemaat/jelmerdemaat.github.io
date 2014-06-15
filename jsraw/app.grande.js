// Functional code

var activeClass = 'active',
		$allWork = $('section'),
		$animateWrap = $('.animate-wrap'),
		$workMenu = $('menu'),
		$btnClose = $('#button-close');

$(function() {

	$('article a').on('click', function(e) {
		e.preventDefault();

		$this = $(this),
		id = $this.attr('data-post-id');

		$animateWrap.toggleClass(activeClass);
		$('section[data-work-id="' + id + '"]').toggleClass(activeClass);

	});

	$workMenu.on('click', $btnClose, function(e) {
		console.log('close');
		e.preventDefault();
		closeWork();
	});

});

function closeWork() {
	$animateWrap.removeClass(activeClass);
	$allWork.removeClass(activeClass);	
}