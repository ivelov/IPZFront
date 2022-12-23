<?php
require_once 'env.php';

function index($page = 1){

    $mysqli = new mysqli("localhost", $GLOBALS['db_user'], $GLOBALS['db_pass'], $GLOBALS['db_name']);

    $queryString = "SELECT a.id, a.name, a.price FROM products a 
        INNER JOIN categories b ON a.category_id = b.id";
    
    $whereWord = 'WHERE';

    if(isset($_POST['filters'])){
        $filters = $_POST['filters'];
    }else{
        $filters = false;
    }
    /*$filters = [
        'priceLow' => 1000,
        'priceHigh' => 4000,
        'Cores' => '2',
        'Частота' => '3ГГц'
    ];*/

    if($filters){
        foreach ($filters as $filterName => $filter) {
            if($filterName == 'priceLow'){
                $queryString .= " $whereWord a.price >= $filter";
            }else if($filterName == 'priceHigh'){
                $queryString .= " $whereWord a.price <= $filter";
            }else{
                continue;
            }

            unset($filters[$filterName]);

            if($whereWord === 'WHERE'){
                $whereWord = 'AND';
            }
        }
    }

    if(isset($_POST['category'])){
        $queryString .= " $whereWord b.id = '{$_POST['category']}'";
        if($whereWord === 'WHERE'){
            $whereWord = 'AND';
        }
    }
    
    if(isset($_POST['keyword'])){
        $queryString .= " $whereWord a.name LIKE '%{$_POST['keyword']}%'";
        if($whereWord === 'WHERE'){
            $whereWord = 'AND';
        }
    }

    $queryString .= " LIMIT ".($page - 1).", 10";
    $products = $mysqli->query($queryString);
    
    if($products){
        $productsFormated = [];
        foreach ($products as $product) {
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
            $allowAdd = true;
            if($filters){
                foreach ($filters as $filterName => $filter) {
                    $matched = false;
                    foreach ($featuresFormated as $featureName => $feature) {
                        if($featureName == $filterName ){
                            foreach ($filter as $filterValue) {
                                if($filterValue == $feature){
                                    $matched = true;
                                    break;
                                }
                            }
                            if($matched){
                                break;
                            }
                        }
                    }
                    if(!$matched){
                        $allowAdd = false;
                        break;
                    }
                }
            }
            if(!$allowAdd){
                continue;
            }
            array_push($productsFormated, [
                'id' => $product['id'],
                'name' => $product['name'],
                'price' => $product['price'],
                'image' => isset($product['image_link']) ? $product['image_link'] : 'img/home-cat__img.jpg',
                'features' => $featuresFormated
            ]);
        }
        echo(json_encode($productsFormated));
    }else{
        http_response_code(500);
        echo mysqli_error($mysqli);
    }
}

if(isset($_POST['page'])){
    index($_POST['page']);
}else{
    index();
}

?>