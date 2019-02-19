$('.symbol-box').click(function() {

    //.children() will return only direct descendants where .find() will search through all elements underneath; children, grandchildren, etc
    var child = $(this).find('img').attr('src');
    console.log(child);

    


    //get unique class of clicked element
    var classes = $(this)[0].classList;

    for(var i = 0; i < classes.length; i++) {
        console.log(classes[i]);
    }

    var uniqueClass = "." + classes[1];

    $(uniqueClass + " " + ".popup").show();

    //console.log(classes);

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