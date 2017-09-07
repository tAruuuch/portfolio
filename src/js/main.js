$(document).ready(function() {
  $("a").click(function() {
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top - 50;
    $('html, body').animate({
      scrollTop: destination
    }, 1000);
    return false;
  });

  $('.skillbar').each(function(){
		$(this).find('.skillbar-bar').animate({
			width:$(this).attr('data-percent')
		}, 6000);
	});
});
