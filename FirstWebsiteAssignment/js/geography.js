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