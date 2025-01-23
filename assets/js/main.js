"use strict";
// control the navbar
const navItems = document.querySelectorAll("#navmenu ul li");
const hamburger = document.querySelector("#hamburger");
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

function showElement(ele) {
  ele.classList.add("show");
}
function hideElement(ele) {
  ele.classList.remove("show");
}

// open the sidebar on mobile
hamburger.addEventListener("click", () => {
  showElement(aside);
  serviceListMob.classList.remove("show");
  document.body.classList.add("no-scroll");
});

// remove the sidebar
removeAside.addEventListener("click", () => {
  hideElement(aside);
  document.body.classList.remove("no-scroll");
});
asideOverlay.addEventListener("click", () => {
  hideElement(aside);
  document.body.classList.remove("no-scroll");
});

//
const listItems = [
  "Salles des fêtes",
  "Photos et vidéos",
  "Traiteurs",
  "Musique",
  "Décoration",
  "Gâteaux et pâtisseries",
  "Tenues de mariage",
  "Machta",
  "Coiffure & Beauté",
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
const serviceListMob = document.querySelector(".list-appear");
const serviceListMobOverlay = document.querySelector(
  ".list-appear .list-overlay"
);
const serviceListMobUl = document.querySelector(
  ".list-appear .type-service-list-mob-v"
);
const serviceListMobUlTow = document.querySelector(
  ".list-appear .location-service-list-mob-v"
);
const titleService = document.querySelector(".list-appear .title-service h4");
const inputService = document.querySelector(".list-appear input");
const removeServiceList = document.querySelector(
  ".list-appear .title-service svg"
);

// show the list when focusing on the input
inputTypeService.addEventListener("focus", () => {
  serviceListMobUlTow.style.display = "none";
  serviceListMobUl.style.display = "block";

  inputService.value = "";

  showElement(typeServiceList);
  showElement(serviceListMob);
  hideElement(locationServiceList);

  titleService.textContent = "Que Chercher Vous ?";
  inputService.placeholder = "Chercher un service";

  serviceListMobUl.innerHTML = "";
  listItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    serviceListMobUl.appendChild(li);
  });

  scrollTo({
    top: 0,
    behavior: "smooth",
  });
  document.body.classList.add("no-scroll");
});

inputLocationService.addEventListener("focus", () => {
  serviceListMobUl.style.display = "none";
  serviceListMobUlTow.style.display = "block";
  inputService.value = "";
  showElement(locationServiceList);
  showElement(serviceListMob);
  hideElement(typeServiceList);

  titleService.textContent = "Ou ?";
  inputService.placeholder = "Chercher une ville";

  serviceListMobUlTow.innerHTML = "";
  listItemsTwo.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    serviceListMobUlTow.appendChild(li);
  });

  scrollTo({
    top: 0,
    behavior: "smooth",
  });
  document.body.classList.add("no-scroll");
});

serviceListMobOverlay.addEventListener("click", () => {
  hideElement(serviceListMob);
  document.body.classList.remove("no-scroll");
});
removeServiceList.addEventListener("click", () => {
  hideElement(serviceListMob);
  document.body.classList.remove("no-scroll");
});

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
renderList(inputService, serviceListMobUl, listItems);
renderList(inputService, serviceListMobUlTow, listItemsTwo);

// close the dropDownMenu when clicking on other parts
window.addEventListener("click", (e) => {
  navItems.forEach((item) => {
    if (e.target !== item && e.target !== item.children[0]) {
      item.classList.remove("active");
    }
  });
  if (e.target !== inputTypeService && e.target !== inputLocationService) {
    hideElement(locationServiceList);
    hideElement(typeServiceList);
  }
});

// scroll horizantallay with Click button in large view port
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

// Animation on scroll
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("#aos");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
