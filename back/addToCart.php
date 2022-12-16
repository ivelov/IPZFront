<?php
require_once 'env.php';

if(!isset($_POST['productId']) || !isset($_POST['userId'])){
    http_response_code(400);
    exit;
}

$mysqli = new mysqli("localhost", $GLOBALS['db_user'], $GLOBALS['db_pass'], $GLOBALS['db_name']);
$result = $mysqli->query("INSERT INTO products_in_cart (product_id, user_id) VALUES ('{$_POST['productId']}', '{$_POST['userId']}')");

if($result){
    echo 'OK';
}else{
    http_response_code(500);
    echo mysqli_error($mysqli);
}

?>