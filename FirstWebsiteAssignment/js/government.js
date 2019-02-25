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

$(function() {
// Enables popover
$("[data-toggle=popover]").popover();
});

 
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


$(".section-nat-reps img").on("click", function() {
  //$($(this)+"" + '.dialog-box').dialog("open");
  // $('.dialog-box').dialog("open");
 //console.log($('.dialog-box'));

  //traverses a single level up the DOM tree
//  var parentOfImage = $(this).parent('div');
//  console.log(parentOfImage);
//  var childrenOfContaining = parentOfImage.children();
// console.log(childrenOfContaining);




});

