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

$("img").on("click", function() {

  //var image = $(this).parent().find('img');

    /* <div class="my-button">reference</div>
    <div class="my-popper">popper</div> */
    var reference = $(this);
    var popper = document.querySelector('.modal');
    var popperInstance = new Popper(reference, popper, {
      // popper options here
      placement: "right",
    });
    
    $('.modal').css('display', 'block');

//   //traverses a single level up the DOM tree
//  var parentOfImage = $(this).parent('div');
// //console.log(parentOfImage);
//  var childrenOfContaining = parentOfImage.find("*");
// console.log(childrenOfContaining);

// var popup = childrenOfContaining.get(1);
// console.log(popup);

// $(popup).css('display', 'block');

});

