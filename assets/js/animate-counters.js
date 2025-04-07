// animates the counters for statistics in join us page
(function () {
  const counters = document.querySelectorAll(".join-us-statistic-counter");
  const targetValues = [1000, 25000];
  let countOne = 0;
  let countTwo = 0;

  // counter one
  const intervalOne = setInterval(() => {
    countOne += 10;

    counters[0].textContent = countOne + " +";
    if (countOne >= targetValues[0]) clearInterval(intervalOne);
  }, 10);

  // counter two
  const intervalTwo = setInterval(() => {
    countTwo += 100;
    counters[1].textContent = countTwo + " +";
    if (countTwo >= targetValues[1]) clearInterval(intervalTwo);
  }, 10);
})();
