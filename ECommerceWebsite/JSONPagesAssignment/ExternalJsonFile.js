

$(function() {

    var fadeTime = 300;
   
//var products;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    console.log(myObj);
    //document.getElementById("demo").innerHTML = myObj.name;
  }
};
xmlhttp.open("GET", "data.json", true);
xmlhttp.send();


});

if($('body').hasClass('ExternalJsonFile_Page_Wrapper')) {
       
    document.getElementById("shopping-cart-icon").addEventListener('click', function() {
        document.getElementById("cart-box").style.width = "250px";
        $("#blackOut").show();
        $('body').addClass('overflow-hidden');
    });


    document.getElementById("close-btn").addEventListener('click', function() {
        document.getElementById("cart-box").style.width = "0";
        $("#blackOut").hide();
        $('body').removeClass('overflow-hidden');
    });
       
    $('.filters-btn').click(function() {
        $('.filters-box-content').toggle('slow', function() {
            //animation complete
        });
    });

    // fill filters box item when clicked
    $('.filters-options-box').on('click', function(e) {
        $(this).toggleClass('filters-options-box-clicked');
        e.preventDefault();
    });

    // clear the filters
    $('.filters-clear-btn').on('click', function() {
        clearFilters();
        clearFiltersOnScreenText();
    });

    $('.filters-done-btn').on('click', function() {
        let x = document.getElementsByClassName('filters-options-box-clicked');
        //console.log(x);

        // get the text that we are going to filter by 
        let regionsFiltersText = [];
        let roastLevelsText = [];

        for(var i = 0; i < x.length; i++) {
           
            if(x[i].parentNode.className === 'region-grid') { // going through region boxes
                regionsFiltersText.push(x[i].textContent);
            } else if(x[i].parentNode.className === 'roast-level-row') { // going through roast levels
                roastLevelsText.push(x[i].textContent);
            } 
        }

        // insert filter text onto page 
        let regionNode = document.getElementById('region-insert');
        for(var i = 0; i < regionsFiltersText.length; i++) {
            //console.log(regionsFiltersText[i]);
            regionNode.innerHTML += regionsFiltersText[i];
        }

        //console.log(regionNode);

        // filter roast levels text onto screen 
        let roastLevelsNode = document.getElementById('roast-levels-insert');
        for(var i = 0; i < roastLevelsText.length; i++) {
            roastLevelsNode.innerHTML += " " + roastLevelsText[i];
        }

    
        $('.filters-box-content').toggle();
        
    });

    // clear all filters, get all products on page 
    function clearFilters() {
        let selectedFilters = document.getElementsByClassName('filters-options-box-clicked');
        // https://stackoverflow.com/a/40001129/9599554
        [].forEach.call(document.querySelectorAll('.filters-options-box-clicked'), function (el) {
            el.classList.remove('filters-options-box-clicked');
        });
    }
    // clear the filters text on screen
    function clearFiltersOnScreenText() {
        document.getElementById("region-insert").innerHTML = "";
        document.getElementById("roast-levels-insert").innerHTML = "";
    }

    // send small shopping cart data when 
    $('.Products_Page_Wrapper .checkout-btn').on('click', function() {

        var arrayToSend = getSmallCart();

        console.log("SENDING", arrayToSend);

        var arraySend = encodeURIComponent(JSON.stringify(arrayToSend));
        //var url = "file:///Users/LoganPhillips/Desktop/AdvancedWebDesign/ECommerceWebsite/shopping_cart.html?data-array=" + arraySend;        
        var url = "./shopping_cart.html?data-array=" + arraySend;        
        var element = document.getElementById('checkout-btn-link');
        element.setAttribute("href",url)


    });

    // cart for products.html.  This is in comparison to shopping_cart.html
    function getSmallCart() {

        var arrayToReturn = new Array();

        var smallShoppingCartItems = $('.cart-box').find('.item-row');
        
        smallShoppingCartItems.each(function(index, item) {

            console.log("THIS", $(this));

            console.log("ITEM", item);

            // had to switch item.find to $(item).find because item.find isn't a method
            var itemQuantity = $(item).find('.item-quantity').text();
            var itemName = $(item).find('.item-name').text();
            var itemPrice = $(item).find('.item-price').text();

            arrayToReturn.push({
                "name": itemName,
                "price": itemPrice,
                "quantity": itemQuantity
            });
        });
        return arrayToReturn;
    }

    // https://stackoverflow.com/questions/6658752/click-event-doesnt-work-on-dynamically-generated-elements
    $(".Products_Page_Wrapper .products-grid").on("click", "div.add_to_cart_btn", function() {
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

        var continueOn = true;

    
        $('.items-column').children().each(function(i, div) {

            console.log("THIS OK", $(this).children().children().hasClass("quantity-price-row"));

            if($(this).children().children().hasClass('quantity-price-row')) {

                console.log("TEXT", $(this).find('.item-quantity').text().match(/\d+/)[0]);
                if($(this).find('.item-name').text() === name) {
                    console.log("That item is already in the cart.  Increasing the quantity by one");
    
                    var oldQuantity = parseInt($(this).find('.item-quantity').text().match(/\d+/)[0]);
                    var newQuantity = oldQuantity + 1;
    
                    console.log("newQuantity is" + newQuantity);
                    $(this).find('.item-quantity').text(newQuantity + "x");
    
                    continueOn = false;

                    recalculateSmallCart();

                    // return false in the call back function to exit 
                    return false;
                }
            }
        });

        // if we updated a quantity, we don't need to move on
        if(!continueOn) {
            return;
        }
     

        var shoppingCartItem = document.createElement("div");
        shoppingCartItem.innerHTML = `
        
        <div class="item-row">   
                <div class="item-name">${name}</div>
                <div class="quantity-price-row">
                <div class="item-quantity">1x</div>
                <div class="item-price">$${price}</div>
                </div>
                <div class="remove_item"><i class="fas fa-times"></i></div>
        </div>
        `;

        $(this).insertAfter($('[class^="fitem-row"]').last());

        var shoppingCartColumn = document.querySelector(".items-column");

         shoppingCartColumn.appendChild(shoppingCartItem);

        recalculateSmallCart();    
    });

    // recalculate small shopping cart on products.html
    function recalculateSmallCart() {

        var newTotalPrice = 0;

        // find all quanities and prices add them up 
        $('.items-column').children().each(function(i, div) {

            // if we don't have this, we get a null
            if($(this).children().children().hasClass('quantity-price-row')) { 
                var cartItemPrice =  parseFloat($(this).find('.item-price').text().replace("$", ""));
            console.log("p", cartItemPrice);
            var cartItemQuantity =  parseInt($(this).find('.item-quantity').text().match(/\d+/)[0]);
            console.log("pq", cartItemQuantity);
            var tempPrice = cartItemPrice * cartItemQuantity;
            newTotalPrice = newTotalPrice + tempPrice;
            }
            
        });

        $("#cart-total").text("$"+newTotalPrice.toFixed(2));
        var totalItems = 0;
        $('.items-column').find('.item-row').find('.quantity-price-row .item-quantity').each(function(index, obj) {
             totalItems += parseInt($(this).text().match(/\d+/)[0]);
        });
        $("#itemCount").text(totalItems).css('display', 'block');
    }

    function getIdOfCard(card) {
        return card.attr("id").match(/\d+/)[0];
    }

    $("#cart-box").on('click', '.remove_item', function() {
        var priceOfItem = $(this).parents().eq(0).find('.item-price').text().replace("$", "");
        $(this).parents().eq(0).remove();
        recalculateSmallCart();
    });


    $('.filters-done-btn').on('click', function() {
        // get all the boxes that have been clicked by the user
        var clickedBoxes = $('.filters-box-content').find('.filters-options-box-clicked');
        console.log("Clicked boxes", clickedBoxes);

        var filters=[];

        // go through each div in the array
        jQuery.each(clickedBoxes, function(index, item) {
            console.log("ITEM", item);
             // https://stackoverflow.com/a/6623263/9599554
             // put the text of each box into the array
            var itemText = $(item).text().replace(/ /g, '').toLowerCase();
            filters.push(itemText);
        });
        console.log("FILTERS ARRAY", filters);
        filterProducts(filters);
    });

    // https://codepen.io/adrianparr/pen/Eoydz
    // https://codepen.io/NickyCDK/pen/lhaiz?editors=1010
    function filterProducts(filterValues) {
        $('.products-grid').empty();
    
        var results = [];

        // go through all the text of filter values.
        jQuery.each(filterValues, function(indexInArray, value) {
            // set tempResults equal to obj if item in database is equal to the filter values
            var tempResults = products.filter(obj => {
                // white space was making the strings not equal
                //return obj.region.toLowerCase().replace(/\s/g,'') === value.replace(/\s/g,'');
                return obj.region.toLowerCase().replace(/\s/g,'') === value.replace(/\s/g,'') ||
                obj.roast_level.toLowerCase().replace(/\s/g,'') === value.replace(/\s/g,'');
            });
            results = results.concat(tempResults);
            console.log("FILTERS CONCAT", results);
        });

        // hide it so that we can apply an animation
        $('.products-grid').hide();
        applyFilters(results);
        // now have filtered products show up
        $('.products-grid').delay(200).slideDown("fast");

        //https://stackoverflow.com/a/24403771/9599554
        // show everything
        if(!Array.isArray(filterValues) || !filterValues.length) {
           console.log("No filters will be applied");
           $('.products-grid').hide();
           applyFilters(products);
           $('.products-grid').delay(200).slideDown("fast");
        }

    }

// make this a generic one, can then get rid of applyFilters();
var generateProductsList = function(array) {
    array.forEach(function(item) {
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
                             <span class="product_price">$${item.price}</span>
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

// show filtered items on screen
var applyFilters = function(array) {
    generateProductsList(array);
};


$(function() {
    generateProductsList(products);
});

}