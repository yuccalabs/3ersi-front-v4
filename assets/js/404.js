"use strict";

// Utility Functions
function showElement(ele) {
  ele.classList.add("show");
}

function hideElement(ele) {
  ele.classList.remove("show");
}

// Render dynamic lists
document.addEventListener("DOMContentLoaded", () => {
  const iconsList = [
    "/assets/images/navmenu-icons/services/reception-room.svg",
    "/assets/images/navmenu-icons/services/multimedia-service.svg",
    "/assets/images/navmenu-icons/services/caterer.svg",
    "/assets/images/navmenu-icons/services/music-serivce.svg",
    "/assets/images/navmenu-icons/services/decorator.svg",
    "/assets/images/navmenu-icons/services/cake-maker.svg",
    "/assets/images/navmenu-icons/wedding-invitation-service.svg",
    "/assets/images/navmenu-icons/services/machta.svg",
    "/assets/images/navmenu-icons/services/beauty-service.svg",
    "/assets/images/navmenu-icons/services/jewllery.svg",
  ];

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

  // Input fields
  const inputTypeServiceError = document.querySelector(".type-service-error");
  const inputLocationServiceError = document.querySelector(".location-service-error");

  // Desktop lists
  const typeServiceListError = document.querySelector(".type-service-list-error");
  const locationServiceListError = document.querySelector(".location-service-list-error");

  // // Mobile lists
  const serviceListMobUl = document.querySelector(".type-service-list-mob-v");
  const serviceListMobUlTow = document.querySelector(".location-service-list-mob-v");

  // // Mobile container and overlay
  const serviceListMobContainer = document.querySelector(".list-appear");
  const serviceListMobOverlay = document.querySelector(".list-appear .list-overlay");
  const removeServiceList = document.querySelector(".list-appear .title-service img");
  const titleService = document.querySelector(".list-appear .title-service h4");
  const inputService = document.querySelector(".list-appear input");

  // Prevent keyboard on mobile devices
  const handleInputFocus = (e) => {
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      e.preventDefault();
    }
  };

  // Add readonly attribute based on screen size
  const addReadonlyAttribute = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    inputTypeServiceError.readOnly = isMobile;
    inputLocationServiceError.readOnly = isMobile;
  };

  addReadonlyAttribute();
  window.addEventListener("resize", addReadonlyAttribute);

  // Function to hide all lists
  const hideAllLists = () => {
    hideElement(typeServiceListError);
    hideElement(locationServiceListError);
    hideElement(serviceListMobUl);
    hideElement(serviceListMobUlTow);
    hideElement(serviceListMobContainer);
  };

  // Function to show a specific list
  const showList = (list, mobileList, title, placeholder, items) => {
    hideAllLists(); // Hide all lists before showing the current one
    if (window.matchMedia("(max-width: 768px)").matches) {
      // Mobile view
      showElement(mobileList);
      showElement(serviceListMobContainer);
      titleService.textContent = title;
      inputService.placeholder = placeholder;
      inputService.value = "";
      renderList(inputService, mobileList, items);
      scrollTo({
        top: 0,
        behavior: "smooth",
      });
      // Disable the scroll
      document.body.classList.add("no-scroll");
    } else {
      // Desktop view
      showElement(list);
    }
  };

  // Show type service list
  inputTypeServiceError.addEventListener("focus", (e) => {
    handleInputFocus(e);
    showList(typeServiceListError, serviceListMobUl, "Que Chercher Vous ?", "Chercher un service", listItems);
  });

  // Show location service list
  inputLocationServiceError.addEventListener("focus", (e) => {
    handleInputFocus(e);
    showList(locationServiceListError, serviceListMobUlTow, "Ou ?", "Chercher une ville", listItemsTwo);
  });

  // Hide lists on overlay or remove button click
  [serviceListMobOverlay, removeServiceList].forEach((ele) => {
    ele.addEventListener("click", () => {
      hideAllLists();
      // Enable the scroll
      document.body.classList.remove("no-scroll");
    });
  });

  // Render filtered list
  const renderList = (input, ul, items) => {
    input.addEventListener("input", () => {
      const inputValue = input.value.toLowerCase();
      ul.innerHTML = items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => item.toLowerCase().includes(inputValue))
        .map(({ item, index }) => `<li><img src="${iconsList[index]}" alt="" /> ${item}</li>`)
        .join("");
      // Fill the input with the Item Text
      ul.querySelectorAll("li").forEach((item) =>
        item.addEventListener("click", (e) => {
          input.value = e.target.innerText;
        })
      );
    });
    ul.innerHTML = items.map((item, index) => `<li><img src="${iconsList[index]}" alt="service-${item}" /> ${item}</li>`).join(""); // Initial render

    // Fill the input with the Item Text
    ul.querySelectorAll("li").forEach((item) =>
      item.addEventListener("click", (e) => {
        input.value = e.target.innerText;
      })
    );
  };

  // Render lists for desktop and mobile
  renderList(inputTypeServiceError, typeServiceListError, listItems);
  renderList(inputLocationServiceError, locationServiceListError, listItemsTwo);

  renderList(inputService, serviceListMobUl, listItems);
  renderList(inputService, serviceListMobUlTow, listItemsTwo);

  // Close lists when clicking outside
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".type-service-error, .location-service-error, .list-appear")) {
      hideElement(typeServiceListError);
      hideElement(locationServiceListError);
    }
  });
});
