
document.querySelector(".info-form").addEventListener("submit", function (event){
    event.preventDefault();
    const form = document.querySelector(".info-form"); 
    console.dir(form);
    let inputs = document.getElementsByClassName("info-form__input");
    let data = {};
    for(let i = 0; i<inputs.length;i++){
        data[inputs[i].name] = inputs[i].value;
    }
    
    $.post("back/basket.php",data);
    form.reset();
})

    