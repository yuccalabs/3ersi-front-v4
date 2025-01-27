// carousel for hero section
document.addEventListener("DOMContentLoaded", () => {
  const OPTIONSHERO = { loop: true };

  const emblaHero = document.querySelector(".hero .embla");
  const emblaHero_slides = document.querySelectorAll(".hero .embla__slide");

  const imgSrc = [
    "assets/images/hero-slider/1.jpg",
    "assets/images/hero-slider/2.jpg",
    "assets/images/hero-slider/3.jpg",
    "assets/images/hero-slider/4.jpg",
  ];

  emblaHero_slides.forEach((slide, i) => {
    slide.style.backgroundImage = `url(${imgSrc[i]})`;
  });
  if (emblaHero) {
    const viewportNode = emblaHero.querySelector(".embla__viewport");
    if (viewportNode) {
      EmblaCarousel(viewportNode, OPTIONSHERO, [
        EmblaCarouselAutoplay({ playOnInit: true, delay: 6000 }),
      ]);
    } else {
      console.error("Viewport node not found");
    }
  } else {
    console.error("Embla node not found");
  }
});

// carousel for vendors-list section
document.addEventListener("DOMContentLoaded", () => {
  const OPTIONSVlIST = {};

  const emblaVList = document.querySelectorAll(".vendor-card .embla");

  if (emblaVList.length) {
    emblaVList.forEach((card) => {
      const viewportNode = card.querySelector(".embla__viewport");
      const prevBtnNode = card.querySelector(".embla__button--prev");
      const nextBtnNode = card.querySelector(".embla__button--next");
      const dotsNode = card.querySelector(".embla__dots");
      if (viewportNode) {
        const emblaApi = EmblaCarousel(viewportNode, OPTIONSVlIST);

        const addPrevNextBtnsClickHandlers = (
          emblaApi,
          prevBtnNode,
          nextBtnNode
        ) => {
          const scrollPrev = () => emblaApi.scrollPrev();
          const scrollNext = () => emblaApi.scrollNext();

          prevBtnNode.addEventListener("click", scrollPrev, false);
          nextBtnNode.addEventListener("click", scrollNext, false);

          return () => {
            prevBtnNode.removeEventListener("click", scrollPrev, false);
            nextBtnNode.removeEventListener("click", scrollNext, false);
          };
        };

        const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
          const slideLength = emblaApi.slideNodes().length;
          const dots = Array.from({ length: slideLength }, (_, index) => {
            const dot = document.createElement("button");
            dot.classList.add("embla__dot");
            dot.addEventListener(
              "click",
              () => emblaApi.scrollTo(index),
              false
            );
            dotsNode.appendChild(dot);
            return dot;
          });

          const selectDot = () => {
            const previous = emblaApi.previousScrollSnap();
            const selected = emblaApi.selectedScrollSnap();
            dots[previous].classList.remove("is-selected");
            dots[selected].classList.add("is-selected");
          };

          emblaApi.on("select", selectDot);
          emblaApi.on("init", selectDot);

          return () => {
            dots.forEach((dot) =>
              dot.removeEventListener(
                "click",
                () => emblaApi.scrollTo(index),
                false
              )
            );
          };
        };

        const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
          emblaApi,
          prevBtnNode,
          nextBtnNode
        );
        const removeDotBtnsClickHandlers = addDotBtnsAndClickHandlers(
          emblaApi,
          dotsNode
        );
        emblaApi.on("destroy", removePrevNextBtnsClickHandlers);
        emblaApi.on("destroy", removeDotBtnsClickHandlers);
      } else {
        console.error("Viewport node not found");
      }
    });
  } else {
    console.error("Embla node not found");
  }
});
