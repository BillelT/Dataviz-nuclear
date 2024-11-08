import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Data from "../data/mix-energie-gkwh.json"; // Assurez-vous que votre JSON est correctement importé
import "../stylesheets/LineChart.scss";
import "../stylesheets/App.scss";

// Enregistrer les composants utilisés de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [showData, setShowData] = useState(true);

  // Extraire les années et les valeurs pour chaque source d'énergie
  const years = Data.Years.map((item) => item.year); // Utilisation des années de l'énergie pétrolière comme labels communs

  // Convertir la chaîne "value" en nombre et récupérer les années pour chaque source d'énergie
  const convertToNumber = (value) =>
    parseInt(value.replace("g/Kwh", "").trim());

  const chartData = {
    labels: years, // Années comme labels
    datasets: [
      {
        label: "Pétrole", // Label de la série pour le pétrole
        data: showData
          ? Data.Oil.map((item) => convertToNumber(item.value))
          : [], // Données pour le pétrole
        borderColor: "rgb(29, 90, 114)", // Couleur de la ligne
        backgroundColor: "rgba(29, 90, 114, 0.2)", // Couleur de fond sous la ligne
        tension: 0.2, // Détermine la courbure de la ligne
      },
      {
        label: "Nucléaire", // Label de la série pour le nucléaire
        data: showData
          ? Data.Nuclear.map((item) => convertToNumber(item.value))
          : [], // Données pour le nucléaire
        borderColor: "rgb(223, 192, 36)", // Couleur de la ligne
        backgroundColor: "rgba(223, 192, 36, 0.2)", // Couleur de fond sous la ligne
        tension: 0.2, // Détermine la courbure de la ligne
      },
      {
        label: "Gaz", // Label de la série pour le gaz
        data: showData
          ? Data.Gaz.map((item) => convertToNumber(item.value))
          : [], // Données pour le gaz
        borderColor: "rgb(144, 115, 87)", // Couleur de la ligne
        backgroundColor: "rgba(144, 115, 87, 0.2)", // Couleur de fond sous la ligne
        tension: 0.2, // Détermine la courbure de la ligne
      },
      {
        label: "Solaire", // Label de la série pour le solaire
        data: showData
          ? Data.Solar.map((item) => convertToNumber(item.value))
          : [], // Données pour le solaire
        borderColor: "rgb(167, 46, 46)", // Couleur de la ligne
        backgroundColor: "rgba(167, 46, 46, 0.2)", // Couleur de fond sous la ligne
        tension: 0.2, // Détermine la courbure de la ligne
      },
      {
        label: "Éolienne", // Label de la série pour l'éolien
        data: showData
          ? Data.Eolian.map((item) => convertToNumber(item.value))
          : [], // Données pour l'éolien
        borderColor: "rgb(85, 164, 69)", // Couleur de la ligne
        backgroundColor: "rgba(85, 164, 69, 0.2)", // Couleur de fond sous la ligne
        tension: 0.2, // Détermine la courbure de la ligne
      },
      {
        label: "Charbon", // Label de la série pour le charbon
        data: showData
          ? Data.Coal.map((item) => convertToNumber(item.value))
          : [], // Données pour le charbon
        borderColor: "rgb(54, 54, 54)", // Couleur de la ligne
        backgroundColor: "rgba(54, 54, 54, 0.2)", // Couleur de fond sous la ligne
        tension: 0.2, // Détermine la courbure de la ligne
      },
    ],
  };

  // Options de configuration du graphique
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Année",
        },
      },
      y: {
        title: {
          display: true,
          text: "(g/kWh)",
        },
      },
    },
  };

  // État pour les chiffres animés
  const [compteurs, setCompteurs] = useState([0, 0, 0, 0, 0, 0]);

  const valeursCibles = [850, 590, 510, 250, 4, 250]; // Valeurs cibles pour les différents chiffres

  useEffect(() => {
    const intervalIds = valeursCibles.map((valeurCible, index) => {
      const increment = valeurCible / 100; // Incrément pour 1 secondes

      return setInterval(() => {
        setCompteurs((compteursActuels) => {
          const nouveauCompteurs = [...compteursActuels];

          if (nouveauCompteurs[index] + increment >= valeurCible) {
            nouveauCompteurs[index] = valeurCible;
            clearInterval(intervalIds[index]);
          } else {
            nouveauCompteurs[index] += increment;
          }

          return nouveauCompteurs;
        });
      }, 10);
    });

    return () => intervalIds.forEach(clearInterval); // Cleanup
  }, []);

  return (
    <section className="container p-top-bot-128 grid">
      <div className="graph grid-col-sm-12-ls-1-9">
        <div>
          <Line data={chartData} options={options} />
        </div>
      </div>
      <div className="grid row-gap-32 grid-col-12">
        <div className="grid-col-sm-12-ls-1-9">
          <h2>
            Émissions de CO2 (g/kWh) des Différentes Sources Énergétiques au
            Cours du Temps
          </h2>
          <p>
            Depuis la création de l'électricité, la production d'énergie a
            évolué au fil des années, chaque source ayant ses avantages et
            inconvénients en termes d'émissions de CO2. Le charbon reste l'une
            des plus polluantes avec environ{" "}
            <span>{Math.floor(compteurs[0])}g</span> de CO2 par kWh, tandis que
            le pétrole émet <span>{Math.floor(compteurs[1])}g</span> par kWh,
            contribuant aussi fortement au réchauffement climatique. Le gaz
            naturel, bien que plus "propre" avec environ{" "}
            <span>{Math.floor(compteurs[2])}g</span> de CO2 par kWh, demeure une
            source de pollution fossile.
          </p>
          <p>
            Les énergies renouvelables comme l'éolien (environ{" "}
            <span>{Math.floor(compteurs[3])}g</span> de CO2 par kWh) et le
            solaire (environ <span>{Math.floor(compteurs[5])}g</span> de CO2 par
            kWh) sont des alternatives à faible empreinte carbone, bien que leur
            intermittence pose des défis techniques. Le nucléaire, avec
            seulement <span>{Math.floor(compteurs[4])}g</span> de CO2 par kWh,
            produit de l'électricité de manière stable et abondante, mais
            soulève des questions de sécurité et de gestion des déchets.
          </p>
          <p>
            Aujourd'hui, face à l'urgence climatique, les énergies fossiles sont
            progressivement remplacées par des sources renouvelables et le
            nucléaire, permettant de réduire les émissions et de favoriser une
            transition énergétique vers un avenir plus durable.
          </p>
          <h3>Le Nucléaire: Un frein historique</h3>
          <p>
            Si de nos jours le développement du nucléaire a été freiné c'est
            essentiellement dû aux accidents qui ont marqué l'histoire comme
            Tchernobyl en 1986 et Fukushima en 2011. Rappelant les risques
            élevés associés à cette technologie et incitant de nombreux pays à
            revoir ou ralentir leurs programmes nucléaires.
          </p>
        </div>
        <div className="value grid-col-sm-12-ls-11-13">
          <div className="result">
            <h2>Pétrole</h2>
            <h1>
              <span className="lime-text">{Math.floor(compteurs[0])}g</span>
            </h1>
            <h3>de CO2</h3>
          </div>
          <div className="result">
            <h2>Nucléaire</h2>
            <h1>
              <span className="lime-text">{Math.floor(compteurs[4])}g</span>
            </h1>
            <h3>de CO2</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LineChart;
