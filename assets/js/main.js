"use strict";
// control the navbar
const navItems = document.querySelectorAll("#navmenu ul li");
const humberger = document.querySelector("#humberger");
const aside = document.querySelector("aside");
const asideContent = document.querySelector("aside .aside-content");
const asideOverlay = document.querySelector("aside .aside-overlay");
const removeAside = document.querySelector(".remove-aside svg");
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

//
const listItems = [
  "Salles des fêtes",
  "Photos et vidéos",
  "Traiteurs",
  "Musique",
  "Decoration",
  "Gâteaux et pâtisseries",
  "Tenues de mariage",
  "Machta",
  "Coiffure & Beauté",
  "Décoration",
  "Bijoux et accessoires",
];
const listItemsTwo = [
  "Alger",
  "Oran",
  "Blida",
  "Tipaza",
  "Tizi Ouzou",
  "Boumerdes",
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Bejaia",
  "Biskra",
  "Bechar",
  "Djelfa",
  "Setif",
  "Saida",
  "Skikda",
  "Sidi Bel Abbes",
  "Annaba",
  "Guelma",
  "Constantine",
  "Medea",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Bouira",
  "Tamanrasset",
  "Tebessa",
  "Tlemcen",
  "Tiaret",
  "Tindouf",
  "Khenchela",
  "Souk Ahras",
  "Mila",
  "Ain Defla",
  "Naama",
  "Ain Temouchent",
  "Ghardaia",
  "Relizane",
  "Timimoun",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Beni Abbes",
  "In Salah",
  "In Guezzam",
  "Touggourt",
  "Djanet",
  "El M'Ghair",
  "El Meniaa",
];

const inputTypeService = document.querySelector(".type-service");
const inputLocationService = document.querySelector(".location-service");
const typeServiceList = document.querySelector(".type-service-list");
const locationServiceList = document.querySelector(".location-service-list");

function listServiceVisibilty(input, ulShowed, ulHidden) {
  input.addEventListener("focus", () => {
    ulShowed.style.display = "block";
    ulHidden.style.display = "none";
  });
}
listServiceVisibilty(inputTypeService, typeServiceList, locationServiceList);
listServiceVisibilty(
  inputLocationService,
  locationServiceList,
  typeServiceList
);

// render the list when the input changes
function renderList(input, ul, items) {
  input.addEventListener("input", () => {
    let inputValue = input.value.toLowerCase();
    // filter the list
    let filteredItems = items.filter((item) =>
      item.toLowerCase().includes(inputValue)
    );
    // clear the ul
    ul.innerHTML = "";
    // insert the filtered list in the ul
    filteredItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  });
  // initial render
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}
renderList(inputTypeService, typeServiceList, listItems);
renderList(inputLocationService, locationServiceList, listItemsTwo);

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
