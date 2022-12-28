$(function () {
  $.post("back/filters.php", {
    category: id
  }, function (data) {
    let js = JSON.parse(data);
    let categoriesHTML = '';
    for (const key in js) {
      categoriesHTML += `
      <div class="catalog__cont">
      <div class="catalog__option">
                  <h4 class="catalog__sub-title">${key}</h4>
                  <svg class="catalog__svg" height="16" width="16">
                    <use
                      xlink:href="#icon-angle-left"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <svg viewBox="0 0 24 24" id="icon-angle-left">
                        <path
                          clip-rule="evenodd"
                          d="m16.726 21.6877c-.3799.401-1.0128.4181-1.4137.0383l-10.26633-9.726 10.26633-9.72595c.4009-.37984 1.0338-.36273 1.4137.0382.3798.40094.3627 1.03387-.0383 1.4137l-8.73367 8.27405 8.73367 8.274c.401.3799.4181 1.0128.0383 1.4137z"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </use>
                  </svg>
                  </div>
                  <div class="catalog__desc" id="cat">`;

      js[key].forEach(el => {
        categoriesHTML += `
        <a href="" class="cat-name">
        <input type="checkbox"  class="cat-checkbox" name="${key}" data-value="${el}">
        ${el}
      </a><br>`;
      });
      categoriesHTML += `</div>
      </div>`;
    }
    document.getElementById('characteristic_name').innerHTML = categoriesHTML;
  })
  $.post("back/products.php", {
    category: id
  }, addProds)
  $(".ascending:first").on("click", sort)
  $(".descending:first").on("click", sort)
  $(".apply_filter").on("click", applyFilter)
});

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
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

function addProds(data) {
  
  let js = JSON.parse(data);
  let productsHTML = '';
  
  for (const key in js) {
    productsHTML += `<div class="catalog__item">
    <img src="${js[key].image}" alt="" class="catalog__img" />
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
    productsHTML += `
        </tbody>
      </table>
    </div>
    <div class="catalog__price-block">
      <div class="catalog__price">
        <span class="catalog__price-new">${js[key].price} грн</span>
      </div>

    </div>
    <div class="catalog__buttons">
      <a class="catalog__button button" href="product.php?id=${js[key].id}">Детальніше</a>
      <button class="button purchase" id="${js[key].id}">Придбати</button>
    </div>
  </div>`;
  }
  document.getElementById('prod').innerHTML = productsHTML;
  for (const key in js) {
    document.getElementById(js[key].id).addEventListener("click", function (event) {
      console.log(event.target.id);
      $.post("back/addToCart.php", {
        userId: getCookie('userID'),
        productId: event.target.id
      }, function (data) {})
    })
  }

}

function sort(event) {
  $.post("back/products.php", {
    category: id,
    sortType: event.target.classList[1]
  }, addProds)
}



function applyFilter() {
  let cats = document.getElementsByClassName('cat-checkbox');
  let data = {
    filters: {}
  };
  for (let i = 0; i < cats.length; i++) {
    if (cats[i].checked) {
      if (data.filters[cats[i].name]) {
        data.filters[cats[i].name].push(cats[i].dataset.value);
      } else {
        data.filters[cats[i].name] = [];
        data.filters[cats[i].name].push(cats[i].dataset.value);
      }
    }
  }
  data.filters.priceLow = document.getElementById('min-price-value').value;
  data.filters.priceHigh = document.getElementById('max-price-value').value;
  data.category = id;
  $.post("back/products.php", data, addProds)

}