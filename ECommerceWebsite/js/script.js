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