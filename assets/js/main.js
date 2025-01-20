"use strict";
//select all nav items
const navItems = document.querySelectorAll("#navmenu ul li");
const humberger = document.querySelector("#humberger");
const aside = document.querySelector("aside");
const asideContent = document.querySelector("aside .aside-content");
const asideOverlay = document.querySelector("aside .aside-overlay");
const removeAside = document.querySelector(".remove-aside i");
const asideNavItems = document.querySelectorAll("#asideList li");
const asideDropMenu = document.querySelector("#asideList li");

// open the navItem and close the rest
navItems.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    navItem.classList.toggle("active");
    navItems.forEach((item) => {
      if (item !== navItem) {
        item.classList.remove("active");
      }
    });
  });
});

asideNavItems.forEach((aNavItem) => {
  aNavItem.addEventListener("click", () => {
    aNavItem.classList.toggle("active");
    asideNavItems.forEach((item) => {
      if (item !== aNavItem) {
        item.classList.remove("active");
      }
    });
  });
});

// open the sidebar on mobile
humberger.addEventListener("click", () => {
  asideContent.style.transform = "translateX(0%)";
  asideOverlay.style.width = "40%";
  aside.style.display = "flex";
});
// remove the sidebar
removeAside.addEventListener("click", () => {
  asideContent.style.transform = "translateX(-100%)";
  asideOverlay.style.width = "0%";
  aside.style.display = "none";
});

asideOverlay.addEventListener("click", () => {
  asideContent.style.transform = "translateX(-100%)";
  asideOverlay.style.width = "0%";
  aside.style.display = "none";
});

// //

const inputTypeService = document.querySelector(".type-service");
const inputLocationService = document.querySelector(".location-service");
const typeServiceList = document.querySelector(".type-service-list");
const locationServiceList = document.querySelector(".location-service-list");
// const typeServiceListChildren = document.querySelectorAll(
//   ".type-service-list li"
// );

inputTypeService.addEventListener("focus", () => {
  typeServiceList.style.display = "block";
  locationServiceList.style.display = "none";
});
inputLocationService.addEventListener("focus", () => {
  locationServiceList.style.display = "block";
  typeServiceList.style.display = "none";
});

// close the dropDownMenu when clicking on other parts
window.addEventListener("click", (e) => {
  navItems.forEach((item) => {
    if (e.target !== item) {
      item.classList.remove("active");
    }
  });
  if (e.target !== inputTypeService && e.target !== inputLocationService) {
    locationServiceList.style.display = "none";
    typeServiceList.style.display = "none";
  }
});

// scroll horizantallay in large view port
document.addEventListener("DOMContentLoaded", () => {
  function horizontalScroll(containerSelector, arrowSelector) {
    const container = document.querySelector(containerSelector);
    const leftArrow = document.querySelector(`${arrowSelector} .left-arrow`);
    const rightArrow = document.querySelector(`${arrowSelector} .right-arrow`);
    const scrollAmount = 600;

    leftArrow.addEventListener("click", () => {
      container.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });

    rightArrow.addEventListener("click", () => {
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  }

  horizontalScroll(".vendors-container", ".best-vendors");
  horizontalScroll(".discount-container", ".discount");
  horizontalScroll(".category-container", ".category-parent");
  horizontalScroll(".articles-container", ".articles-parent");
});
