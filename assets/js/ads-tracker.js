function trackAdView(element) {
  let bloc = element.getAttribute("data-bloc");
  let ad = element.getAttribute("data-ad");
  let url = element.getAttribute("data-view-url"); // Use a different endpoint for views

  let requestId = crypto.randomUUID(); // Unique ID for tracking

  const data = new FormData();
  data.append("ad_id", ad);
  data.append("bloc_id", bloc);
  data.append("request_id", requestId);

  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      console.error("Error tracking ad view:", error);
    });
}

// Observer to detect when an ad enters the viewport
function observeAdViews() {
  let ads = document.querySelectorAll("[data-bloc][data-ad]"); // Select all ads

  let observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackAdView(entry.target);
          observer.unobserve(entry.target); // Stop tracking after first view
        }
      });
    },
    // Trigger when 50% of the ad is visible
    { threshold: 0.5 }
  );

  ads.forEach((ad) => observer.observe(ad));
}

// Run when the page loads
document.addEventListener("DOMContentLoaded", observeAdViews);
