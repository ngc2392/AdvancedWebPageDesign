$(document).ready(function() {
    recalculateCart();

 // get the data

    
  });
  
  var taxRate = 0.05;
  var shippingRate = 15.00;
  var fadeTime = 300;
  
  
  $(".shopping-cart").on('click', '.remove-product', function() {
      
      var priceOfItem = $(this).parents().eq(1).find('.product-price').text().replace("$", "");
   
    console.log("PRICE", priceOfItem);
    
    // remove the row
    $(this).parents().eq(1).remove();
    
    recalculateCart();
    
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
   
    setTimeout(function(){ recalculateCart(); }, 0);
    
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
      return parseFloat(this.innerHTML);
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
        $('.checkout-btn').fadeOut(fadeTime);
      } else {
        $('.checkout').fadeIn(fadeTime);
      }
      
      $('.final-amounts').fadeIn(fadeTime);
    });
  }