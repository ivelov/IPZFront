<?php
require_once 'env.php';
if(isset($_POST['password']) && isset($_POST['login']) && isset($_POST['email'])){
    if(strlen($_POST['password']) < 6 ){
        http_response_code(400);
        exit('Minimal password length is 6 symbols');
    }else if(strlen($_POST['login']) < 4){
        http_response_code(400);
        exit('Minimal login length is 4 symbols');
    }else if(strlen($_POST['email']) < 5){
        http_response_code(400);
        exit('Minimal email length is 5 symbols');
    }else{
        register();
    }
}else{
    http_response_code(400);
    exit('Bad request');
}
function register(){
    
    $mysqli = new mysqli("localhost", $GLOBALS['db_user'], $GLOBALS['db_pass'], $GLOBALS['db_name']);

    $result = $mysqli->query("INSERT INTO users (login, password, email) VALUES ('{$_POST['login']}', '{$_POST['password']}', '{$_POST['email']}')");
    if($result){
        echo 'OK';
    }else{
        http_response_code(500);
        echo mysqli_error($mysqli);
    }
}
?>