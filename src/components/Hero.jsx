import { useRef } from "react";
// import gsap from "gsap";
import "../stylesheets/Hero.scss";

function Hero() {
  const firstPartTitle = useRef();
  const secondPartTitle = useRef();

  return (
    <>
      <section className="darkgreen-bg container flex flex-center flex-d-col p-top-bot-256 row-gap-32">
        <span className="text-center hero-text">Le</span>
        <h1 className="lime-text text-center archivo font-weight-900">
          <span ref={firstPartTitle} className="archivo font-weight-900">
            NUC
          </span>
          <span ref={secondPartTitle} className="archivo font-weight-900">
            LÉAIRE
          </span>
        </h1>
        <span className="text-center hero-text">est-il la solution ?</span>
      </section>
    </>
  );
}

export default Hero;
