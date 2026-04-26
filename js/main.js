gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.6,
  lerp: 0.08,
  smoothWheel: true,
  wheelMultiplier: 0.8,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Hero: Canvas image sequence scroll scrubbing
(function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const FRAME_COUNT = 145;
  const FRAME_PATH = (i) => `assets/hero-sequence/frame_${String(i).padStart(4, "0")}.jpg`;

  // Draw image to canvas with "object-fit: cover" behavior
  const drawCover = (img) => {
    const cW = canvas.width, cH = canvas.height;
    const iW = img.naturalWidth, iH = img.naturalHeight;
    const scale = Math.max(cW / iW, cH / iH);
    const sW = iW * scale, sH = iH * scale;
    const sx = (cW - sW) / 2, sy = (cH - sH) / 2;
    ctx.drawImage(img, sx, sy, sW, sH);
  };

  // Size canvas to fill viewport
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (images[currentFrame]?.complete) {
      drawCover(images[currentFrame]);
    }
  };
  window.addEventListener("resize", resize);

  // Preload all frames
  let loadedCount = 0;
  let currentFrame = 0;
  let firstFrameDrawn = false;
  const images = new Array(FRAME_COUNT);

  const drawFirstFrame = () => {
    if (firstFrameDrawn) return;
    if (!images[0]?.complete) return;
    firstFrameDrawn = true;
    resize();
    drawCover(images[0]);
  };

  const onFrameLoad = function() {
    loadedCount++;
    // Try to draw frame 0 whenever any image loads (in case frame 0 is now ready)
    drawFirstFrame();
    // Once all frames are loaded, set up ScrollTrigger
    if (loadedCount === FRAME_COUNT) {
      drawFirstFrame(); // Ensure first frame is visible
      setupScrollScrub();
    }
  };

  for (let i = 0; i < FRAME_COUNT; i++) {
    images[i] = new Image();
    images[i].onload = onFrameLoad;
    images[i].src = FRAME_PATH(i + 1);
  }

  resize();

  function setupScrollScrub() {
    const render = (progress) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progress * FRAME_COUNT)
      );
      if (frameIndex !== currentFrame) {
        currentFrame = frameIndex;
        drawCover(images[currentFrame]);
      }
    };

    gsap.to({ progress: 0 }, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => render(self.progress),
      },
    });
  }

  // Fade hero content on scroll
  gsap.to(".hero__content", {
    autoAlpha: 0, y: -60, ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "25% top", scrub: true },
  });

  // Un-fix hero elements when leaving hero section
  ScrollTrigger.create({
    trigger: "#hero", start: "top top", end: "bottom bottom",
    onLeave: () => gsap.set(["#hero-canvas", ".hero__overlay", ".hero__content"], { position: "absolute", top: "auto", bottom: 0 }),
    onEnterBack: () => gsap.set(["#hero-canvas", ".hero__overlay", ".hero__content"], { position: "fixed", top: 0, bottom: "auto" }),
  });
})();

// Project cards: reveal on scroll
gsap.utils.toArray(".project-card").forEach((card) => {
  gsap.to(card, {
    opacity: 1, y: 0, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
  });
});

// CTA reveal
gsap.from(".cta__title", {
  autoAlpha: 0, y: 40, duration: 0.8, ease: "power2.out",
  scrollTrigger: { trigger: ".cta", start: "top 80%", toggleActions: "play none none none" },
});
gsap.from(".cta__button", {
  autoAlpha: 0, scale: 0.9, duration: 0.6, delay: 0.2, ease: "back.out(1.7)",
  scrollTrigger: { trigger: ".cta", start: "top 75%", toggleActions: "play none none none" },
});

// Magnetic CTA Button
const ctaButton = document.querySelector('.cta__button');
if (ctaButton) {
  ctaButton.addEventListener('mousemove', (e) => {
    const rect = ctaButton.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(ctaButton, {
      x: x * 0.4,
      y: y * 0.4,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  ctaButton.addEventListener('mouseleave', () => {
    gsap.to(ctaButton, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
  });
}
