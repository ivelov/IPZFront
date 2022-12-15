<?php
require_once 'env.php';

if(isset($_POST['login']) && isset($_POST['password'])){
    $mysqli = new mysqli("localhost", $GLOBALS['db_user'], $GLOBALS['db_pass'], $GLOBALS['db_name']);
    $result = $mysqli->query("SELECT id FROM users WHERE login='{$_POST['login']}' AND password='{$_POST['password']}'");

    if($result){
        if(mysqli_num_rows($result) > 0){
            echo $result[0]['id'];
        }else{
            echo 'Failure';
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