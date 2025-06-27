import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".animated",
      start: "top center",
      end: "bottom center",
      scrub: true,
      markers: true,
    },
  });

  tl.from(".animated", {
    x: "-100%",
    duration: 4,
    ease: "power1.out",
  });

  const lenis = new Lenis({
    duration: 1.3,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
});
