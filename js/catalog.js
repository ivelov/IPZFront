$(function() {
  $.get("back/categories.php",{},function(data){
    let js = JSON.parse(data);
    let categoriesHTML = '';
    for (const key in js) {
        categoriesHTML+= `<a href="" class="cat-name">
        <input type="checkbox"  class="cat-checkbox" name="${js[key].name}">
        ${js[key].name}
      </a><br>`;
        
    }
    document.getElementById('cat').innerHTML = categoriesHTML;
})
$.get("back/products.php",{},addProds)
$(".ascending:first").on( "click", sort)
$(".descending:first").on( "click", sort)
$(".apply_filter").on("click", applyFilter)
});

function addProds(data){
  let js = JSON.parse(data);
    let productsHTML = '';
    for (const key in js) {
    productsHTML+=`<div class="catalog__item">
    <img src="img/home-cat__img.jpg" alt="" class="catalog__img" />
    <h4 class="catalog__name">
      <a href="">${js[key].name}</a>
    </h4>
    <div class="catalog__table">
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
    <div class="catalog__price-block">
      <div class="catalog__price">
        <span class="catalog__price-old">${js[key].price}</span>
        <span class="catalog__price-new">22903 грн</span>
      </div>

    </div>
    <div class="catalog__buttons">
      <a class="catalog__button button">Детальніше</a>
      <button class="button">Придбати</button>
    </div>
  </div>`;
    }
  document.getElementById('prod').innerHTML = productsHTML;
}
function sort(event){
  $.post("back/products.php",{sortType: event.target.classList[1]},addProds)
}

function applyFilter(){
  let cats = document.getElementsByClassName('cat-checkbox');
  let data = {
    filters : {}
  };
  for(let i = 0; i<cats.length; i++){
    if(cats[i].checked){
       data.filters[i]= cats[i].name;
  }
  }
  console.log(data);
  
  $.post("back/products.php",data)

}
  




