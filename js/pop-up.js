function popup() {
  const popUpShowButton = document.querySelector("#button-sign");
  const popUp = document.querySelector("#sign");
  const closeButton = document.querySelector("#close-consultation");

  function closePopUp() {
    popUp.style.top = "-300%";
  }

  popUpShowButton.addEventListener("click", () => {
    popUp.style.top = "0";
  });

  popUp.addEventListener("click", function (e) {
    if (e.target == this) closePopUp();
  });
  closeButton.addEventListener("click", closePopUp);
}
window.addEventListener("load", popup);
