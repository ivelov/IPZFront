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

  function addProds(data){
    let js = JSON.parse(data);
      let productsHTML = '';
      for (const key in js) {
      productsHTML +=`<div class="home-product__item swiper-slide">
      <img src="img/home-cat__img.jpg" alt="" class="home-product__img" />
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
                <a class="home-product__button button" href="/it-block/product.php?id=Комп1">Детальніше</a>
                <button class="button">Придбати</button>
              </div>
            </div>
        </div>`;
      }
    document.getElementById('swiper-main').innerHTML = productsHTML;
  }

  