var swiper = new Swiper(".testimonial-wrapper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    loop: true,
    speed: 1300,
    autoplay: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    breakpoints: {
        768: {
            slidesPerView: 3,
            slidesPerGroup: 3
        },
        480: {
            slidesPerView: 2,
            slidesPerGroup: 1
        }
    }
});





(() => {
  const track = document.getElementById("track");
  const wrap = track.parentElement;
  const cards = [...track.children];
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const dotsBox = document.getElementById("dots");

  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

  let current = 0;
  let isAnimating = false;

  /* ------------------------------
     DOTS
  ------------------------------ */
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () => activate(i, true));
    dotsBox.appendChild(dot);
  });
  const dots = [...dotsBox.children];

  /* ------------------------------
     CENTER CARD
  ------------------------------ */
  function centerCard(index) {
    const card = cards[index];
    const horizontal = !isMobile();

    const offset = horizontal
      ? card.offsetLeft - (wrap.clientWidth / 2 - card.clientWidth / 2)
      : card.offsetTop - (wrap.clientHeight / 2 - card.clientHeight / 2);

    wrap.scrollTo({
      left: horizontal ? offset : 0,
      top: horizontal ? 0 : offset,
      behavior: "smooth"
    });
  }

  /* ------------------------------
     UI STATE
  ------------------------------ */
  function updateUI(index) {
    cards.forEach((card, i) => {
      const active = i === index;
      card.toggleAttribute("active", active);
      card.style.transform = active ? "scale(1)" : "scale(0.94)";
      card.style.opacity = active ? "1" : "0.6";
    });

    dots.forEach((dot, i) =>
      dot.classList.toggle("active", i === index)
    );

    prev.disabled = index === 0;
    next.disabled = index === cards.length - 1;
  }

  /* ------------------------------
     ACTIVATE SLIDE
  ------------------------------ */
  function activate(index, scroll = false) {
    if (index === current || isAnimating) return;

    isAnimating = true;
    current = index;

    updateUI(index);
    if (scroll) centerCard(index);

    setTimeout(() => (isAnimating = false), 450);
  }

  /* ------------------------------
     NAVIGATION
  ------------------------------ */
  function go(step) {
    activate(
      Math.min(Math.max(current + step, 0), cards.length - 1),
      true
    );
  }

  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));

  /* ------------------------------
     KEYBOARD
  ------------------------------ */
  window.addEventListener("keydown", (e) => {
    if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
    if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
  });

  /* ------------------------------
     HOVER / CLICK
  ------------------------------ */
  cards.forEach((card, i) => {
    card.addEventListener("mouseenter", () => {
      if (window.matchMedia("(hover: hover)").matches) activate(i, true);
    });
    card.addEventListener("click", () => activate(i, true));
  });

  /* ------------------------------
     TOUCH SWIPE
  ------------------------------ */
  let startX = 0, startY = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;

    const distance = isMobile() ? dy : dx;
    if (Math.abs(distance) > 70) {
      go(distance > 0 ? -1 : 1);
    }
  }, { passive: true });

  /* ------------------------------
     RESPONSIVE
  ------------------------------ */
  if (isMobile()) dotsBox.hidden = true;

  window.addEventListener("resize", () => centerCard(current));

  /* INIT */
  updateUI(0);
  centerCard(0);
})();






