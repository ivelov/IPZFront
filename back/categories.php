<?php
require_once 'env.php';

$mysqli = new mysqli("localhost", $GLOBALS['db_user'], $GLOBALS['db_pass'], $GLOBALS['db_name']);
$result = $mysqli->query("SELECT * FROM categories");

if($result){
    $categories = [];
    foreach ($result as $category) {
        array_push($categories, [
            'name' => $category['name'],
            'image' => isset($category['image']) ? $category['image'] : '',
        ]);
    }
    var_dump(json_encode($categories));
}else{
    http_response_code(500);
    echo mysqli_error($mysqli);
}


?>