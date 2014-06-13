// Functional code

var activeClass = 'active',
		$animateWrap = $('.animate-wrap');

$(function() {

	$('article a').on('click', function(e) {
		e.preventDefault();

		$this = $(this),
		id = $this.attr('data-post-id');

		$animateWrap.toggleClass(activeClass);
		$('section[data-work-id="' + id + '"]').toggleClass(activeClass);
	});

});