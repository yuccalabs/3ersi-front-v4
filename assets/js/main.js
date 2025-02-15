"use strict";

// Utility Functions
function showElement(ele) {
  ele.classList.add("show");
}

function hideElement(ele) {
  ele.classList.remove("show");
}

function toggleActiveState(elements, targetElement) {
  elements.forEach(
    (item) => item !== targetElement && item.classList.remove("active")
  );
  targetElement.classList.toggle("active");
}

// Animation on Scroll
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("#aos");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => observer.observe(section));
});

// Navbar Control
const navItems = document.querySelectorAll("#navmenu ul li");
navItems.forEach((navItem) => {
  navItem.addEventListener("click", () => toggleActiveState(navItems, navItem));
});

// Sidebar Control
const hamburger = document.querySelector("#hamburger");
const aside = document.querySelector("aside");
const asideOverlay = document.querySelector("aside .aside-overlay");
const removeAside = document.querySelector("aside .remove-aside");
const asideNavItems = document.querySelectorAll("#asideList li");

function toggleSidebar(show) {
  show ? showElement(aside) : hideElement(aside);
  document.body.classList.toggle("no-scroll", show);
}

// Hamburger Toggle
hamburger.addEventListener("click", () => toggleSidebar(true));
[removeAside, asideOverlay].forEach((el) =>
  el.addEventListener("click", () => toggleSidebar(false))
);

asideNavItems.forEach((aNavItem) => {
  aNavItem.addEventListener("click", () =>
    toggleActiveState(asideNavItems, aNavItem)
  );
});

// Close nav items on outside click
window.addEventListener("click", (e) => {
  navItems.forEach((item) => {
    if (e.target !== item && e.target !== item.children[0]) {
      item.classList.remove("active");
    }
  });
});

// Render dynamic lists
document.addEventListener("DOMContentLoaded", () => {
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
  const inputTypeService = document.querySelector(".type-service");
  const inputLocationService = document.querySelector(".location-service");

  // Desktop lists
  const typeServiceList = document.querySelector(".type-service-list");
  const locationServiceList = document.querySelector(".location-service-list");

  // Mobile lists
  const serviceListMobUl = document.querySelector(".type-service-list-mob-v");
  const serviceListMobUlTow = document.querySelector(
    ".location-service-list-mob-v"
  );

  // Mobile container and overlay
  const serviceListMobContainer = document.querySelector(".list-appear");
  const serviceListMobOverlay = document.querySelector(
    ".list-appear .list-overlay"
  );
  const removeServiceList = document.querySelector(
    ".list-appear .title-service img"
  );
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
    inputTypeService.readOnly = isMobile;
    inputLocationService.readOnly = isMobile;
  };

  addReadonlyAttribute();
  window.addEventListener("resize", addReadonlyAttribute);

  // Function to hide all lists
  const hideAllLists = () => {
    hideElement(typeServiceList);
    hideElement(locationServiceList);
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
    } else {
      // Desktop view
      showElement(list);
    }
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.body.classList.add("no-scroll");
  };

  // Show type service list
  inputTypeService.addEventListener("focus", (e) => {
    handleInputFocus(e);
    showList(
      typeServiceList,
      serviceListMobUl,
      "Que Chercher Vous ?",
      "Chercher un service",
      listItems
    );
  });

  // Show location service list
  inputLocationService.addEventListener("focus", (e) => {
    handleInputFocus(e);
    showList(
      locationServiceList,
      serviceListMobUlTow,
      "Ou ?",
      "Chercher une ville",
      listItemsTwo
    );
  });

  // Hide lists on overlay or remove button click
  [serviceListMobOverlay, removeServiceList].forEach((ele) => {
    ele.addEventListener("click", () => {
      hideAllLists();
      document.body.classList.remove("no-scroll");
    });
  });

  // Render filtered list
  const renderList = (input, ul, items) => {
    input.addEventListener("input", () => {
      const inputValue = input.value.toLowerCase();
      ul.innerHTML = items
        .filter((item) => item.toLowerCase().includes(inputValue))
        .map((item) => `<li>${item}</li>`)
        .join("");
      // Fill the input with the Item Text
      ul.querySelectorAll("li").forEach((item) =>
        item.addEventListener("click", (e) => {
          input.value = e.target.innerHTML;
        })
      );
    });
    ul.innerHTML = items.map((item) => `<li>${item}</li>`).join(""); // Initial render
    // Fill the input with the Item Text
    ul.querySelectorAll("li").forEach((item) =>
      item.addEventListener("click", (e) => {
        input.value = e.target.innerHTML;
      })
    );
  };

  // Render lists for desktop and mobile
  renderList(inputTypeService, typeServiceList, listItems);
  renderList(inputLocationService, locationServiceList, listItemsTwo);
  renderList(inputService, serviceListMobUl, listItems);
  renderList(inputService, serviceListMobUlTow, listItemsTwo);

  // Close lists when clicking outside
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".type-service, .location-service, .list-appear")) {
      hideElement(typeServiceList);
      hideElement(locationServiceList);
    }
  });
});

// Horizontal Scroll for Containers
document.addEventListener("DOMContentLoaded", () => {
  function horizontalScroll(containerSelector, arrowSelector) {
    const container = document.querySelector(containerSelector);
    const leftArrow = document.querySelector(`${arrowSelector} .left-arrow`);
    const rightArrow = document.querySelector(`${arrowSelector} .right-arrow`);
    const scrollAmount = 600;

    if (container && leftArrow && rightArrow) {
      leftArrow.addEventListener("click", () =>
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      );
      rightArrow.addEventListener("click", () =>
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      );
    }
  }

  horizontalScroll(".vendors-container", ".best-vendors");
  horizontalScroll(".discount-container", ".discount");
  horizontalScroll(".category-container", ".category-parent");
  horizontalScroll(".articles-container", ".articles-parent");
  horizontalScroll(".sugg-container", ".sugg-section");
});

// Filter Section
document.addEventListener("DOMContentLoaded", () => {
  const filterSection = document.querySelector(".filter-section");
  const filterIcon = document.querySelector(".filter-icon");
  const closeFilterIcon = document.querySelector(".close-filter");
  const filterCategoriesItem = document.querySelectorAll(
    ".filter-category div"
  );
  const filterOverlay = document.querySelector(".filter-overlay");
  const rangeLabels = document.querySelectorAll(".filter-item label span");
  const rangeInputs = document.querySelectorAll('input[type="range"]');

  filterCategoriesItem.forEach((category) => {
    category.addEventListener("click", () => {
      category.parentElement.classList.toggle("show");
    });
  });

  filterIcon.addEventListener("click", () => {
    showElement(filterSection);
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.body.classList.add("no-scroll");
  });

  [closeFilterIcon, filterOverlay].forEach((el) =>
    el.addEventListener("click", () => {
      hideElement(filterSection);
      document.body.classList.remove("no-scroll");
    })
  );

  rangeInputs.forEach((input, index) => {
    const updateBackground = () => {
      const value = ((input.value - input.min) / (input.max - input.min)) * 100;
      input.style.background = `linear-gradient(to right, var(--primary-color) ${value}%, #ddd ${value}%)`;
      rangeLabels[index].textContent = input.value;
    };
    // Initial background update
    updateBackground();
    // Update background on input change
    input.addEventListener("input", updateBackground);
  });
});

// Like Button Toggle
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".like-btn img").forEach((btn) => {
    btn.addEventListener("click", () => btn.classList.toggle("active"));
  });
});

// FAQ Section Toggle
document.addEventListener("DOMContentLoaded", () => {
  const faqTitles = document.querySelectorAll(".faq-question");

  faqTitles.forEach((title) => {
    title.addEventListener("click", () => {
      const answer = title.nextElementSibling;
      const chevronIcon = title.querySelector("img");
      answer.classList.toggle("show");
      chevronIcon.style.rotate = answer.classList.contains("show")
        ? "180deg"
        : "0deg";
    });
  });
});

// Contact Form Ready Prompt
document.addEventListener("DOMContentLoaded", () => {
  const textareaInput = document.querySelector(".contact-section textarea");
  const readyPromptList = document.querySelector(
    ".textarea-container .ready-prompt"
  );

  textareaInput.addEventListener("focus", () => showElement(readyPromptList));
  textareaInput.addEventListener("input", () => hideElement(readyPromptList));

  window.addEventListener("click", (e) => {
    if (![readyPromptList, textareaInput].includes(e.target))
      hideElement(readyPromptList);
  });

  document
    .querySelectorAll(".textarea-container .ready-prompt li")
    .forEach((item) => {
      item.addEventListener(
        "click",
        () => (textareaInput.value = item.querySelector("p").innerText)
      );
    });
});
