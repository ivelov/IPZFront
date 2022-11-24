<?php
if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $products = [
        ['name' => 'Комп1' , 'image' => 'img/home-cat__img.jpg', 'features'=>[
            'Процессор' => 'Amd',
            'Хз че ещё' => 'Не Amd',
        ]],
        ['name' => 'Комп2' , 'image' => 'img/home-cat__img.jpg', 'features'=>[
            'Процессор' => 'Amd',
            'Хз че ещё' => 'Не Amd',
        ]],
        ['name' => 'Комп3' , 'image' => 'img/home-cat__img.jpg', 'features'=>[
            'Процессор' => 'Amd',
            'Хз че ещё' => 'Не Amd',
        ]],
    ];
    
}else{
    
    if($_POST['sortType'] === 'ascending'){
        $products = [
            ['name' => 'Комп1' , 'image' => 'img/home-cat__img.jpg', 'features'=>[
                'Процессор' => 'Amd',
                'Хз че ещё' => 'Не Amd',
            ]],
            ['name' => 'Комп2' , 'image' => 'img/home-cat__img.jpg', 'features'=>[
                'Процессор' => 'Amd',
                'Хз че ещё' => 'Не Amd',
            ]],
            ['name' => 'Комп3' , 'image' => 'img/home-cat__img.jpg', 'features'=>[
                'Процессор' => 'Amd',
                'Хз че ещё' => 'Не Amd',
            ]],
        ];
    }else if($_POST['sortType'] === 'descending'){
        $products = [
            ['name' => 'Комп3' , 'image' => 'img/home-cat__img.jpg', 'features'=>[
                'Процессор' => 'Amd',
                'Хз че ещё' => 'Не Amd',
            ]],
            ['name' => 'Комп2' , 'image' => 'img/home-cat__img.jpg', 'features'=>[
                'Процессор' => 'Amd',
                'Хз че ещё' => 'Не Amd',
            ]],
            ['name' => 'Комп1' , 'image' => 'img/home-cat__img.jpg', 'features'=>[
                'Процессор' => 'Amd',
                'Хз че ещё' => 'Не Amd',
            ]],
        ];
    }
    
}

echo(json_encode($products));
?>