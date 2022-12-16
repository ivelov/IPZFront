<?php
require_once 'env.php';

if(!isset($_POST['userId'])){
    http_response_code(400);
    exit;
}

$mysqli = new mysqli("localhost", $GLOBALS['db_user'], $GLOBALS['db_pass'], $GLOBALS['db_name']);
$results = $mysqli->query("SELECT b.name, b.image_link FROM products_in_cart a
INNER JOIN products b ON a.product_id = a.id)
WHERE user_id = {$_POST['userId']}");

$products = [];
foreach ($results as $product) {
    array_push($products, [
        'name' => $product['name'],
        'image' => $product['image_link']? $product['image_link'] : 'img/home-cat__img.jpg'
    ]);
}
echo(json_encode($products));
?>