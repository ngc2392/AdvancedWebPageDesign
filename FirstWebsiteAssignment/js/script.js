 // Scroll on button click
    // We give a unique class for each button and use that unique class to access in javascript
    
    $('.js--scroll-to-categories').click(function() {
        // make the automatic scroll
         $('html, body').animate({scrollTop: $('.js--section-categories').offset().top}, 1000); //1000ms = 1 second
     });
     
// clicking mobile nav 

$('.js--nav-icon').click(function() {
   //$('.overlay').attr("width", "100%");

   document.getElementById("myNav").style.width = "100%";

   
});