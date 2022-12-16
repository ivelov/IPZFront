<?php
require_once 'env.php';

if(isset($_POST['id'])){
    $mysqli = new mysqli("localhost", $GLOBALS['db_user'], $GLOBALS['db_pass'], $GLOBALS['db_name']);
    $result = $mysqli->query("SELECT * FROM products WHERE id=".$_POST['id']);

    if($result){
        if(mysqli_num_rows($result) > 0){
            $product = $result[0];

            $featuresFormated = [];
            $features = $mysqli->query("SELECT value, c.name FROM ((products a
                INNER JOIN values_of_characteristics b ON b.product_id = a.id) 
                INNER JOIN characteristics c ON b.characteristic_id = c.id)
                WHERE a.id={$product['id']}");

            if($features){
                foreach ($features as $feature) {
                    $featuresFormated[$feature['name']] = $feature['value'];
                };
            }
            echo json_encode([
                'name' => $product['name'],
                'price' => $product['price'],
                'image' => isset($product['image_link']) ? $product['image_link'] : 'img/home-cat__img.jpg',
                'features' => $featuresFormated
            ]);
        }else{
            http_response_code(422);
        }
    }else{
        http_response_code(500);
        echo mysqli_error($mysqli);
    }
}else{
    http_response_code(400);
    exit('Bad request');
}

?>