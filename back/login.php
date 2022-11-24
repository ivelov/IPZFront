<?php
if($_POST['login'] === 'admin'  && $_POST['password'] === '123'){
    echo 1;
}else{
    echo 'Failure';
}
?>