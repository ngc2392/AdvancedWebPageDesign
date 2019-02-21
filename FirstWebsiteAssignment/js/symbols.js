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


// https://api.jquery.com/category/events/event-object/
// Clicking outside the div  closes the pop up window
$(document).mouseup(function (e) {
  var container = $(".popup");

  // If we don't have this, then clicking text inside the popup will make it close
  var childrenOfPopup = $(".popup").children();
  var image = $('.symbols-row img')[0];
  console.log(image);

    
  if (!container.is(e.target) && !childrenOfPopup.is(e.target)) {
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



$(".profile1").click(function () {
  $(".profile1 .popup").show();
})

$(".profile2").click(function () {
  $(".popup").show();
})

$("#close").click(function () {
  $(".profile1 .popup").hide();
})