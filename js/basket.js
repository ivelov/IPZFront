
document.querySelector(".info-form").addEventListener("submit", function (event){
    event.preventDefault();
    const form = document.querySelector(".info-form"); 
    console.dir(form);
    let inputs = document.getElementsByClassName("info-form__input");
    let data = {};
    for(let i = 0; i<inputs.length;i++){
        data[inputs[i].name] = inputs[i].value;
    }
    
    $.post("back/basket.php",data);
    form.reset();
})

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  let allPrices = 0;
  function renderCart(){
      $.post("back/cart.php",{userId : getCookie('userID')},function(data){
          let js = JSON.parse(data);
          console.log(js);
          let cart = {};
          let cartProdHTML = '';
          
          for (const key in js) {
              js[key].price = parseInt(js[key].price);
              allPrices += js[key].price;
              cartProdHTML+= `
                <div class="product__wrapper_main">
                  <ul>
                    <li class="product__wrapper">
                        <img class="product__image" src="${js[key].image}">
                    </li>
                    <li class="name quantity">
                      <div><a href="product.html" class="product__text">${js[key].name}</a></div>
                      <div class="quantity__wrapper">
                        <span class=increase-button__wrapper><button class="minus" data-id="${js[key].id}">-</button></span>
                        <input type="number" value="1" id="number">
                        <span class=decrease-button__wrapper><button class="plus" data-id="${js[key].id}">+</button></span>
                        <ul class="price__wrapper">
                          <li class="price__text">Ціна</li>
                          <li class="price__num">${js[key].price} грн</li>
                        </ul>
                        
                      </div>
                      </li>  
                </ul>
                </div>
                </div>
                      `
               cart[js[key].id] = {
                  "startPrice" : js[key].price,
                  "price" : js[key].price,
                  "count" : 1,
              }
                  
          }
          cartProdHTML +=`
          <label>Ціна до сплати:</label>
          <p id="allPrices">${allPrices}</p>`;
          
  
          document.getElementById('cartProds').innerHTML = cartProdHTML;
          
  
  
          var el = $('#number');
          function change(v){
              var upd = +el.val()+v;
              el.val( upd>0 ? upd : 0);    
            };
          
          document.onclick = event  =>{
              if(event.target.classList.contains('plus'))
                  plusFunc(event.target.dataset.id)
              if(event.target.classList.contains('minus'))
                  minusFunc(event.target.dataset.id)
            }
          
          const plusFunc = id =>{
              cart[id]["count"]++;
              cart[id]["price"] = cart[id]["startPrice"]*cart[id]["count"];   
              change(1);
              allPrices = allPrices + cart[id]["startPrice"];
              document.getElementById('allPrices').innerHTML = allPrices;
              console.log(cart[id]);
          }
          
          const minusFunc = id =>{
              change(-1);
              
              
              cart[id]["count"]--;
              cart[id]["price"] = cart[id]["startPrice"]*cart[id]["count"];
              allPrices = allPrices - cart[id]["startPrice"];
              document.getElementById('allPrices').innerHTML = allPrices;
              if(cart[id]["count"] <= 0){
                deleteFunc(id);
                deleteProd(id);
                return true;
              }
          }
          
          const deleteFunc = id =>{
                  delete cart[id];
                  //console.log(cart[id]);
          
          }
  
          const deleteProd = id =>{
            $.post("back/deleteFromCart.php",{productId : id,userId : getCookie('userID')},function(data){
              renderCart();
            });
          }
  
     
      });   
  }
$(function(){renderCart();})
