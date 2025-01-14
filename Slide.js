const MainContent = document.querySelector(".MainContent");
const MainSlide = document.querySelector(".MainSlide");
const MainPreview = document.querySelector(".MainPreview");
const SBNext = document.querySelector("#SBNext");
const SBPrev = document.querySelector("#SBPrev");

let AutoSlide = setTimeout(() => {
  SBNext.click();
}, 5000);
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
