"use strict";
//select all nav items
const navItems = document.querySelectorAll("#navmenu ul li");

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
