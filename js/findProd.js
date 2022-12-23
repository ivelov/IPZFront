function searchProd() {
    let id = document.getElementById("search").value;
    console.log(id);
    location.href='http://localhost:3000/xampp/htdocs/it-block/product.php?id='+ id;
}

