// Query
const NavBarNav = document.querySelector(".NavBar-Nav");
const NavBarMenu = document.querySelector(".NavMenu");
const NavMenuCalc = document.querySelector(".NavMenuCalc");
const NavSideMenu = document.querySelector("#NavSideMenu");
const MenuBar = document.querySelector("#MenuBar");
const MainContent = document.querySelector(".MainContent");
const MainSlide = document.querySelector(".MainSlide");
const MainPreview = document.querySelector(".MainPreview");
const SBNext = document.querySelector("#SBNext");
const SBPrev = document.querySelector("#SBPrev");
const TTSimCalc = document.querySelector("#TTSimCalc");
const TTTempCalc = document.querySelector("#TTTempCalc");
const SimClac = document.querySelector("#SimCalc");
const SimClacBody = document.querySelector(".SimCalcBody");
const TempClac = document.querySelector("#TempCalc");
const TempClacBody = document.querySelector(".TempCalcBody");

// NavBar-Nav active
NavSideMenu.onclick = (e) => {
  NavBarNav.classList.toggle("active");
  NavMenuCalc.classList.toggle("active");
  e.preventDefault();
};
// NavMenu toggle
MenuBar.onmouseover = () => {
  NavBarMenu.classList.toggle("active");
};
NavBarMenu.onmouseleave = () => {
  NavBarMenu.classList.remove("active");
};
// de-active outside the thing
document.addEventListener("click", function (e) {
  if (!NavSideMenu.contains(e.target) && !NavBarNav.contains(e.target)) {
    NavBarNav.classList.remove("active");
    NavMenuCalc.classList.remove("active");
  }
});
document.addEventListener("click", function (e) {
  if (!NavBarMenu.contains(e.target) && !MenuBar.contains(e.target)) {
    NavBarMenu.classList.remove("active");
  }
});
// Dark mode
document.addEventListener("click", function (e) {
  if (TTSimCalc.contains(e.target)) {
    SimClac.classList.toggle("dark");
    SimClacBody.classList.toggle("dark");
  }
});
document.addEventListener("click", function (e) {
  if (TTTempCalc.contains(e.target)) {
    TempClac.classList.toggle("dark");
    TempClacBody.classList.toggle("dark");
  }
});
// Main Slide
let AutoSlide = setTimeout(() => {
  SBNext.click();
}, 3000);
SBNext.addEventListener("click", () => {
  NASlide("Next");
});
SBPrev.addEventListener("click", () => {
  NASlide("Prev");
});
const NASlide = (type) => {
  const ItemSlide = MainSlide.querySelectorAll(".ItemSlide");
  const ItemPreview = MainPreview.querySelectorAll(".MPItem");
  if (type === "Next") {
    MainSlide.appendChild(ItemSlide[0]);
    MainPreview.appendChild(ItemPreview[0]);
    MainContent.classList.add("Next");
  } else {
    const LastItem = ItemSlide.length - 1;
    MainSlide.prepend(ItemSlide[LastItem]);
    MainPreview.prepend(ItemPreview[LastItem]);
    MainContent.classList.add("Prev");
  }
  setTimeout(() => {
    MainContent.classList.remove("Next");
    MainContent.classList.remove("Prev");
  }, 2000);
  clearTimeout(AutoSlide);
  AutoSlide = setTimeout(() => {
    SBNext.click();
  }, 10000);
};
