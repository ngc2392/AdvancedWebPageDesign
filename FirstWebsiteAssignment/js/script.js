
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
