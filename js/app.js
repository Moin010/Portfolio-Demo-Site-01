const hamburgerMenuBtn = document.querySelector(".hamburger-icon");
const crossbutton = document.querySelector(".cross-icon");
const mainMenu = document.querySelector(".main-header-nav-area");

hamburgerMenuBtn.addEventListener("click", () => {
  mainMenu.classList.add("mobile-active");
});
crossbutton.addEventListener("click", () => {
  mainMenu.classList.remove("mobile-active");
});
