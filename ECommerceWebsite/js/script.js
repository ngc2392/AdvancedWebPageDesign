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
            "description": "Rich and Intense with a swet outline.  From Africa",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg"
        }, {
            "id": 8,
            "name":"Brown Gold",
            "region": "South America",
            "roast_level": "Light",
            "price": "27.22",
            "description": "Rich and Intense with a swet outline.  From Africa",
            "weights": "12oz, 3lb, 5lb",
            "img_url": "https://www.drivencoffee.com/wp-content/uploads/2016/03/Scandinavian-Blend-coffee.jpg"
        }, {
            "id": 9,
            "name":"La Crema",
            "region": "South America",
            "roast_level": "Light",
            "price": "27.22",
            "description": "Rich and Intense with a swet outline.  From Africa",
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
        $(".DropDown_Page_Wrapper .products-grid").on("click", "div.add_to_cart_btn", function() {
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
    
    
        // https://codepen.io/adrianparr/pen/Eoydz
        // https://codepen.io/NickyCDK/pen/lhaiz?editors=1010
        function filterProducts(filterValue) {
            // need to delete all products and insert them back in.  If not, they don't position correctly.  The just stay in their original place.
            $('.products-grid').empty();
        
            var results = [];
    
            console.log("FILTER VALUes", filterValue);

            var tempResults = products.filter(obj => {
                
                // white space was making the strings not equal
                //return obj.region.toLowerCase().replace(/\s/g,'') === value.replace(/\s/g,'');
                return obj.region.toLowerCase().replace(/\s/g,'') === filterValue.toLowerCase().replace(/\s/g,'') 
            });

            console.log("DROP DOWN RESULT", tempResults);
           
            // hide it so that we can apply an animation
            $('.products-grid').hide();
            applyFilters(tempResults);
            // now have filtered products show up
            $('.products-grid').delay(200).slideDown("fast");
    
            //https://stackoverflow.com/a/24403771/9599554
            // show everything

            if(filterValue === "ALL") {
                console.log("No filters will be applied");
                $('.products-grid').hide();
                applyFilters(products);
                $('.products-grid').delay(200).slideDown("fast");
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
        console.log("SENDING THE FOLLOWING", array);
        generateProductsList(array);
    };
    
    
    $(function() {
        generateProductsList(products);
    });
    
    }


   

    if($('body').hasClass('ShoppingCartPage')) {

        function initializeBigShoppingCart () {
            var productsFromSmallShoppingCart = JSON.parse(decodeURIComponent(GetURLParameter("data-array")));
        
            $(productsFromSmallShoppingCart).each(function(index, itemFromSmallCart) {
                // console.log("JSON", itemFromSmallCart);

                // should probably be searching by id
                var productFromDatabase = getProductFromDatabase(itemFromSmallCart.name)[0];
                console.log("PRODUCT FROM DATABASE", productFromDatabase);

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

        
            // get the div where the items will be stored on the page
            var bigShoppingCartList = document.querySelector(".shopping-cart .products");
            
            // append to div that will hold all current items in the shopping cart 
            bigShoppingCartList.appendChild(shoppingCartElement);
            });
          }

        $(document).ready(function() {
            //initilalize shopping cart page
            initializeBigShoppingCart();
    
            // fill in total-item-price for each row in big shopping cart
            $('.products').children().each(function(index, item) {
                // product-row, find .product-price in the children
                var itemPrice = $(item).children().children().eq(2).text().replace("$", "");
                var quantity = $(item).children().children().eq(3).children().val();
                var totalItemPrice = parseFloat(itemPrice) * parseFloat(quantity);
                $(item).children().children().eq(5).text("$"+totalItemPrice);
            });
            recalculateBigShoppingCart()
          });


          function getProductFromDatabase(itemName) {
            // https://stackoverflow.com/a/16392802/9599554
            return products.filter(function(v) {
                return v.name === itemName;
            });
          }
        
            //remove item from big shopping cart page 
          $(".shopping-cart").on('click', '.remove-product', function() {
              
              var priceOfItem = $(this).parents().eq(1).find('.product-price').text().replace("$", "");
           
            console.log("PRICE", priceOfItem);
            
            var productRow = $(this).parents().eq(1);

            productRow.slideUp(fadeTime, function() {
                productRow.remove();
                recalculateBigShoppingCart()
              });
              

          });
          
          
          
          // detect change in input box
          // shopping-cart.html
          //$('.product-row input').on('input', function() {
        $('body').on('change', '.product-row input', function() {
  
            // update the total product price
            var quantity = $(this).val();
            console.log("QUANTITY", quantity);
            var productPrice = $(this).parents().eq(1).find('.product-price').text().replace("$", "");
            var newProductRowPrice = parseInt(quantity) * parseInt(productPrice);
            console.log("NEW PRODUCT ROW PRICE", newProductRowPrice);
            var productRow = $(this).parents().eq(1);
                    
            productRow.children('.product-total-price').fadeOut(fadeTime, function() {
              $(this).text(newProductRowPrice.toFixed(2));
              $(this).fadeIn(fadeTime);
              recalculateBigShoppingCart()
            });
          });
          
          //recalculateBigShoppingCart()
          function recalculateBigShoppingCart() {

            var taxRate = 0.05;
            var shippingRate = 15.00;
           
            // get all prices in shopping cart 
            var all = $(".product-total-price").map(function() {
                console.log("THIS", this.innerHTML);
              return parseFloat(this.innerHTML.replace("$", ""));
            }).get();
                       
            // add up all the prices
           var subTotal = all.reduce((a,b) => a + b, 0);
            
        //    console.log("SUB TOTAL",  subTotal);
          
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
    

          // send data to payment page 
          $('.big-shopping-cart-checkout-btn').on('click', function() {

            // get total price 
            var totalPrice = $('.grand-total-amount').text();
            var send = encodeURIComponent(JSON.stringify(totalPrice));
            //var url = "file:///Users/LoganPhillips/Desktop/AdvancedWebDesign/ECommerceWebsite/checkout.html?total-price=" + send;        
            var url = "./checkout.html?total-price=" + send;   
            var element = document.getElementById('big-shopping-cart-checkout-btn-wrapper-link');
            element.setAttribute("href",url);


        });

    }; // end of shopping cart.html

    if($('body').hasClass('CheckoutPage')) {

        $(document).ready(function() {
            var totalPrice = decodeURIComponent(GetURLParameter("total-price"));
            console.log("totalPrice", totalPrice);
            $('.checkout-total-price-summary').text("$"+totalPrice.replace(/"/g,""));
        });

        //masks

        // https://unmanner.github.io/imaskjs/
        
        const billingInfoPhoneNumber = document.getElementById('billing-info-phone-number');
        
        const cardNameElement = document.getElementById('payment-form-name');
        const cardNumberElement = document.getElementById('payment-card-number');
        const expirationDateElement = document.getElementById('payment-expiration');
        const securityCodeElement = document.getElementById('payment-security-code');

        var billingInfoPhoneNumberMask = new IMask(billingInfoPhoneNumber, {
            mask: '+{7}(000)000-0000'
        });

        // https://stackoverflow.com/questions/4244109/regular-expression-to-accept-only-characters-a-z-in-a-textbox
        var cardNameMask = new IMask(cardNameElement, {
            mask: /^[a-zA-Z]+$/
        });

        var cardNumberMask = new IMask(cardNumberElement, {
            mask: '0000 0000 0000'
        });

        var expirationDateMask = new IMask(expirationDateElement, {
            mask: 'MM{/}YY',
            blocks: {
                YY: {
                    mask: IMask.MaskedRange, 
                    from: 0,
                    to: 99
                }, 

                MM: {
                    mask: IMask.MaskedRange,
                    from: 1, 
                    to: 12
                }
            }
          
        });

        var securityCodeMask = new IMask(securityCodeElement, {
            mask: '000'
        });

        // check for empty fields 
        $('#final-checkout-btn-wrapper-link').on('click', function() {

            // can add each empty class name to array and tell the user exactly which ones are empty 


            var shippingInfoFirstName = $('.shippingInfoForm .first_name_box input').val();
            var shippingInfoLastName = $('.shippingInfoForm .last_name_box input').val();
            var shippingInfoPhone = $('.shippingInfoForm .phone_box input').val();
            var shippingInfoAddress  = $('.shippingInfoForm .address_box input').val();

            var billingInfoFirstName = $('.billingInfoForm .first_name_box input').val();
            var billingInfoLastName = $('.billingInfoForm .last_name_box input').val();
            var billingInfoPhone = $('.billingInfoForm .phone_box input').val();
            var billingInfoAddress  = $('.billingInfoForm .address_box input').val();

            var creditCardFullName = $("#payment-form-name").val();
            var creditCardNumber = $("#payment-card-number").val();
            var creditCardExpiration = $("#payment-expiration").val();
            var creditCardCVV = $("#payment-security-code").val();

            // check for empty fields in shipping info
            if(!shippingInfoFirstName || !shippingInfoLastName || !shippingInfoPhone || !shippingInfoAddress 
                || !billingInfoFirstName || !billingInfoLastName || !billingInfoPhone || !billingInfoAddress || !creditCardFullName
                || !creditCardNumber || !creditCardExpiration || !creditCardCVV) {
                    alert("Please make sure all fields are filled in.");
                    return false;
                } else {
                    //alert("SUCCESS");
                }

    

            // check for empty fields in billing info

            // check for empty fields in payment info

              //  alert(shippingInfoFirstName + " " + shippingInfoLastName + " " + shippingInfoPhone + " " + shippingInfoAddress);

               // alert(billingInfoFirstName + " " + billingInfoLastName + " " + billingInfoPhone + " " + billingInfoAddress);
                
               // alert(creditCardFullName + " " + creditCardNumber + " " + creditCardCVV);
                
        });

 
    } // end of checkout page 


    if($('body').hasClass('Products_Page_Wrapper')) {
       
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


// review_order 
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

}); // end of $(document).ready

