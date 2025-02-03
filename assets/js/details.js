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

  horizontalScroll(".sugg-container", ".sugg-section");
  horizontalScroll(".category-container", ".category-parent");
  horizontalScroll(".articles-container", ".articles-parent");
});
