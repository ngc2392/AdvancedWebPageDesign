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

    $('.filters-clear-btn').on('click', function() {
        clearFilters();
        clearFiltersOnScreenText();
    });

    $('.filters-done-btn').on('click', function() {
        let x = document.getElementsByClassName('filters-options-box-clicked');
        //console.log(x);

        let regionsFiltersText = [];
        let roastLevelsText = [];

        for(var i = 0; i < x.length; i++) {
           
            if(x[i].parentNode.className === 'region-grid') {
                regionsFiltersText.push(x[i].textContent);
            } else if(x[i].parentNode.className === 'roast-level-row') {
                roastLevelsText.push(x[i].textContent);
            } 
        }

        let regionNode = document.getElementById('region-insert');
        for(var i = 0; i < regionsFiltersText.length; i++) {
            //console.log(regionsFiltersText[i]);
            regionNode.innerHTML += regionsFiltersText[i];
        }

        //console.log(regionNode);

        let roastLevelsNode = document.getElementById('roast-levels-insert');
        for(var i = 0; i < roastLevelsText.length; i++) {
            roastLevelsNode.innerHTML += " " + roastLevelsText[i];
        }

    
        $('.filters-box-content').toggle();
        
    });

    function clearFilters() {

        let selectedFilters = document.getElementsByClassName('filters-options-box-clicked');
        console.log("BEFORE", selectedFilters);
        console.log("LENGTH OF ARRAY " + selectedFilters.length);


        [].forEach.call(document.querySelectorAll('.filters-options-box-clicked'), function (el) {
            el.classList.remove('filters-options-box-clicked');
        });

        // below didn't work
        /*
        for(var i = 0; i < selectedFilters.length; i++) {
            console.log(i);
            selectedFilters[i].classList.remove('filters-options-box-clicked')
        }

        let selectedFiltersAfter = document.getElementsByClassName('.filters-options-box-clicked');
        console.log("AFTER", selectedFiltersAfter);
        */
    }

    function clearFiltersOnScreenText() {

        document.getElementById("region-insert").innerHTML = "";
        document.getElementById("roast-levels-insert").innerHTML = "";

    
    }
    
});

/*products.html*/

$(document).ready(function() {
    $('.add_to_cart_btn').on('click', function() {

    

        // get an array of parents of the button
        //we need to use .eq because [] returns a dom element
        console.log($(this).parents().eq(2).attr("data-region"));
    });


    $('.filters-done-btn').on('click', function() {
        var clickedBoxes = $('.filters-box-content').find('.filters-options-box-clicked');
        console.log("Clicked boxes", clickedBoxes);

        var filters=[];

        jQuery.each(clickedBoxes, function(index, item) {
            console.log("ITEM", item);
             // https://stackoverflow.com/a/6623263/9599554
            var itemText = $(item).text().replace(/ /g, '').toLowerCase();
            filters.push(itemText);
        });

        console.log("FILTERS ARRAY", filters);

        filterProducts(filters);
    
    });

    // https://codepen.io/adrianparr/pen/Eoydz
    // https://codepen.io/NickyCDK/pen/lhaiz?editors=1010
    function filterProducts(filterValues) {

        console.log("filterValues", filterValues);
        var list = $('.card');
        
        $('.card').fadeOut("fast");

         //$('.card').hide();

        console.log("div[data-region*=" + filterValues + "]");
        
        jQuery.each(filterValues, function(index, item) {

            $(".products-grid").find("div[data-region*=" + item + "]").each(function (i) {
               
               // $(this).show();
                $(this).delay(200).slideDown("fast");
            
		    });
        });

        if(!filterValues) {
           console.log("No filters will be applied");
        }
    }


});