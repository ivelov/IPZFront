document.getElementById("reg-form").addEventListener("submit", function (event){
    event.preventDefault();
    const form = document.getElementById("reg-form"); 
    console.dir(form);
    let inputs = document.getElementsByClassName("reg-form__input");
    let data = {};
    for(let i = 0; i<inputs.length;i++){
        data[inputs[i].name] = inputs[i].value;
    }
    
    $.post("back/register.php",data,function (data) {
        console.log(data);
    });
    form.reset();
})

document.getElementById("sign-in").addEventListener("submit", function (event){
    event.preventDefault();
    const form = document.getElementById("sign-in"); 
    console.dir(form);
    let inputs = document.getElementsByClassName("sign-in-form__input");
    let data = {};
    for(let i = 0; i<inputs.length;i++){
        data[inputs[i].name] = inputs[i].value;
    }
    console.log(data);
    
    $.post("back/login.php",data,function (data) {
        console.log(data);
        if(data != 'Failure'){
            document.cookie = 'userID='+data;
            console.log(document.cookie);
            location.reload();
        }
    });
    form.reset();
})

document.getElementById("enter-btn").addEventListener("click", function (){
    document.cookie = 'userID=;Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log(document.cookie);
    location.reload();
})

    
$(function() {
    if(document.cookie.indexOf('userID') != -1){
        
        let enterBtn = $('#enter-btn').html();
        $('#enter-btn').html('Вийти');
    }else{
        $('.enter-btn').html();
    }
})

