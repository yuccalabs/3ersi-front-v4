"use strict";

// Utility Functions
function showElement(ele) {
  ele.classList.add("show");
}

function hideElement(ele) {
  ele.classList.remove("show");
}
// Controll the popup (edite, discount)
document.addEventListener("DOMContentLoaded", () => {
  const servicePopupSection = document.querySelectorAll(".popup-service");
  const editeBtn = document.querySelectorAll(".services-page .edite");
  const discountBtn = document.querySelectorAll(".services-page .discount img");
  const edtiePopup = document.querySelector("#popup-service-edite");
  const discountPopup = document.querySelector("#popup-service-discount");
  const closeBtn = document.querySelectorAll(".popup-service .close-btn");

  // Display Service popup
  function showEditeServicePopup() {
    showElement(edtiePopup);
    hideElement(discountPopup);
  }
  function showDiscountServicePopup() {
    showElement(discountPopup);
    hideElement(edtiePopup);
  }

  // Hide all popups
  function closeServicePopup() {
    hideElement(edtiePopup);
    hideElement(discountPopup);
  }

  // Switch Between edite and discount Popups
  function switchPopup(event, ind) {
    if (event.target === editeBtn[ind]) {
      showEditeServicePopup();
      document.body.classList.add("no-scroll");
    } else if (event.target === discountBtn[ind]) {
      showDiscountServicePopup();
      document.body.classList.add("no-scroll");
    }
  }
  // open popup
  editeBtn.forEach((btn, ind) => btn.addEventListener("click", (eve) => switchPopup(eve, ind)));
  discountBtn.forEach((btn, ind) => btn.addEventListener("click", (eve) => switchPopup(eve, ind)));

  // Hide all popups when close buttons are clicked
  closeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeServicePopup();
      document.body.classList.remove("no-scroll");
    });
  });

  // Close popup when clicking outside the container
  servicePopupSection.forEach((popup, ind) =>
    popup.addEventListener("click", (event) => {
      console.log(event.target);
      if (event.target === servicePopupSection[ind]) {
        closeServicePopup();
        document.body.classList.remove("no-scroll");
      }
    })
  );

  // Close popup on pressing the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeServicePopup();
      document.body.classList.remove("no-scroll");
    }
  });
});
// Controll the Catalog popup
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
