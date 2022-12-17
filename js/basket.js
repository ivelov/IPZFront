
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
$(function(){
    $.post("back/cart.php",{userId : getCookie('userID')},function(data){
        let js = JSON.parse(data);
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
              <ul class="trash__pic">
                <li class="trash__button">
                    <button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0)">
                      <path d="M15.3104 8.69531C15 8.69531 14.7484 8.94692 14.7484 9.25737V19.8803C14.7484 20.1906 15 20.4424 15.3104 20.4424C15.6209 20.4424 15.8725 20.1906 15.8725 19.8803V9.25737C15.8725 8.94692 15.6209 8.69531 15.3104 8.69531Z" fill="#484D59"></path>
                      <path d="M8.67815 8.69531C8.3677 8.69531 8.11609 8.94692 8.11609 9.25737V19.8803C8.11609 20.1906 8.3677 20.4424 8.67815 20.4424C8.9886 20.4424 9.24021 20.1906 9.24021 19.8803V9.25737C9.24021 8.94692 8.9886 8.69531 8.67815 8.69531Z" fill="#484D59"></path>
                      <path d="M3.84445 7.14454V20.9925C3.84445 21.811 4.14458 22.5797 4.66887 23.1312C5.19075 23.6842 5.91704 23.9982 6.67714 23.9995H17.3115C18.0718 23.9982 18.7981 23.6842 19.3197 23.1312C19.844 22.5797 20.1442 21.811 20.1442 20.9925V7.14454C21.1864 6.8679 21.8617 5.86103 21.7223 4.79158C21.5827 3.72235 20.6717 2.92251 19.5933 2.92229H16.7156V2.21972C16.7189 1.6289 16.4853 1.06157 16.067 0.644197C15.6488 0.227044 15.0806 -0.00524463 14.4898 -0.000414431H9.49885C8.90803 -0.00524463 8.33982 0.227044 7.92157 0.644197C7.50332 1.06157 7.26971 1.6289 7.27301 2.21972V2.92229H4.39531C3.31686 2.92251 2.40593 3.72235 2.26629 4.79158C2.12687 5.86103 2.80222 6.8679 3.84445 7.14454ZM17.3115 22.8754H6.67714C5.71615 22.8754 4.96857 22.0499 4.96857 20.9925V7.19394H19.02V20.9925C19.02 22.0499 18.2725 22.8754 17.3115 22.8754ZM8.39713 2.21972C8.39339 1.92705 8.50844 1.64537 8.71614 1.43876C8.92362 1.23216 9.20596 1.11865 9.49885 1.1237H14.4898C14.7826 1.11865 15.065 1.23216 15.2725 1.43876C15.4802 1.64515 15.5952 1.92705 15.5915 2.21972V2.92229H8.39713V2.21972ZM4.39531 4.04641H19.5933C20.1521 4.04641 20.605 4.49935 20.605 5.05812C20.605 5.61688 20.1521 6.06982 19.5933 6.06982H4.39531C3.83654 6.06982 3.3836 5.61688 3.3836 5.05812C3.3836 4.49935 3.83654 4.04641 4.39531 4.04641Z" fill="#484D59"></path>
                      <path d="M11.9943 8.69531C11.6839 8.69531 11.4323 8.94692 11.4323 9.25737V19.8803C11.4323 20.1906 11.6839 20.4424 11.9943 20.4424C12.3048 20.4424 12.5564 20.1906 12.5564 19.8803V9.25737C12.5564 8.94692 12.3048 8.69531 11.9943 8.69531Z" fill="#484D59"></path>
                      </g>
                      <defs>
                      <clipPath id="clip0">
                      <rect width="24" height="24" fill="white"></rect>
                      </clipPath>
                      </defs>
                      </svg>
                    </button>
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
            renderCart();
            allPrices = allPrices + cart[id]["startPrice"];
            document.getElementById('allPrices').innerHTML = allPrices;
        }
        
        const minusFunc = id =>{
            change(-1);
            if(cart[id]["count"]-1 == 0){
                deleteFunc(id);
                return true;
            }
            cart[id]["count"]--;
            cart[id]["price"] = cart[id]["startPrice"]*cart[id]["count"];
            renderCart();
            allPrices = allPrices - cart[id]["startPrice"];
            document.getElementById('allPrices').innerHTML = allPrices;
        }
        
        const deleteFunc = id =>{
                delete cart[id];
                renderCart();
        }
        
        const renderCart = () =>{
            
        }
        
        renderCart();
    });
})
