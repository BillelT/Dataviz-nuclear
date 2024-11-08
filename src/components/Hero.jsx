import "../stylesheets/Hero.scss";

function Hero() {
  return (
    <>
      <section className="darkgreen-bg container flex flex-center flex-d-col p-top-bot-256 row-gap-32">
        <span className="text-center hero-text">Le</span>
        <h1 className="lime-text text-center archivo font-weight-900">
          <span className=" archivo font-weight-900">NUC</span>LÉAIRE
        </h1>
        <span className="text-center hero-text">est-il la solution ?</span>
      </section>
    </>
  );
}

export default Hero;
