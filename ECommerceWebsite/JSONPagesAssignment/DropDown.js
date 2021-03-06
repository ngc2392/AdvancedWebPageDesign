$(document).ready(function() {
    var fadeTime = 300;
   
    var products = [
        {
            "id": 0,
            "name": "Arabian Blend",
            "region": "Arabia",
            "roast_level": "Medium",
            "price": "42.00",
            "description": "Earthly, dark choclate, medium body.  From Arabia.",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
        }, {
            "id": 1,
            "name":"Scandavian Blend",
            "region": "Indonesia",
            "roast_level": "Dark",
            "price": "75.50",
            "description": "Earthly, dark choclate, medium body.  From Indonesia.",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
        }, {
            "id": 2,
            "name":"Driven House Blend",
            "region": "India",
            "roast_level": "Light",
            "price": "25.00",
            "description": "Earthly, dark choclate, medium body. From India.",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
        }, {
            "id": 3,
            "name":"Tanzanian Peaberry",
            "region": "Africa",
            "roast_level": "Light",
            "price": "39.00",
            "description": "Rich and Intense with a swet outline.  From Africa",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
        }, {
            "id": 4,
            "name":"Ethiopian Harrar Coffee",
            "region": "Africa",
            "roast_level": "Light",
            "price": "27.22",
            "description": "Rich and Intense with a swet outline.  From Africa",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
        }, {
            "id": 5,
            "name":"Ethiopian Yirgacheffe Coffee",
            "region": "Africa",
            "roast_level": "Light",
            "price": "27.22",
            "description": "Rich and Intense with a swet outline.  From Africa",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
        }, {
            "id": 6,
            "name":"Kenya AA",
            "region": "Africa",
            "roast_level": "Light",
            "price": "27.22",
            "description": "Rich and Intense with a swet outline.  From Africa",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg"
        }, {
            "id": 7,
            "name":"Delta Ground",
            "region": "South America",
            "roast_level": "Light",
            "price": "27.22",
            "description": "Rich and Intense with a swet outline.  From South America",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg"
        }, {
            "id": 8,
            "name":"Brown Gold",
            "region": "South America",
            "roast_level": "Light",
            "price": "27.22",
            "description": "Rich and Intense with a swet outline.  From South America",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg"
        }, {
            "id": 9,
            "name":"La Crema",
            "region": "South America",
            "roast_level": "Light",
            "price": "27.22",
            "description": "Rich and Intense with a swet outline.  From South America",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg"
        }
    ];



if($('body').hasClass('DropDown_Page_Wrapper')) {
    $("#dropDown").append($("<option></option>").val("ALL").html("ALL"));
    $.each(products, function (key, value) {
        $("#dropDown").append($("<option></option>").val(value.region).html(value.region));
    });
    
    $("#dropDown").change(function () {
       // alert($(this).val());
      
       
       filterProducts($(this).val());
       

    });
    
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

    // send small shopping cart data when 
    $('.DropDown_Page_Wrapper .checkout-btn').on('click', function() {

        var arrayToSend = getSmallCart();

        console.log("SENDING", arrayToSend);

        var arraySend = encodeURIComponent(JSON.stringify(arrayToSend));
        //var url = "file:///Users/LoganPhillips/Desktop/AdvancedWebDesign/ECommerceWebsite/shopping_cart.html?data-array=" + arraySend;        
        var url = "./../shopping_cart.html?data-array=" + arraySend;        
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
    $(".DropDown_Page_Wrapper .products-column").on("click", "div.add_to_cart_btn", function() {
        console.log("ADD TO CART CLICKED");

        // https://stackoverflow.com/a/10003709/9599554
        // get the card class from the parents of the button, get the id, get just the number from the id
        var idOfProduct = $(this).parents().eq(1).attr("id").match(/\d+/)[0];
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


    // https://codepen.io/adrianparr/pen/Eoydz
    // https://codepen.io/NickyCDK/pen/lhaiz?editors=1010
    function filterProducts(filterValue) {
        // need to delete all products and insert them back in.  If not, they don't position correctly.  The just stay in their original place.
        $('.products-column').empty();
    
        var results = [];

        console.log("FILTER VALUes", filterValue);

        var tempResults = products.filter(obj => {
            
            // white space was making the strings not equal
            //return obj.region.toLowerCase().replace(/\s/g,'') === value.replace(/\s/g,'');
            return obj.region.toLowerCase().replace(/\s/g,'') === filterValue.toLowerCase().replace(/\s/g,'') 
        });

        console.log("DROP DOWN RESULT", tempResults);
       
        // hide it so that we can apply an animation
        $('.products-column').hide();
        applyFilters(tempResults);
        // now have filtered products show up
        $('.products-column').delay(200).slideDown("fast");

        //https://stackoverflow.com/a/24403771/9599554
        // show everything

        if(filterValue === "ALL") {
            console.log("No filters will be applied");
            $('.products-column').hide();
            applyFilters(products);
            $('.products-column').delay(200).slideDown("fast");
        }

        // if(!Array.isArray(filterValue) || !filterValue.length) {
        //    console.log("No filters will be applied");
        //    $('.products-grid').hide();
        //    applyFilters(products);
        //    $('.products-grid').delay(200).slideDown("fast");
        // }

    }

// make this a generic one, can then get rid of applyFilters();
var generateProductsList = function(array) {
    array.forEach(function(item) {
        var productElement = document.createElement("div");
        // productElement.className = "card";
        productElement.innerHTML = `
        <div id="card-${item.id}" class="card" data-region="${item.region.toLowerCase()}">
            <div class="image-container">
                <img src="https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" />
            </div>
  
            <div class="content">
                <h1>${item.name}</h1>
                <div class="product_info_wrapper">
                    <span class="roast_level">Roast Level: ${item.roast_level} </span>
                    <span class="product_description"> <i>${item.description}</i></span>
                    <span class="product_price"></span>$${item.price}</span>
                </div>
    
                <span class="product_weights">
                    Weights: ${item.weights}
                </span>
    
                <div class="add_to_cart_btn">Add to Cart</div>
            </div>

    </div> `;

    var productsGrid = document.querySelector(".products-column");
    
    productsGrid.appendChild(productElement);

    });
}

// show filtered items on screen
var applyFilters = function(array) {
    console.log("SENDING THE FOLLOWING", array);
    generateProductsList(array);
};


$(function() {
    generateProductsList(products);
});

}
});