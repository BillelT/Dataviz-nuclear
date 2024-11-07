import "../stylesheets/Cost.scss";
import costByEnergy from "../data/costByEnergy.json";

function Cost() {
  return (
    <>
      <section className="darkgreen-bg container p-top-bot-128 grid">
        <div className="grid-col-sm-12-ls-1-9">
          <h2>Title</h2>
          <p>
            Chapeau Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Architecto incidunt vero quam expedita illo excepturi labore quaerat
            doloribus temporibus nesciunt sequi vel ab, eveniet doloremque
            magni, quidem explicabo sint nulla itaque voluptate omnis, obcaecati
            animi blanditiis. Accusantium nesciunt libero minus.
          </p>
        </div>
        <article className="grid-col-sm-12-ls-1-9">
          <p>
            Le cout de pour éclairer Paris pendant 1 année est de{" "}
            {costByEnergy.lightParis[1].cost}€ en produisant cette énergie avec{" "}
            {costByEnergy.lightParis[1].type}
          </p>
        </article>
      </section>
    </>
  );
}

export default Cost;
