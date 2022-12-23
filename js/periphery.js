$(function() {
    $.get("back/categories.php",{},function(data){
      let js = JSON.parse(data);
      let peripheryHTML = '';
      for (const key in js) {
        peripheryHTML+= `<div class="devices__item">
        <a href="catalog.php?id=${js[key].id}">
          <img src="${js[key].image}" alt="" class="devices__img" />
          <span class="devices__name">${js[key].name}</span>
        </a>
      </div>`;
          
      }
      document.getElementById('devices').innerHTML = peripheryHTML;
  })
  });