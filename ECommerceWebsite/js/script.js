window.onload = function() {
    document.getElementById("menu").onclick = function fun() {
        document.getElementById("sideNav").style.width = "250px";
    }
    
    document.getElementById("closeButton").onclick = function fun() {
        document.getElementById("sideNav").style.width = "0";
    }    
}

$(document).ready(function() {
    
    $('.filters-btn').click(function() {
        
        $('.filters-box-content').toggle('slow', function() {
            //animation complete
        });
    });

    $('.filters-options-box').on('click', function(e) {
        $(this).toggleClass('filters-options-box-clicked');
        e.preventDefault();
    });
    
});