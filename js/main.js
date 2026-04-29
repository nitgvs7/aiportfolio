const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = Boolean(window.gsap && window.ScrollTrigger);

if (hasGsap) {
  gsap.registerPlugin(ScrollTrigger);
}

// Hero: scrub the video timeline forward and backward with scroll.
(function initHeroVideoScrub() {
  const video = document.querySelector(".hero__video");
  const hero = document.querySelector("#hero");
  const content = document.querySelector(".hero__content");
  if (!video) return;

  if (prefersReducedMotion) {
    video.pause();
    return;
  }

  const setupScrub = () => {
    video.autoplay = false;
    video.loop = false;
    video.pause();
    video.currentTime = 0;

    const duration = () => Math.max((video.duration || 0) - 0.02, 0);
    const setVideoProgress = (progress) => {
      video.pause();
      video.currentTime = progress * duration();
    };

    if (hasGsap) {
      ScrollTrigger.create({
        id: "hero-video-scrub",
        trigger: "#hero",
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        refreshPriority: 0,
        onUpdate: (self) => setVideoProgress(self.progress),
      });

      ScrollTrigger.refresh();
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const scrollRange = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const rawProgress = (window.scrollY - hero.offsetTop) / scrollRange;
      const progress = Math.min(1, Math.max(0, rawProgress));
      setVideoProgress(progress);

      if (content) {
        content.style.opacity = String(1 - progress);
        content.style.transform = `translateY(${-40 * progress}px)`;
      }
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  };

  if (video.readyState >= 1) {
    setupScrub();
  } else {
    video.addEventListener("loadedmetadata", setupScrub, { once: true });
  }
})();

// Fade hero content on scroll.
if (!prefersReducedMotion && hasGsap) {
  gsap.to(".hero__content", {
    autoAlpha: 0,
    y: -40,
    ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
  });
}

// Project cards: reveal on scroll
if (hasGsap) {
  gsap.utils.toArray(".project-card").forEach((card) => {
    gsap.fromTo(card, {
      autoAlpha: 1,
      y: 32,
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
    });
  });

  // CTA button reveal
  gsap.from(".cta__button", {
    autoAlpha: 0, scale: 0.9, duration: 0.6, delay: 0.2, ease: "back.out(1.7)",
    scrollTrigger: { trigger: ".cta", start: "top 75%", toggleActions: "play none none none" },
  });
}

// Magnetic CTA Button
const ctaButton = document.querySelector('.cta__button');
if (ctaButton) {
  ctaButton.addEventListener('mousemove', (e) => {
    const rect = ctaButton.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    if (hasGsap) {
      gsap.to(ctaButton, {
        x: x * 0.4,
        y: y * 0.4,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  });

  ctaButton.addEventListener('mouseleave', () => {
    if (hasGsap) {
      gsap.to(ctaButton, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    }
  });
}

if (hasGsap) {
  window.addEventListener("load", () => ScrollTrigger.refresh());
}
