
$(document).ready(function() {
   
    var products = [
        {
            "id": 0,
            "name":"Arabian Blend",
            "region": "Arabia",
            "roast_level": "Medium",
            "price": "42",
            "description": "Earthly, dark choclate, medium body. From Arabia.",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
        }, {
            "id": 1,
            "name":"Scandavian Blend",
            "region": "Indonesia",
            "roast_level": "Dark",
            "price": "75",
            "description": "Earthly, dark choclate, medium body.  From Indonesia.",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
        }, {
            "id": 2,
            "name":"Driven House Blend",
            "region": "India",
            "roast_level": "Light",
            "price": "25",
            "description": "Earthly, dark choclate, medium body. From India.",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
        }, {
            "id": 3,
            "name":"Tanzanian Peaberry",
            "region": "Africa",
            "roast_level": "Light",
            "price": "39",
            "description": "Rich and Intense with a swet outline.  From Africa",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg" 
        }
    ];


    if($('body').hasClass('ShoppingCartPage')) {

        
        $(document).ready(function() {

            //initilalize shopping cart page
            initializeBigShoppingCart();
            console.log("INITAL");
            // fill in total-item-price 

            $('.products').children().each(function(index, item) {
            
                console.log("ITEM",$(item).children());
                console.log("ITEM 2", $(item).children().children());

                // product-row, find .product-price in the children
                var itemPrice = $(item).children().children().eq(2).text().replace("$", "");
                var quantity = $(item).children().children().eq(3).children().val();
                var totalItemPrice = parseFloat(itemPrice) * parseFloat(quantity);
                console.log("ITEM PRICE", itemPrice);
                console.log("QUANTITY", quantity);
                console.log(totalItemPrice.toFixed(2));

                $(item).children().children().eq(5).text("$"+totalItemPrice);

            });


            recalculateCart();
    
          });

          function initializeBigShoppingCart () {
            var productsFromSmallShoppingCart = JSON.parse(decodeURIComponent(GetURLParameter("data-array")));
          
            console.log("FROM URL", productsFromSmallShoppingCart);

            $(productsFromSmallShoppingCart).each(function(index, itemFromSmallCart) {
                console.log("JSON", itemFromSmallCart);

                // should probably be searching by id
                var productFromDatabase = getProductFromDatabase(itemFromSmallCart.name)[0];
                console.log("PRODUCT FROM DATABASE", productFromDatabase);

                // now create the divs for each item 
                
                var shoppingCartElement = document.createElement("div");
                // productElement.className = "card";
                shoppingCartElement.innerHTML = `
                <div class="product-row">
                            <div class="product-image">
                                    <img src="${productFromDatabase.img_url}" />
                            </div>
        
                            <div class="product-details">
                                <div class="product-title">${productFromDatabase.name}</div>
                                <div class="product-description">${productFromDatabase.description}</div>
                            </div>

                            <div class="product-price">$${productFromDatabase.price}</div>
                            <div class="product-quantity">
                                <input type="number" value="${itemFromSmallCart.quantity.match(/\d+/)[0]}" min="1" />
                            </div>

                            <div class="product-removal">
                                <button class="remove-product">
                                    Remove
                                </button>
                            </div>

                            <div class="product-total-price">
                            $15.00
                            </div>
            </div> `;
        
            var bigShoppingCartList = document.querySelector(".shopping-cart .products");
            
            bigShoppingCartList.appendChild(shoppingCartElement);
            

            });

          }

          function getProductFromDatabase(itemName) {

            // https://stackoverflow.com/a/16392802/9599554
            return products.filter(function(v) {
                return v.name === itemName;
            });

         

/* This was returning undefined 
            products.forEach(function(element) {
                console.log("METHOD");
                if(itemName === element.name) {
                    console.log("ITEM NAME", itemName);
                    console.log("ELEMENT", element.name);
                    console.log("RETURNING", element);
                    return element;
                }
              
            });
            */
          }
          
          
          var taxRate = 0.05;
          var shippingRate = 15.00;
          var fadeTime = 300;
          
          
          $(".shopping-cart").on('click', '.remove-product', function() {
              
              var priceOfItem = $(this).parents().eq(1).find('.product-price').text().replace("$", "");
           
            console.log("PRICE", priceOfItem);
            
            // remove the row
            
            // $(this).parents().eq(1).remove();
            
            // recalculateCart();

            var productRow = $(this).parents().eq(1);

            productRow.slideUp(fadeTime, function() {
                productRow.remove();
                recalculateCart();
              });
              

          });
          
          
          
          // detect change in input box
          $('.product-row input').on('input', function() {
            console.log("CHANING");
            
          //  console.log($(this).val());
            
            //console.log($(this).parents().eq(1));
            
            //console.log($(this).parents().eq(1).find('.product-price').text());
            
            // update the total product price
            var quantity = $(this).val();
            var productPrice = $(this).parents().eq(1).find('.product-price').text();
            var newProductRowPrice = quantity * productPrice;
            var productRow = $(this).parents().eq(1);
            
            // get the price of the product row where input was changed
            productRow.children('.product-total-price').each(function() {
              // $(this).fadeOut(fadeTime, function() {
              //    $(this).text(newProductRowPrice.toFixed(2));
              //     $(this).fadeIn(fadeTime);
              });
            
            console.log("DROPDOWN");
          
            productRow.children('.product-total-price').fadeOut(fadeTime, function() {
              $(this).text(newProductRowPrice.toFixed(2));
              $(this).fadeIn(fadeTime);
              recalculateCart();
            });
            
           console.log("RECALCULATING CART");
           
           
            //recalculateCart();
           
            
          //    // update totals
          //   var all = $(".product-total-price").map(function() {
          //     console.log("BEFORE ALL", this.innerHTML);
          //     return parseFloat(this.innerHTML);
          //   }).get();
            
          //   console.log("All", all)
           
          //  var subTotal = all.reduce((a,b) => a + b, 0);
            
          //  console.log("SUB TOTAL",  subTotal);
          
          //   var tax = subTotal * taxRate;
          //   var shipping = (subTotal > 0 ? shippingRate : 0);
          //   var total = subTotal + tax + shipping;
            
          //   // update totals 
          //   $('.final-amounts').fadeOut(fadeTime, function() {
          //     $('.subtotal-amount').text(subTotal.toFixed(2));
          //     $('.tax-amount').text(tax.toFixed(2));
          //     $('.shipping-amount').text(shipping.toFixed(2));
          //     $('.grand-total-amount').text(total.toFixed(2));
              
          //     if(total == 0) {
          //       $('.checkout-btn').fadeOut(fadeTime);
          //     } else {
          //       $('.checkout').fadeIn(fadeTime);
          //     }
              
          //     $('.final-amounts').fadeIn(fadeTime);
          //   });
            
            
          });
          
          function recalculateCart() {
            // update totals
            var all = $(".product-total-price").map(function() {
                console.log("THIS", this.innerHTML);
              return parseFloat(this.innerHTML.replace("$", ""));
            }).get();
           
            console.log("ALL", all);
            
           var subTotal = all.reduce((a,b) => a + b, 0);
            
           console.log("SUB TOTAL",  subTotal);
          
            var tax = subTotal * taxRate;
            var shipping = (subTotal > 0 ? shippingRate : 0);
            var total = subTotal + tax + shipping;
            
            // update totals 
            $('.final-amounts').fadeOut(fadeTime, function() {
              $('.subtotal-amount').text(subTotal.toFixed(2));
              $('.tax-amount').text(tax.toFixed(2));
              $('.shipping-amount').text(shipping.toFixed(2));
              $('.grand-total-amount').text(total.toFixed(2));
              
              if(total == 0) {
                $('.big-shopping-cart-checkout-btn-wrapper').fadeOut(fadeTime);
              } else {
                $('.big-shopping-cart-checkout-btn-wrapper').fadeIn(fadeTime);
              }
              $('.final-amounts').fadeIn(fadeTime);
            });
          }
    

          $('.big-shopping-cart-checkout-btn').on('click', function() {

            // get total price 
            var totalPrice = $('.grand-total-amount').text();
            var send = encodeURIComponent(JSON.stringify(totalPrice));
            var url = "file:///Users/LoganPhillips/Desktop/AdvancedWebDesign/ECommerceWebsite/checkout.html?total-price=" + send;        
            var element = document.getElementById('big-shopping-cart-checkout-btn-wrapper-link');
            element.setAttribute("href",url);


        });

    };

    if($('body').hasClass('CheckoutPage')) {
        var totalPrice = decodeURIComponent(GetURLParameter("total-price"));
        console.log("totalPrice", totalPrice);
        $('.checkout-total-price-summary').text("$"+totalPrice.replace(/"/g,""));

    }



    


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

    $('.checkout-btn').on('click', function() {
        //get form data

        //var value="hello";
        //var url = "file:///Users/LoganPhillips/Desktop/AdvancedWebDesign/ECommerceWebsite/review_order.html?source=" + value;        
        //var element = document.getElementById('checkout-btn-link');
        //element.setAttribute("href",url)


        // get all items from cart 
        

        

        var arrayToSend = getSmallCart();

        console.log("SENDING", arrayToSend);

        var arraySend = encodeURIComponent(JSON.stringify(arrayToSend));
        var url = "file:///Users/LoganPhillips/Desktop/AdvancedWebDesign/ECommerceWebsite/shopping_cart.html?data-array=" + arraySend;        
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
           
    
        // $(this).children().each(function (index, item) {
        //     console.log("CHILDREN2", $(this));

        //     console.log("ITEM", item);

        //     arrayToReturn.push({
        //         "name":item.name,
        //         "price": item.price,
        //         "quantity": item.quantity
        //     });
        //     console.log("ARRAY TO RETURN", arrayToReturn);
        // });

            
        });

        //console.log("ARRAY TO RETURN", arrayToReturn);

        return arrayToReturn;

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

//         console.log("filterValues", filterValues);
//         var list = $('.card');
        
//         $('.card').fadeOut("fast");

//          //$('.card').hide();

//         console.log("div[data-region*=" + filterValues + "]");
        
//         jQuery.each(filterValues, function(index, item) {
            
//             console.log( $(".products-grid").find("div[data-region*=" + item + "]"));
//             $(".products-grid").find("div[data-region*=" + item + "]").each(function (i) {
             
//                // $(this).show();
//                $(this).delay(200).slideDown("fast");
                
// 		    });
//         });
// // https://stackoverflow.com/a/24403771/9599554
//         if(!Array.isArray(filterValues) || !filterValues.length) {
//            console.log("No filters will be applied");
//            $(".products-grid").find(".card").each(function() {
//                 $(this).delay(200).slideDown("fast");
//            });
//         }


        // remove all elements, and then only add the ones we want to show

        // remove all items

        // find all objects with the filters

        $('.products-grid').empty();
        
        var results = [];

        jQuery.each(filterValues, function(indexInArray, value) {
            var tempResults = products.filter(obj => {
                // white space was making the strings not equal
                return obj.region.toLowerCase().replace(/\s/g,'') === value.replace(/\s/g,'');
            });
            results = results.concat(tempResults);
            console.log("FILTERS CONCAT", results);
        });

        // hide it so that we can apply an animation
        $('.products-grid').hide();
        applyFilters(results);
        // now show its
        $('.products-grid').delay(200).slideDown("fast");

        //https://stackoverflow.com/a/24403771/9599554
        if(!Array.isArray(filterValues) || !filterValues.length) {
           console.log("No filters will be applied");

           $('.products-grid').hide();
           applyFilters(products);
           $('.products-grid').delay(200).slideDown("fast");
        }

    }

    /*products.html*/



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



var applyFilters = function(array) {
    console.log("UPDATING PRODUCTS", array);
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




$(function() {
    generateProductsList();
});

/* review_order */

 function GetURLParameter(sParam) {
     var sPageURL = window.location.search.substring(1);
     var sURLVariables = sPageURL.split('&');
     for(var i = 0; i < sURLVariables.length; i++){
         var sParameterName = sURLVariables[i].split('=');
         if(sParameterName[0] == sParam) {
             return sParameterName[1];
         }
     }
 }

 (function() {
    var tech = GetURLParameter("blog");
    console.log(tech);
 });

// var init = function() {
//     alert("hi");
//     generateProductsList();
// }

// return {
//     init: init
// };

// shopping_cart.js




}); // end of $(document).ready

