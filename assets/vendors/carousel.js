// carousel for hero section
document.addEventListener("DOMContentLoaded", () => {
  const OPTIONSHERO = { loop: true };

  const emblaHero = document.querySelector(".hero .embla");
  const emblaHero_slides = document.querySelectorAll(".hero .embla__slide");

  const imgSrc = ["/assets/images/hero-slider/1.jpg", "/assets/images/hero-slider/2.jpg", "/assets/images/hero-slider/3.jpg", "/assets/images/hero-slider/4.jpg"];

  emblaHero_slides.forEach((slide, i) => {
    slide.style.backgroundImage = `url(${imgSrc[i]})`;
  });
  if (emblaHero) {
    const viewportNode = emblaHero.querySelector(".embla__viewport");
    if (viewportNode) {
      EmblaCarousel(viewportNode, OPTIONSHERO, [EmblaCarouselAutoplay({ playOnInit: true, delay: 6000 })]);
    } else {
      console.error("Viewport node not found");
    }
  } else {
    console.error("Embla node not found");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  function carousel(sectionSelector, isAutoScrolled) {
    if (!sectionSelector.length) {
      console.error("Embla node not found");
      return;
    }

    const OPTIONSVlIST = { loop: true };

    sectionSelector.forEach((card) => {
      const viewportNode = card.querySelector(".embla__viewport");
      const prevBtnNode = card.querySelector(".embla__button--prev");
      const nextBtnNode = card.querySelector(".embla__button--next");
      const dotsNode = card.querySelector(".embla__dots");

      if (!viewportNode) {
        console.error("Viewport node not found");
        return;
      }

      const emblaApi = EmblaCarousel(viewportNode, OPTIONSVlIST, isAutoScrolled && [EmblaCarouselAutoplay({ playOnInit: true, delay: 6000 })]);

      const scrollPrev = () => emblaApi.scrollPrev();
      const scrollNext = () => emblaApi.scrollNext();

      const addPrevNextBtnsClickHandlers = () => {
        if (prevBtnNode && nextBtnNode) {
          prevBtnNode.addEventListener("click", scrollPrev);
          nextBtnNode.addEventListener("click", scrollNext);

          return () => {
            prevBtnNode.removeEventListener("click", scrollPrev);
            nextBtnNode.removeEventListener("click", scrollNext);
          };
        }
        return () => {};
      };

      const addDotBtnsAndClickHandlers = () => {
        if (!dotsNode) return () => {};

        const slideLength = emblaApi.slideNodes().length;
        const dots = Array.from({ length: slideLength }, (_, index) => {
          const dot = document.createElement("button");
          dot.classList.add("embla__dot");
          dot.addEventListener("click", () => emblaApi.scrollTo(index));
          dotsNode.appendChild(dot);
          return dot;
        });

        const selectDot = () => {
          const previous = emblaApi.previousScrollSnap();
          const selected = emblaApi.selectedScrollSnap();
          if (dots[previous]) dots[previous].classList.remove("is-selected");
          if (dots[selected]) dots[selected].classList.add("is-selected");
        };

        emblaApi.on("select", selectDot);
        emblaApi.on("init", selectDot);

        return () => {
          dots.forEach((dot, index) => dot.removeEventListener("click", () => emblaApi.scrollTo(index)));
        };
      };

      const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers();
      const removeDotBtnsClickHandlers = addDotBtnsAndClickHandlers();

      emblaApi.on("destroy", removePrevNextBtnsClickHandlers);
      emblaApi.on("destroy", removeDotBtnsClickHandlers);
    });
  }

  const vendorListCarousel = document.querySelectorAll(".vendor-card .embla");
  const vendorDetailsCarousel = document.querySelectorAll(".vendor-details .embla");
  const patisserieCarousel = document.querySelectorAll(".patisserie-occasion-section .embla");
  const catererCarousel = document.querySelectorAll(".caterer-services .cards-container .embla");
  const eventTestiomonialCarousel = document.querySelectorAll(".event-testimonial-section .testimonial-container .embla");

  carousel(vendorListCarousel, false);
  carousel(vendorDetailsCarousel, false);
  carousel(patisserieCarousel, false);
  carousel(catererCarousel, false);
  carousel(eventTestiomonialCarousel, true);
});
