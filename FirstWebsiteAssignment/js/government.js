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
 
      //$('.slick-slide').on('mouseenter');
 
 
      $("img").click(function() {
 
        var srcAttribute = $(this).attr('src');
 
       // alert("source of the image is " + srcAttribute);
      });
 
 });

 /*
$(function() {
// Enables popover
$("[data-toggle=popover]").popover();
});
*/
 
 $(function() {
  tippy("#bob", {
    placement: 'right',
    content: 'hello there', 
    animation: 'fade',
    duration: 0,
    arrow: true,
    delay: [20, 20]
  });
 
 });
 
 $(function() {
  tippy(".section-state-reps img", {
    placement: 'top',
    animation: 'fade',
    duration: 0,
    arrow: true,
    delay: [20,20]
  });
 });
 

 // JQuery UI dialog



$(function() {
  $(".dialog-box").dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000
    }, 
    hide: {
      effect: "explode",
      duration: 1000
    }
  });
});


$(function() {



});

$('.close').on("click", function() {
  
  $(".modal").css("display", "none");
});

$("img").on("click", function(e) {

var idOfContainer = "#" + $(this).parent('div').attr("id");
// var reference = $(idOfContainer);
// var popper = document.querySelector('.modal');
// var popperInstance = new Popper(reference, popper, {
//   // popper options here
//   placement: "right",
// });
//console.log(idOfContainer + "" + ".modal")
$(idOfContainer + " " + " .modal").css('display', 'block');


});

