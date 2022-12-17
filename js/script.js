

let basket = document.querySelector(".header__basket");
let basketDropdown = document.querySelector(".basket__dropdown");
let header = document.querySelector(".header");

const toggleMenu = () => {
  basketDropdown.classList.toggle("basket__dropdown_active");
};

basket.addEventListener("click", (e) => {
  e.stopPropagation();

  toggleMenu();
});

document.addEventListener("click", (e) => {
  let target = e.target;
  let its_menu = target == basketDropdown || basketDropdown.contains(target);
  let its_hamburger = target == basket;
  let menu_is_active = basketDropdown.classList.contains(
    "basket__dropdown_active"
  );

  if (!its_menu && !its_hamburger && menu_is_active) {
    toggleMenu();
  }
});

const burgerBtn = document.querySelector(".burger-btn");
const headerMenu = document.querySelector(".header__menu");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("burger-btn_active");
  headerMenu.classList.toggle("header__menu_active");
});

function initTab(elem) {
  //addEventListener on mouse click
  document.addEventListener("click", function (e) {
    //check is the right element clicked
    if (!e.target.matches(elem + " .t-btn")) return;
    else {
      if (!e.target.classList.contains("active")) {
        //if option true remove active class from all other t-btn and t-panel
        findActiveElementAndRemoveIt(elem + " .t-btn");
        findActiveElementAndRemoveIt(elem + " .t-panel");

        //add active class on clicked tab
        e.target.classList.add("active");

        setTimeout(function () {
          var panel = document.querySelectorAll(
            elem + " .t-panel." + e.target.dataset.name
          );
          Array.prototype.forEach.call(panel, function (el) {
            //add active class on right t-panel after 200ms because of the smooth animation
            el.classList.add("active");
          });
        }, 200);
      }
    }
  });
}

//if option true remove active class from added element
function findActiveElementAndRemoveIt(elem) {
  var elementList = document.querySelectorAll(elem);
  Array.prototype.forEach.call(elementList, function (e) {
    e.classList.remove("active");
  });
}

//activate tabs function
initTab(".tabs");

const galleryLeft = document.querySelector(".home-product__prev");
const galleryRight = document.querySelector(".home-product__next");
new Swiper(".home-product-slider", {
  spaceBetween: 10,
  slidesPerView: 4,
  breakpoints: {
    1260: {
      slidesPerView: 4,
    },
    900: {
      slidesPerView: 3,
    },
    769: {
      slidesPerView: 2.4,
    },
    490: {
      slidesPerView: 1.5,
    },
    100: {
      slidesPerView: 1,
    },
  },
  navigation: {
    nextEl: galleryRight,
    prevEl: galleryLeft,
  },
});

const answer = document.querySelectorAll(".catalog__spoiler");

answer.forEach((e) => {
  let qaTop = e.querySelector(".catalog__option");
  let plus = e.querySelector(".catalog__svg");
  let cont = e.querySelector(".catalog__cont");

  qaTop.addEventListener("click", () => {
    plus.classList.toggle("catalog__svg_active");
    cont.classList.toggle("catalog__cont_active");
  });
});


/*var el = $('#number');
function change(v){
    var upd = +el.val()+v;
    el.val( upd>0 ? upd : 0);    
  };
  $('#max').on('click', function(){
     change(1);
     let price = document.querySelector('.price').value;
    price += price;
    }); // потом может поменяете на +-10
  $('#min').on('click', function(){ 
    change(-1);
    let price = document.querySelector('.price').value;
    price -= price;
  });
*/
