import { useRef, useEffect } from "react";
import "../stylesheets/Hero.scss";
import { gsap } from "gsap";
import SplitType from "split-type";

gsap.registerPlugin();

function Hero() {
  const textToSplit = useRef(null);
  const le = useRef(null);
  const solve = useRef(null);

  useEffect(() => {
    if (textToSplit.current && le.current) {
      const text = new SplitType(textToSplit.current, { types: "chars" });

      const tl = gsap.timeline();

      tl.from(text.chars, {
        duration: 0.8,
        y: 70,
        opacity: 0,
        stagger: 0.04,
        ease: "power2.out",
        delay: 0.5,
      });

      gsap.fromTo(
        [le.current, solve.current],
        {
          y: 50,
          opacity: 0,
        },
        {
          duration: 0.8,
          y: 0,
          opacity: 1,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    }
  }, [textToSplit, le]);

  return (
    <section className="darkgreen-bg container flex flex-center flex-d-col p-top-bot-256 row-gap-32">
      <div className="span-container text-center hero-text">
        <span className="le" ref={le}>
          Le
        </span>
      </div>
      <div className="h1-container">
        <h1 className="lime-text text-center archivo font-weight-900">
          <span ref={textToSplit} className="archivo font-weight-900">
            NUCLÉAIRE
          </span>
        </h1>
      </div>
      <span className="text-center hero-text" ref={solve}>
        est-il la solution ?
      </span>
    </section>
  );
}

export default Hero;
