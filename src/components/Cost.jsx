import { useState } from "react";
import costByEnergy from "../data/costByEnergy.json";
import "../stylesheets/Cost.scss";

function Cost() {
  // État pour l'énergie sélectionnée (index: 1 pour pétrole, 2 pour charbon, etc.)
  const [selectedEnergy, setSelectedEnergy] = useState(1);

  // Fonction de sélection d'énergie
  const handleEnergyClick = (index) => {
    setSelectedEnergy(index); // Met à jour l'énergie sélectionnée uniquement pour la liste
  };

  // Fonction pour générer une classe CSS basée sur l'énergie sélectionnée
  const getEnergyClass = (energyIndex) => `energy-style-${energyIndex}`;

  return (
    <>
      <section
        className="darkgreen-bg container p-top-bot-128 grid row-gap-128 relative"
        id="cost"
      >
        <div className="grid-col-sm-12-ls-1-9">
          <h2 className="article-title">Title</h2>
          <p className="article-chapeau">
            Chapeau Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Architecto incidunt vero quam expedita illo excepturi labore quaerat
            doloribus temporibus nesciunt sequi vel ab, eveniet doloremque
            magni, quidem explicabo sint nulla itaque voluptate omnis, obcaecati
            animi blanditiis. Accusantium nesciunt libero minus.
          </p>
        </div>
        <article className="grid-col-12 grid col-gap-20">
          <div className="test grid-col-sm-12-ls-1-4"></div>
          <p className="grid-col-sm-12-ls-4-9 data-text">
            Le cout de pour éclairer Paris pendant 1 année est de{" "}
            <span className={`data-value ${getEnergyClass(selectedEnergy)}`}>
              {costByEnergy.lightParis[selectedEnergy].cost}€
            </span>{" "}
            en produisant cette énergie avec{" "}
            {costByEnergy.lightParis[selectedEnergy].type}.
          </p>
        </article>
        <div className="grid-col-sm-12-ls-1-9">
          <p className="font-size-16">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
            rerum numquam assumenda deleniti fuga libero exercitationem nobis
            provident aliquid quam ratione, tempora laborum vitae sunt, ullam
            nam, distinctio consequatur minima error molestias deserunt
            obcaecati architecto laudantium cumque! Non animi error pariatur,
            facilis ratione sapiente explicabo magni dolores saepe fugiat esse.
          </p>
        </div>
        <article className="grid-col-12 grid col-gap-20">
          <div className="test grid-col-sm-12-ls-1-4"></div>
          <p className="grid-col-sm-12-ls-4-9 data-text">
            Le cout de pour éclairer Paris pendant 1 année est de{" "}
            <span className={`data-value ${getEnergyClass(selectedEnergy)}`}>
              {costByEnergy.yearShower[selectedEnergy].cost}€
            </span>{" "}
            en produisant cette énergie avec{" "}
            {costByEnergy.yearShower[selectedEnergy].type}.
          </p>
        </article>
        <div className="grid-col-sm-12-ls-1-9">
          <h3 className="article-subtitle">Subtitle</h3>
          <p className="font-size-16">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
            rerum numquam assumenda deleniti fuga libero exercitationem nobis
            provident aliquid quam ratione, tempora laborum vitae sunt, ullam
            nam, distinctio consequatur minima error molestias deserunt
            obcaecati architecto laudantium cumque! Non animi error pariatur,
            facilis ratione sapiente explicabo magni dolores saepe fugiat esse.
          </p>
        </div>
        <article className="grid-col-12 grid col-gap-20">
          <div className="test grid-col-sm-12-ls-1-4"></div>
          <p className="grid-col-sm-12-ls-4-9 data-text">
            Le cout de pour éclairer Paris pendant 1 année est de{" "}
            <span className={`data-value ${getEnergyClass(selectedEnergy)}`}>
              {costByEnergy.yearPhone[selectedEnergy].cost}€
            </span>{" "}
            en produisant cette énergie avec{" "}
            {costByEnergy.yearPhone[selectedEnergy].type}.
          </p>
        </article>
        {/* Liste de choix des énergies avec état interactif */}
        <div className="choice darkgreen-bg">
          <ul className="flex  choice-list">
            {Object.keys(costByEnergy.lightParis).map((key, index) => (
              <li
                key={index}
                className={`lime-bg energy-option ${
                  selectedEnergy === parseInt(key) ? "selected" : ""
                }`}
                onClick={() => handleEnergyClick(parseInt(key))}
              >
                {costByEnergy.lightParis[key].type}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Cost;
