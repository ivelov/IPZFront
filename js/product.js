$.post("back/products.php", {}, )

function setGallery(data) {
  let js = JSON.parse(data);
  let productIMG = '';
  for (const key in js) {
    productIMG += `
        <a href="${js[key].image}" class="product__big">
            <img src="${js[key].image}" class="product__big" />
        </a>`;
  }
  document.getElementById('gallery').innerHTML = productIMG;
}

function setProdDescr(data) {
  let js = JSON.parse(data);
  let productNameHTML = '';

  productNameHTML += `<h2 class="product__title">
      ${js.name}
      </h2>`;
  document.getElementById('prod_name').innerHTML = productNameHTML;


  let productAttrHTML = '';
  productAttrHTML += `<tbody>`;
  for (const featureName in js['features']) {

    productAttrHTML += `
          <tr class="product__attr-item">
          <td>${js[featureName]}</td>
          <td>${js['features'][featureName]}</td>
        </tr>`;
  }
  productAttrHTML += `
        </tbody>`;

        
  document.getElementById('prod_attr').innerHTML = productAttrHTML;
}


function setFeatures(data) {
  setGallery(data);
  setProdDescr(data);

  let js = JSON.parse(data);
  let featuresHTML = '';

  featuresHTML += `
      <thead>
          <tr>
          <td colspan="2" class="strong"><strong>${js.name}</strong></td>
        </tr>
      </thead>
      <tbody>`;
  for (const featureName in js['features']) {
    featuresHTML += `
        <tr>
          <td>${js[featureName]}</td>
          <td>${js['features'][featureName]}</td>
        </tr>`
  }
  featuresHTML += `
        </tbody>
        `;
  document.getElementById('features').innerHTML = featuresHTML;

}

function getProd(id) {
  $.post("back/products.php", {
    id: id
  }, setFeatures)
}