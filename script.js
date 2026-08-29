document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const logoTap = document.getElementById("logoTap");
  const easterEgg = document.getElementById("easterEgg");
  const famDiscountBtn = document.getElementById("famDiscountBtn");

  /* -----------------------------
     Mobile Navigation Toggle
  ----------------------------- */
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  /* -----------------------------
     Easter Egg — Triple Tap Logo
  ----------------------------- */
  let tapCount = 0;
  let tapTimer = null;

  if (logoTap && easterEgg) {
    logoTap.addEventListener("click", () => {
      tapCount++;

      if (!tapTimer) {
        tapTimer = setTimeout(() => {
          tapCount = 0;
          tapTimer = null;
        }, 800);
      }

      if (tapCount >= 3) {
        tapCount = 0;
        clearTimeout(tapTimer);
        tapTimer = null;

        easterEgg.style.opacity = "1";
        setTimeout(() => {
          easterEgg.style.opacity = "0";
        }, 1500);
      }
    });
  }

  /* -----------------------------
     Fam Discount Button
  ----------------------------- */
  if (famDiscountBtn) {
    famDiscountBtn.addEventListener("click", () => {
      window.location.href = "gallery.html";
    });
  }

  /* -----------------------------
     Fade-In Scroll Animation
  ----------------------------- */
  const faders = document.querySelectorAll(".fade-in");

  const appear = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  faders.forEach((el) => appear.observe(el));

  /* -------------------------------------------------------------
     Wicked Shine Mode — Panel + Diamond Rain
  ------------------------------------------------------------- */
  const wickedPanel = document.getElementById("wickedPanel");
  const wickedOverlay = document.getElementById("wickedOverlay");
  const comicCar = document.querySelector(".main-logo");
  const wickedEmblem = document.getElementById("wickedEmblem");
  const wickedShineBtn = document.getElementById("wickedShineBtn");
  const wickedShineTrigger = document.getElementById("wickedShineTrigger");

  // Connect visible button → hidden button
  if (wickedShineTrigger && wickedShineBtn) {
    wickedShineTrigger.addEventListener("click", () => {
      wickedShineBtn.click();
    });
  }

  /* -------------------------------------------------------------
     DIAMOND RAIN — Only when Wicked Shine is pressed
  ------------------------------------------------------------- */

  function startDiamondRain() {
    const container = document.querySelector('.diamond-rain-container');
    if (!container) return;

    container.innerHTML = ""; // clear old diamonds

    for (let i = 0; i < 25; i++) {
      const wrap = document.createElement('div');
      wrap.classList.add('diamond-wrapper');

      wrap.style.left = Math.random() * 100 + 'vw';
      wrap.style.top = Math.random() * -300 + 'px';

      wrap.style.setProperty('--delay', Math.random() * 3 + 's');
      wrap.style.setProperty('--duration', 3 + Math.random() * 3 + 's');

      const d = document.createElement('div');
      d.classList.add('diamond');

      wrap.appendChild(d);
      container.appendChild(wrap);
    }
  }

  function stopDiamondRain() {
    const container = document.querySelector('.diamond-rain-container');
    if (container) container.innerHTML = "";
  }

  /* -------------------------------------------------------------
     Wicked Shine Button Logic
  ------------------------------------------------------------- */
  if (wickedShineBtn && wickedPanel && wickedOverlay && comicCar) {
    wickedShineBtn.addEventListener("click", () => {

      wickedPanel.classList.add("open");
      wickedOverlay.classList.add("show");

      // KEEP MAIN LOGO VISIBLE
      comicCar.style.display = "block";
      wickedEmblem.style.display = "none";

      document.body.classList.add("wicked-shine-mode");

      // START DIAMOND RAIN
      startDiamondRain();

      setTimeout(() => {
        wickedPanel.classList.remove("open");
        wickedOverlay.classList.remove("show");

        // Logo stays visible
        wickedEmblem.style.display = "none";

        document.body.classList.remove("wicked-shine-mode");

        // STOP DIAMOND RAIN
        stopDiamondRain();

      }, 10000);
    });

    wickedOverlay.addEventListener("click", () => {
      wickedPanel.classList.remove("open");
      wickedOverlay.classList.remove("show");
    });
  }

  /* -------------------------------------------------------------
     Faygo Splash — 5 clicks
  ------------------------------------------------------------- */
  let faygoClickCount = 0;

  if (wickedShineTrigger) {
    wickedShineTrigger.addEventListener("click", () => {
      faygoClickCount++;

      if (faygoClickCount === 5) {
        faygoClickCount = 0;

        wickedShineTrigger.classList.add("faygo-splash");

        setTimeout(() => {
          wickedShineTrigger.classList.remove("faygo-splash");
        }, 600);
      }
    });
  }

  /* -------------------------------------------------------------
     Graffiti Word Tagging
  ------------------------------------------------------------- */
  const graffitiWords = ["wicked", "fam", "shine", "underground"];

  function tagGraffitiWords(node) {
    if (node.nodeType !== Node.TEXT_NODE) return;
    const text = node.textContent;
    let replaced = text;

    graffitiWords.forEach((word) => {
      const regex = new RegExp(`\\b(${word})\\b`, "gi");
      replaced = replaced.replace(regex, '<span class="tagged-word">$1</span>');
    });

    if (replaced !== text) {
      const span = document.createElement("span");
      span.innerHTML = replaced;
      node.parentNode.replaceChild(span, node);
    }
  }

  function walkNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) tagGraffitiWords(node);
  }

  walkNodes(document.body);

  /* -------------------------------------------------------------
     Konami Code — Wicked Mode
  ------------------------------------------------------------- */
  const konamiSequence = [
    "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
    "KeyB","KeyA"
  ];
  let konamiIndex = 0;

  function activateKonamiMode() {
    document.body.classList.add("konami-mode");
    const badge = document.createElement("div");
    badge.className = "wicked-badge";
    badge.textContent = "Wicked Mode Activated";
    document.body.appendChild(badge);
    setTimeout(() => {
      document.body.classList.remove("konami-mode");
      badge.remove();
    }, 10000);
  }

  document.addEventListener("keydown", (e) => {
    if (e.code === konamiSequence[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;
        activateKonamiMode();
      }
    } else {
      konamiIndex = 0;
    }
  });

  /* -------------------------------------------------------------
     Footer Secret Page — 7 clicks
  ------------------------------------------------------------- */
  let footerClickCount = 0;
  const footer = document.querySelector(".site-footer");
  if (footer) {
    footer.addEventListener("click", () => {
      footerClickCount++;
      if (footerClickCount >= 7) {
        footerClickCount = 0;
        window.location.href = "fam.html";
      }
    });
  }

  /* -------------------------------------------------------------
     Dark Carnival Mode — Logo long press
  ------------------------------------------------------------- */
  let carnivalTimer = null;
  const logoTapGlobal = document.getElementById("logoTap");

  if (logoTapGlobal) {
    logoTapGlobal.addEventListener("mousedown", () => {
      carnivalTimer = setTimeout(() => {
        document.body.classList.add("carnival-mode");
        setTimeout(() => document.body.classList.remove("carnival-mode"), 12000);
      }, 3000);
    });

    const cancelCarnival = () => {
      if (carnivalTimer) {
        clearTimeout(carnivalTimer);
        carnivalTimer = null;
      }
    };

    logoTapGlobal.addEventListener("mouseup", cancelCarnival);
    logoTapGlobal.addEventListener("mouseleave", cancelCarnival);
    logoTapGlobal.addEventListener("touchend", cancelCarnival);
    logoTapGlobal.addEventListener("touchcancel", cancelCarnival);
  }

  /* -------------------------------------------------------------
     Detailer's Wisdom Tips — Scroll bottom 5×
  ------------------------------------------------------------- */
  let bottomScrollCount = 0;
  const wisdomTips = [
    "Microfiber > everything.",
    "Two-bucket method prevents swirl marks.",
    "Clay bar before wax = wicked shine.",
    "Vacuum first, wipe second.",
    "Tire shine last — avoid splashback."
  ];

  function showWisdomTip() {
    const tip = document.createElement("div");
    tip.className = "wisdom-tip";
    tip.textContent = wisdomTips[Math.floor(Math.random() * wisdomTips.length)];
    document.body.appendChild(tip);
    setTimeout(() => tip.remove(), 4000);
  }

  window.addEventListener("scroll", () => {
    const bottomReached =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

    if (bottomReached) {
      bottomScrollCount++;
      if (bottomScrollCount >= 5) {
        bottomScrollCount = 0;
        showWisdomTip();
      }
    }
  });

  /* -------------------------------------------------------------
     Underground Mode — U + N + D
  ------------------------------------------------------------- */
  const undergroundKeys = new Set();

  function activateUndergroundMode() {
    document.body.classList.add("underground-mode");
    setTimeout(() => document.body.classList.remove("underground-mode"), 8000);
  }

  document.addEventListener("keydown", (e) => {
    undergroundKeys.add(e.key.toLowerCase());
    if (
      undergroundKeys.has("u") &&
      undergroundKeys.has("n") &&
      undergroundKeys.has("d")
    ) {
      undergroundKeys.clear();
      activateUndergroundMode();
    }
  });

  document.addEventListener("keyup", (e) => {
      undergroundKeys.delete(e.key.toLowerCase());
});

});
// Before/After Slider Logic
document.querySelectorAll('.ba-slider').forEach(slider => {
  const range = slider.querySelector('.ba-range');
  const afterImg = slider.querySelector('.after');

  range.addEventListener('input', () => {
    const val = range.value;
    afterImg.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
  });
});
