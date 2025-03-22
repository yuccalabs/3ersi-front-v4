"use strict";

// Utility Functions
function showElement(ele) {
  ele.classList.add("show");
}

function hideElement(ele) {
  ele.classList.remove("show");
}

// Control the popup (edit, discount)
document.addEventListener("DOMContentLoaded", () => {
  const servicePopupSection = document.querySelectorAll(".popup-service");

  const editBtn = document.querySelectorAll(".services-page .edit");
  const discountBtn = document.querySelectorAll(".services-page .discount img");
  const closeBtn = document.querySelectorAll(".popup-service .close-btn");

  function getPopup(element) {
    const popupID = element.id
        .split('-')
        .filter((_, index, arr) => index !== arr.length - 1)
        .join('-');
    return document.getElementById(popupID);
  }

  function openPopup(event, index) {
      let popup = getPopup(event.target);
      showElement(popup);
      document.body.classList.add("no-scroll");
  }

  // open popup
  editBtn.forEach((btn, index) => btn.addEventListener("click", (event) => openPopup(event, index)));
  discountBtn.forEach((btn, index) => btn.addEventListener("click", (event) => openPopup(event, index)));

  // Hide all popups when close buttons are clicked
  closeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let popupToClose = getPopup(btn);
      hideElement(popupToClose);
      document.body.classList.remove("no-scroll");
    });
  });

  // Close popup on pressing the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      servicePopupSection.forEach((popup) => {
          hideElement(popup)
      });
      document.body.classList.remove("no-scroll");
    }
  });
});

// Control the Catalog popup
document.addEventListener("DOMContentLoaded", () => {
  const catalogPopupSection = document.querySelector("#popup-catalog");
  const openCatalogBtn = document.querySelector("#open_catalog");

  // Display Catalog popup
  function showCatalogPopup() {
    showElement(catalogPopupSection);
  }
  // Hide Catalog popup
  function closeCatalogPopup() {
    hideElement(catalogPopupSection);
  }

  // open popup
  openCatalogBtn.addEventListener("click", () => {
    showCatalogPopup();
    document.body.classList.add("no-scroll");
  });

  // Close popup when clicking outside the container

  catalogPopupSection.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target === catalogPopupSection) {
      closeCatalogPopup();
      document.body.classList.remove("no-scroll");
    }
  });

  // Close popup on pressing the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCatalogPopup();
      document.body.classList.remove("no-scroll");
    }
  });
});
