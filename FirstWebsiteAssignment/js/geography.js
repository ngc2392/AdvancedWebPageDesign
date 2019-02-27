/*If this is after the accordion, the accordion is way too big*/
$( function() {
    $( "#tabs" ).tabs();
  });

$( function () {
    $("#geography-accordion").accordion({
        active: false,
        collapsible: true
    });
});

$(function() {
    tippy("#top-mountains div", {
      placement: 'top',
      animation: 'fade',
      duration: 0,
      arrow: true,
      delay: [20,20]
    });
   });