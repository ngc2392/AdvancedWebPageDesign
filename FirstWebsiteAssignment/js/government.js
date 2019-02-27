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
 
var dataResponse;

$(function() {
  var data = $.ajax({
    type: "GET",
    url: 'http://awd.examples.icu/data.json',
    dataType: 'json', 
    async: false,
    success: function(data) {
      console.log("SUCCESS");
      //console.log(data);
      dataResponse = data;
    }, 
    error: function() {
      console.log("ERROR");
    }
  });
 

});

$("img").on("click", function(e) {

  var clickedImageID = $(this).attr("id");

  for(var i = 0; i < dataResponse.length; i++) {
    var offical = dataResponse[i];

    var fullName = offical.firstName.toLowerCase() + "_" + offical.lastName.toLowerCase();
    //console.log(fullName);

    if(clickedImageID === fullName) {
      console.log("FOUND!")

      var divContentHTML = "<p>" + offical.firstName + "</p>";

      $(divContentHTML).dialog({
        autoOpen: true,
        title: offical.firstName + " " + offical.lastName,
        show: {
          effect: "blind",
          duration: 1000
        }, 
        hide: {
          effect: "explode",
          duration: 1000
        }
      }); 
      
    }
  }
});

/*This is just in case the ajax call doesn't work. */
$( function() {
  $( "#governor-dialog" ).dialog({
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

  $( ".section-state-governor img" ).on( "click", function() {
    $("#governor-dialog" ).dialog( "open" );
  });
} );