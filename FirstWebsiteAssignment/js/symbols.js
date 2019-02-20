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


$('.fa-times').click(function () {
  console.log("clicking...")

  $('.popup').hide();

});



$(".profile1").click(function() {
    $(".profile1 .popup").show();
  })
  
  $(".profile2").click(function() {
    $(".popup").show();
  })
  
  $("#close").click(function() {
    $(".profile1 .popup").hide();
  })