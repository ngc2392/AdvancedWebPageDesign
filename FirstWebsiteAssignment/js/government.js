$(document).ready(function() {
    //alert("he")
    $(".center").slick({
        arrows: true,
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1
      });

      $('.slick-slide').on('mouseenter')


      $("img").click(function() {

        var srcAttribute = $(this).attr('src');

        alert("source of the image is " + srcAttribute);
      });


});
