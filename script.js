$(document).ready(function() {
  // Функция для установки цветового класса
  function setColorClass(slick, slideIndex) {
      var sliderRoot = $('#landing-slideshow').closest('.upper-landing__slideshow');
      var colorClass = $(slick.$slides[slideIndex]).attr('data-color-class');
      sliderRoot.removeClass('compling zakharov textmining llm').addClass(colorClass);
  }

  // Инициализация Slick Slider
  $('#landing-slideshow').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      appendDots: '.slideshow-dots',
      appendArrows: '.slideshow-arrows',
      prevArrow: '#ul-prev',
      nextArrow: '#ul-next',
      fade: true,
      initialSlide: 0 // Устанавливаем первый слайд активным при загрузке
  });

  // Начальная установка цвета и изменение при переключении слайдов
  $('#landing-slideshow').on('init', function(event, slick) {
      setColorClass(slick, slick.currentSlide);
  }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      setColorClass(slick, nextSlide);
  });
});
