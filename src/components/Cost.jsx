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
          <h2 className="article-title">
            Le coût des énergies, un frein à la décarbonation ?
          </h2>
          <p className="article-chapeau">
            Bien que ce sujet soit largement abordé ces dernières années, une
            certaine désinformation persiste dans l'esprit collectif concernant
            les coûts de production d'énergie selon les sources utilisées.
          </p>
        </div>
        <article className="grid-col-12 grid col-gap-20">
          <div className=" grid-col-sm-12-ls-1-4 img-container">
            <img
              src="/images/cost/Paris Vector.png"
              className="cost-images img-container w-100-p"
              alt="Icône de Paris éclairé"
            />
          </div>
          <p className="grid-col-sm-12-ls-4-9 data-text">
            Le cout de pour éclairer Paris pendant 1 année est de{" "}
            <span className={`data-value ${getEnergyClass(selectedEnergy)}`}>
              {costByEnergy.lightParis[selectedEnergy].cost}€
            </span>{" "}
            en produisant cette énergie avec{" "}
            {costByEnergy.lightParis[selectedEnergy].type}.
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
        <div className="grid-col-sm-12-ls-1-9">
          <p className="font-size-16">
            En mars 2024, 89 % des citoyens français interrogés ont déclaré que
            les énergies renouvelables (EnR) étaient trop onéreuses, et 60 %
            estiment qu'elles restent difficiles à installer (13ᵉ sondage annuel
            “Les Français et les énergies renouvelables” réalisé par OpinionWay
            pour Qualit'EnR. 2 500 personnes ont été interrogées selon la
            méthode des quotas (sexe, âge, région, catégorie
            socio-professionnelle)). Cette perception erronée laisse penser que
            le coût de construction des infrastructures d'énergie verte freine
            les avancées écologiques, alors que la réalité est toute autre. Ces
            infrastructures ne sont en réalité pas plus coûteuses que la
            construction de centrales nucléaires. De plus, les énergies fossiles
            sont de plus en plus difficiles à exploiter et comportent des
            risques élevés. Quant au nucléaire, bien qu'il jouisse d'une
            meilleure perception que les énergies fossiles, sa compétitivité est
            à relativiser, comme le montrent les dernières données disponibles.
          </p>
        </div>
        <article className="grid-col-12 grid col-gap-20">
          <div className=" grid-col-sm-12-ls-1-4 img-container">
            <img src="/images/cost/shower.png" alt="shower icon" />
          </div>
          <p className="grid-col-sm-12-ls-4-9 data-text">
            Le cout de pour 1 année de douche quotidienne est de{" "}
            <span className={`data-value ${getEnergyClass(selectedEnergy)}`}>
              {costByEnergy.yearShower[selectedEnergy].cost}€
            </span>{" "}
            en produisant cette énergie avec{" "}
            {costByEnergy.yearShower[selectedEnergy].type}.
          </p>
        </article>
        <div className="grid-col-sm-12-ls-1-9">
          <h3 className="article-subtitle">Une avancée collective</h3>
          <p className="font-size-16">
            Heureusement, la prise de conscience générale évolue, et des
            distinctions se dessinent. L'énergie solaire et l'éolien émergent
            comme des solutions compétitives et commencent à briser le mythe des
            EnR coûteuses. En revanche, les actions et efforts individuels
            contre la surconsommation sont encore souvent sous-estimés. Par
            exemple, le coût annuel de recharge d'un smartphone est de quelques
            centimes seulement. À l'échelle d'une ville comme Paris, en
            revanche, le passage aux énergies vertes pourrait permettre de
            réaliser des économies substantielles, en réduisant à la fois les
            coûts énergétiques et l'empreinte carbone de façon significative.
          </p>
        </div>
        <article className="grid-col-12 grid col-gap-20">
          <div className=" grid-col-sm-12-ls-1-4 img-container">
            <img
              src="/images/cost/phone.png"
              alt="phone icon"
              className="cost-images img-container"
            />
          </div>
          <p className="grid-col-sm-12-ls-4-9 data-text">
            Le cout de pour recharger son smartphone pendant 1 année est de{" "}
            <span className={`data-value ${getEnergyClass(selectedEnergy)}`}>
              {costByEnergy.yearPhone[selectedEnergy].cost}€
            </span>{" "}
            en produisant cette énergie avec{" "}
            {costByEnergy.yearPhone[selectedEnergy].type}.
          </p>
        </article>
      </section>
    </>
  );
}

export default Cost;
