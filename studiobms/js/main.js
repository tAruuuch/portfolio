$(document).ready(function() {
  $("a").click(function() {
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top - 50;
    $('html, body').animate({
      scrollTop: destination
    }, 1000);
    return false;
  });

  var mySwiper = new Swiper ('.swiper-container', {
      direction: 'horizontal',
      pagination: '.swiper-pagination',
      slidesPerView: 5,
      paginationClickable: true,
      spaceBetween: 30,
      loop: true
    });
});
