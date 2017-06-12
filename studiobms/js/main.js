$(document).ready(function() {
  $("a").click(function() {
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top - 50;
    $('html, body').animate({
      scrollTop: destination
    }, 1000);
    return false;
  });

  var w_h = window.innerWidth;
  var slides = 5;

  if (w_h <= 480) {
    slides = 2;
  } else if (w_h <= 767) {
    slides = 3;
  } else if (w_h <= 979 && w_h >= 768) {
    slides = 4;
  } else if (w_h >= 1200) {
    slides = 5;
  }

  var mySwiper = new Swiper ('.swiper-container', {
      direction: 'horizontal',
      pagination: '.swiper-pagination',
      slidesPerView: slides,
      paginationClickable: true,
      spaceBetween: 30,
      loop: true
    });
});

$(window).scroll(function() {
  var scroll = $(window).scrollTop();

  if(scroll >= 400) {
    $(".navbar").addClass("navbar-top-scroll");
  } else {
    $(".navbar").removeClass("navbar-top-scroll");
  }
});
