$(function() {
    $.get("back/categories.php",{},function(data){
    //  let js = JSON.parse(data);
      /*let categoriesHTML = '';
      for (const key in js) {
          categoriesHTML+= `<a href="" class="cat-name">
          <input type="checkbox"  class="cat-checkbox" name="${js[key].name}">
          ${js[key].name}
        </a><br>`;
          
      }
      document.getElementById('cat').innerHTML = categoriesHTML;*/
  })
  $.get("back/products.php",{},addProds)
  
  });
  

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

  function addProds(data){

    console.log(data);
    let js = JSON.parse(data);
      let productsHTML = '';
      for (const key in js) {
      console.log(js[key].image);

      productsHTML +=`<div class="home-product__item swiper-slide">
      <img src="${js[key].image}" alt="" class="home-product__img" />
      <h4 class="home-product__name">
        <a href="">${js[key].name}</a>
      </h4>
      <div class="home-product__table">
        <table>
            <tbody>`
          for (const featureName in js[key]['features']) {
          productsHTML += `
          <tr>
              <td>${featureName}</td>
              <td></td>
              <td>${js[key]['features'][featureName]}</td>
            </tr>`
          }
          productsHTML +=`
          </tbody>
                </table>
              </div>
              <div class="home-product__price-block">
                <div class="home-product__price">
                  <span class="home-product__price-new">${js[key].price}</span>
                </div>
              <div class="home-product__buttons">
                <a class="home-product__button button" href="product.php?id=${js[key].id}">Детальніше</a>
                <button class="button purchase" id="${js[key].id}">Придбати</button>
              </div>
            </div>
        </div>`;
        
      }
      

    document.getElementById('swiper-main').innerHTML = productsHTML;
    for (const key in js) {
      document.getElementById(js[key].id).addEventListener("click", 
      function(event){
        console.log(event.target.id);
  $.post("back/addToCart.php",{userId : getCookie('userID'), productId : event.target.id},function(data){console.log(data);})
      })}
  }

