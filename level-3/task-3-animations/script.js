const replay = document.querySelector("#replay");
const roomIndex = document.querySelector("#room-index");

function introTimeline() {
  return gsap
    .timeline({ defaults: { ease: "power4.out" } })
    .from(".hero-line", { yPercent: 110, duration: 1.05, stagger: 0.12 })
    .from(".hero-sub", { y: 28, autoAlpha: 0, duration: 0.7 }, "-=0.45")
    .from(".cue", { autoAlpha: 0, y: 12, duration: 0.45 }, "-=0.2")
    .from(".cue i", { scaleY: 0, duration: 0.7, ease: "power2.inOut" }, "<");
}

function playIntro() {
  gsap.killTweensOf(".hero-line, .hero-sub, .cue");
  gsap.set(".hero-line, .hero-sub, .cue", { clearProps: "all" });
  introTimeline();
}

window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  const motion = gsap.matchMedia();

  motion.add("(prefers-reduced-motion: no-preference)", () => {
    playIntro();
    replay.addEventListener("click", playIntro);

    const hero = document.querySelector(".hero");
    const orbX = gsap.quickTo(".orb", "x", { duration: 0.7, ease: "power3.out" });
    const orbY = gsap.quickTo(".orb", "y", { duration: 0.7, ease: "power3.out" });
    const onPointer = (event) => {
      const box = hero.getBoundingClientRect();
      orbX(event.clientX - box.left);
      orbY(event.clientY - box.top);
    };
    hero.addEventListener("pointermove", onPointer);

    gsap.to(".progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });

    gsap.to(".glow", {
      opacity: 0.45,
      duration: 1.6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.4,
    });

    const track = document.querySelector(".track");
    const pin = document.querySelector(".pin");
    const panels = gsap.utils.toArray(".panel");
    const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);
    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".pin",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        end: () => "+=" + distance(),
        onUpdate: (self) => {
          const index = Math.min(panels.length - 1, Math.floor(self.progress * panels.length));
          roomIndex.textContent = String(index + 1).padStart(2, "0");
        },
      },
    });

    gsap.set(".scrub-word", { y: 28, opacity: 0.16 });
    gsap.to(".scrub-word", {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      ease: "none",
      scrollTrigger: {
        trigger: ".scrub",
        start: "top 75%",
        end: "bottom 55%",
        scrub: true,
      },
    });

    document.querySelectorAll(".object").forEach((card) => {
      const more = card.querySelector(".object-more");
      const visual = card.querySelector(".object-visual");
      const open = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      open
        .to(more, { maxHeight: 96, autoAlpha: 1, duration: 0.45 })
        .to(visual, { scale: 1.06, duration: 0.45 }, 0);

      const tilt = (event) => {
        const box = card.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        gsap.to(card, {
          rotateY: x * 12,
          rotateX: y * -10,
          duration: 0.35,
          ease: "power2.out",
          transformPerspective: 800,
        });
      };

      card.addEventListener("pointermove", tilt);
      card.addEventListener("pointerleave", () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power3.out" });
      });
      card.addEventListener("click", () => {
        const next = !card.classList.contains("is-open");
        card.classList.toggle("is-open", next);
        card.setAttribute("aria-expanded", String(next));
        if (next) open.play();
        else open.reverse();
      });
    });

    const marquee = gsap.to(".marquee-track", {
      xPercent: -50,
      ease: "none",
      duration: 18,
      repeat: -1,
    });
    const marqueeEl = document.querySelector(".marquee");
    marqueeEl.addEventListener("pointerenter", () => {
      gsap.to(marquee, { timeScale: 0.15, duration: 0.4 });
    });
    marqueeEl.addEventListener("pointerleave", () => {
      gsap.to(marquee, { timeScale: 1, duration: 0.4 });
    });

    return () => {
      hero.removeEventListener("pointermove", onPointer);
      replay.removeEventListener("click", playIntro);
    };
  });
});
