const anchors = document.querySelectorAll('a[href*="#"]');
const SPEED = 0.7;

function smoothScroll(hash) {
  const scrollTo = window.pageYOffset;
  const padding = document.querySelector(hash).getBoundingClientRect().top;
  let start = null;
  requestAnimationFrame(step);

  function step(time) {
    if (start === null) start = time;
    const progress = time - start;
    const distance = (padding < 0 ? Math.max(scrollTo - progress/SPEED, scrollTo + padding) : Math.min(scrollTo + progress/SPEED, scrollTo + padding));
    window.scrollTo(0, distance);
    if (distance != scrollTo + padding) {
      requestAnimationFrame(step)
    } else {
      location.hash = hash;
    }
  }
}

export { smoothScroll, anchors };
