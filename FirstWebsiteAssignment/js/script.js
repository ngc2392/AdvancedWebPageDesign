
/* ----------    index.html     --------------  */

// Scroll on button click
// We give a unique class for each button and use that unique class to access in javascript

$('.js--scroll-to-categories').click(function () {
   // make the automatic scroll
   $('html, body').animate({ scrollTop: $('.js--section-categories').offset().top }, 1000); //1000ms = 1 second
});

// clicking mobile nav 

$('.js--nav-icon').click(function () {
   //$('.overlay').attr("width", "100%");

   document.getElementById("myNav").style.width = "100%";


});

// Clicking anywhere on the div, except the links, will close the mobiel nav window
$(function () {

   if ($('#myNav').is(':visible')) {

      $('body').css('overflow', 'hidden');

      $('#myNav').click(function (e) {
         if (e.target.id == 'mobile-nav-econ' || e.target.id == 'mobile-nav-hist' || e.target.id == 'mobile-nav-govt' || e.target.id == 'mobile-nav-sym' || e.target.id == 'mobile-nav-geo' || e.target.id == 'mobile-nav-cen') {

         } else {
            document.getElementById("myNav").style.width = "0%";
         }
      });
   }

   $('body').css('overflow', 'auto');
});


/* ----------   economy.html     --------------  */



/* ----------    history.html     --------------  */




/* ----------    government.html     --------------  */

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





/* ----------    symbols.html     --------------  */

/*
$('.symbol-box').click(function() {

    //.children() will return only direct descendants where .find() will search through all elements underneath; children, grandchildren, etc
    var child = $(this).find('img').attr('src');
    console.log(child);

    // close any other popups that are currently up before we open the new one
    $('.popup').hide();


    //get unique class of clicked element
    var classes = $(this)[0].classList;

    for(var i = 0; i < classes.length; i++) {
        console.log(classes[i]);
    }

    // If we don't have this line, then all popups will show.  We only want the one that we clicked on 
    var uniqueClass = "." + classes[1];

    $(uniqueClass + " " + ".popup").show();

    //console.log(classes);

});
*/

/*this function makes corresponding popup appear when a image is clicked on symbols.html.  It gets the parents of the clicked image.  We want the div that holds it.  It then gets the unique class name.*/

$('img').click(function () {
   var parent = $(this).parents()
   console.log(parent);
 
   var classes = parent[1].classList;
   console.log(classes);
 
   for (var i = 0; i < classes.length; i++) {
     console.log(classes[i]);
   }
 
   var uniqueClass = "." + classes[1];
   console.log(uniqueClass);
 
   $(uniqueClass + " " + ".popup").show();
 });
 

/*Clicking anywhere outside of the .popup div closes the pop up.  If you click on anything that is not a child of the pop up (so anything in the popup div, or the container itself, then the window closes.*/

 // Clicking outside the div  closes the pop up window.
 $(document).mouseup(function (e) {
   var container = $(".popup");
 
   // If we don't have this, then clicking text inside the popup will make it close
   var childrenOfPopup = $(".popup").children();
   var image = $('.symbols-row img')[0];
   console.log(image);
 
   var clickedElement = e.target;
     
   if (!container.is(clickedElement) && !childrenOfPopup.is(clickedElement)) {
     container.hide();
   }
 
   /*
   if (!container.is(e.target) && container.has(e.target).length === 0) {
     container.hide();
   }
   */
 });
 
 
 // Clicking the 'x' hides the pop up
 $('.fa-times').click(function () {
   console.log("clicking...")
 
   $('.popup').hide();
 
 });
 
/* ----------    geography.html     --------------  */


/* ----------    census.html     --------------  */


