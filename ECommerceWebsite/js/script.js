
$(document).ready(function() {


    cartItems = [];
    var itemCount = 0;
    var priceTotal = 0.00;

    document.getElementById("shopping-cart-icon").addEventListener('click', function() {
        document.getElementById("cart-box").style.width = "250px";
        // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        $("#blackOut").show();
        $('body').addClass('overflow-hidden');
    });


    document.getElementById("close-btn").addEventListener('click', function() {
        document.getElementById("cart-box").style.width = "0";
        // document.body.style.backgroundColor = "#FFF";
        $("#blackOut").hide();
        $('body').removeClass('overflow-hidden');
    });
   
    
      
      $('.add_item').click(function() {
          
      });
      
      
    
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

    

    // https://stackoverflow.com/questions/6658752/click-event-doesnt-work-on-dynamically-generated-elements
    $(".products-grid").on("click", "div.add_to_cart_btn", function() {
        console.log("ADD TO CART CLICKED");

        // https://stackoverflow.com/a/10003709/9599554
        var idOfProduct = $(this).parents().eq(2).attr("id").match(/\d+/)[0];
        console.log("IDOFPRODUCT", idOfProduct);

        var productFromDatabase = products.find(x => x.id === parseInt(idOfProduct));

        console.log(productFromDatabase);

        var name = productFromDatabase.name;
        var price = productFromDatabase.price;

        itemCount++;
        $("#itemCount").text(itemCount).css('display', 'block');

        console.log($('#itemCount'));

        var shoppingCartItem = document.createElement("div");
        shoppingCartItem.innerHTML = `
        
        <div class="item-row">   
                <div class="item-quantity">2x</div>
                <div class="item-name">${name}</div>
                <div class="item-price">${price}</div>
                <div class="remove_item">X</div>
        </div>
        `;

        $(this).insertAfter($('[class^="fitem-row"]').last());

        var shoppingCartColumn = document.querySelector(".items-column");

         shoppingCartColumn.appendChild(shoppingCartItem);

         cartItems.push(shoppingCartItem);

         var idOfProduct = getIdOfCard($(this).parents().eq(2));

         var productFromDatabase = products.find(x => x.id === parseInt(idOfProduct));


         var price = parseInt(productFromDatabase.price.replace("$", ""));
         priceTotal += price;
         $("#cart-total").text("$"+priceTotal);

         
    });


    function getIdOfCard(card) {
        return card.attr("id").match(/\d+/)[0];
    }

    // i think i need to use event delegation because the 
    // items are being dynamically created.  This function only did something 
    // when there was something in the cart hard coded in the html
    /*
    $('.remove_item').on('click', function() {
        $(this).remove();
        itemCount--;
        $('itemCount').text(itemCount);
    });
    */

    $("#cart-box").on('click', '.remove_item', function() {
        

        var priceOfItem = $(this).parents().eq(0).find('.item-price').text().replace("$", "");

        // var priceOfItem = $(this).parents().eq(0)

        // remove item row from shopping cart
        $(this).parents().eq(0).remove();
        
    
        // update cart quantity indicator
        itemCount--;
        $('#itemCount').text(itemCount);

        // remove cost of deleted item from the total cart price 
        priceTotal -= priceOfItem;
        $("#cart-total").text("$" + priceTotal);

        if(itemCount == 0) {
            $('#itemCount').css('display', 'none');
        }
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
            
            console.log( $(".products-grid").find("div[data-region*=" + item + "]"));
            $(".products-grid").find("div[data-region*=" + item + "]").each(function (i) {
             
               // $(this).show();
               $(this).delay(200).slideDown("fast");
                
		    });
        });
// https://stackoverflow.com/a/24403771/9599554
        if(!Array.isArray(filterValues) || !filterValues.length) {
           console.log("No filters will be applied");
           $(".products-grid").find(".card").each(function() {
                $(this).delay(200).slideDown("fast");
           });
        }
    }

    /*products.html*/

var products = [
    {
        "id": 0,
        "name":"Scandavian Blend",
        "region": "Arabia",
        "roast_level": "Medium",
        "price": "$42",
        "description": "Earthly, dark choclate, medium body. From Arabia.",
        "weights": "12oz, 3lb, 5lb",
        "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
    }, {
        "id": 1,
        "name":"Scandavian Blend",
        "region": "Indonesia",
        "roast_level": "Dark",
        "price": "$75",
        "description": "Earthly, dark choclate, medium body.  From Indonesia.",
        "weights": "12oz, 3lb, 5lb",
        "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
    }, {
        "id": 2,
        "name":"Scandavian Blend",
        "region": "India",
        "roast_level": "Light",
        "price": "$25",
        "description": "Earthly, dark choclate, medium body. From India.",
        "weights": "12oz, 3lb, 5lb",
        "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
    }, {
        "id": 3,
        "name":"Scandavian Blend",
        "region": "Africa",
        "roast_level": "Light",
        "price": "$39",
        "description": "Earthly, dark choclate, medium body.  From Africa",
        "weights": "12oz, 3lb, 5lb",
        "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
    }
];

var generateProductsList = function() {
    products.forEach(function(item) {
        var productElement = document.createElement("div");
        // productElement.className = "card";
        productElement.innerHTML = `
        <div id="card-${item.id}" class="card" data-region="${item.region.toLowerCase()}">
                    <div class="image-container">
                            <img src="${item.img_url}" />
                            <div class="overlay">

                                    <div class="add_to_cart_btn">Add to Cart</div>
                            </div>
                    </div>

                    <div class="container">
                             <span class="product_price">${item.price}</span>
                            <span class="product_name">${item.name}</span>
                            <span class="roast_level">Roast Level: ${item.roast_level}</span>
                            <span class="product_description"><i>${item.description}</i></span>
                            <div class="product_rating">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                            </div>
                            <span class="product_weights">Weights: ${item.weights}</span>

                    </div>
    </div> `;

    var productsGrid = document.querySelector(".products-grid");
    
    productsGrid.appendChild(productElement);

    });
}

$(function() {
    generateProductsList();
});

// var init = function() {
//     alert("hi");
//     generateProductsList();
// }

// return {
//     init: init
// };

    
}); // end of $(document).ready

