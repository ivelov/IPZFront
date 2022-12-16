<?php
require_once 'env.php';

if(!isset($_POST['category'])){
    http_response_code(400);
    exit;
}

$mysqli = new mysqli("localhost", $GLOBALS['db_user'], $GLOBALS['db_pass'], $GLOBALS['db_name']);
$characteristics = $mysqli->query("SELECT * FROM characteristics WHERE category_id = ".$_POST['category']);

$filters = [];
foreach ($characteristics as $characteristic) {
    $valuesOfCharacteristic = $mysqli->query("SELECT * FROM values_of_characteristics WHERE characteristic_id = ".$characteristic['id']);
    $values = [];
    foreach ($valuesOfCharacteristic as $value) {
        array_push($values, $value['value']);
    }

    $filters[$characteristic['name']] = $values;
}

echo(json_encode($filters));
?>