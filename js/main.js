gsap.registerPlugin(ScrollTrigger);

// Hero: scroll-driven video playback
(function initHeroVideo() {
  const video = document.getElementById("hero-video");
  if (!video) return;
  
  let isSetup = false;
  const setupVideoScroll = () => {
    if (isSetup) return;
    if (!video.duration || isNaN(video.duration)) return;
    isSetup = true;
    
    video.pause(); // Ensure it's not playing normally
    
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // Add a 1-second smooth catch-up lag
      onUpdate: (self) => {
        if (video.duration) {
          // Wrap in try-catch and requestAnimationFrame for smoother performance
          requestAnimationFrame(() => {
            try {
              // Play 100% of the video duration across the scroll
              video.currentTime = self.progress * video.duration;
            } catch(e) {}
          });
        }
      },
    });
  };

  // Try to set up immediately or wait for events
  if (video.readyState >= 1 && video.duration) {
    setupVideoScroll();
  } else {
    video.addEventListener("loadedmetadata", setupVideoScroll);
    video.addEventListener("canplay", setupVideoScroll);
  }
  
  // Kickstart video to bypass some browser autoplay policies
  setTimeout(() => {
    let playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => { video.pause(); setupVideoScroll(); }).catch(() => {});
    }
  }, 100);

  // Fade hero content on scroll
  gsap.to(".hero__content", {
    autoAlpha: 0, y: -60, ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "25% top", scrub: true },
  });

  // Un-fix hero elements when leaving hero section
  ScrollTrigger.create({
    trigger: "#hero", start: "top top", end: "bottom bottom",
    onLeave: () => gsap.set([".hero__video",".hero__overlay",".hero__content"], { position: "absolute", top: "auto", bottom: 0 }),
    onEnterBack: () => gsap.set([".hero__video",".hero__overlay",".hero__content"], { position: "fixed", top: 0, bottom: "auto" }),
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
