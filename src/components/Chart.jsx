import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Data from "../data/mix-energie-gkwh.json"; // Assurez-vous que votre JSON est correctement importé
import "../stylesheets/Chart.scss";

// Enregistrer les composants utilisés de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const [showData, setShowData] = useState(true);

  // Extraire les années et les valeurs pour chaque source d'énergie
  const years = Data.Years.map((item) => item.year); // Utilisation des années de l'énergie pétrolière comme labels communs

  // Convertir la chaîne "value" en nombre et récupérer les années pour chaque source d'énergie
  const convertToNumber = (value) => parseInt(value.replace('g/Kwh', '').trim());

  const chartData = {
    labels: years, // Années comme labels
    datasets: [
      {
        label: "Pétrole", // Label de la série pour le pétrole
        data: showData ? Data.Oil.map((item) => convertToNumber(item.value)) : [], // Données pour le pétrole
        borderColor: "rgb(29, 90, 114)", // Couleur de la ligne
        backgroundColor: "rgba(29, 90, 114, 0.2)", // Couleur de fond sous la ligne
        tension: 0.2, // Détermine la courbure de la ligne
      },
      {
        label: "Nucléaire", // Label de la série pour le nucléaire
        data: showData ? Data.Nuclear.map((item) => convertToNumber(item.value)) : [], // Données pour le nucléaire
        borderColor: "rgb(223, 192, 36)", // Couleur de la ligne
        backgroundColor: "rgba(223, 192, 36, 0.2)", // Couleur de fond sous la ligne
        tension: 0.2, // Détermine la courbure de la ligne
      },
      {
        label: "Gaz", // Label de la série pour le gaz
        data: showData ? Data.Gaz.map((item) => convertToNumber(item.value)) : [], // Données pour le gaz
        borderColor: "rgb(144, 115, 87)", // Couleur de la ligne
        backgroundColor: "rgba(144, 115, 87, 0.2)", // Couleur de fond sous la ligne
        tension: 0.2, // Détermine la courbure de la ligne
      },
      {
        label: "Solaire", // Label de la série pour le solaire
        data: showData ? Data.Solar.map((item) => convertToNumber(item.value)) : [], // Données pour le solaire
        borderColor: "rgb(167, 46, 46)", // Couleur de la ligne
        backgroundColor: "rgba(167, 46, 46, 0.2)", // Couleur de fond sous la ligne
        tension: 0.2, // Détermine la courbure de la ligne
      },
      {
        label: "Éolienne", // Label de la série pour l'éolien
        data: showData ? Data.Eolian.map((item) => convertToNumber(item.value)) : [], // Données pour l'éolien
        borderColor: "rgb(85, 164, 69)", // Couleur de la ligne
        backgroundColor: "rgba(85, 164, 69, 0.2)", // Couleur de fond sous la ligne
        tension: 0.2, // Détermine la courbure de la ligne
      },
      {
        label: "Charbon", // Label de la série pour le charbon
        data: showData ? Data.Coal.map((item) => convertToNumber(item.value)) : [], // Données pour le charbon
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

  return (
    <section className="container">
      <div className="graph">
        <Line data={chartData} options={options} />
      </div>
      <div className="article">
        <h2>Émissions de CO2 (g/kWh) des Différentes Sources Énergétiques au Cours du Temps</h2>
        <p>
          Depuis la création de l’électricité, la production d'énergie a évolué au fil des années, 
          chaque source ayant ses avantages et inconvénients en termes d'émissions de CO2. 
          Le <strong>charbon</strong> reste l’une des plus polluantes avec environ 850 g de CO2 par kWh, 
          tandis que le <strong>pétrole</strong> émet 590 g par kWh, contribuant aussi fortement au réchauffement climatique. 
          Le <strong>gaz naturel</strong>, bien que plus "propre" avec environ 510 g de CO2 par kWh, demeure une source de pollution fossile.
        </p>
        <p>
          Les <strong>énergies renouvelables</strong> comme <strong>l'éolien</strong> (environ 250 g de CO2 par kWh) et le <strong>solaire</strong> 
          (environ 250g de CO2 par kWh) sont des alternatives à faible empreinte carbone, 
          bien que leur intermittence pose des défis techniques. Le <strong>nucléaire</strong>, avec seulement 4 g de CO2 par kWh, 
          produit de l'électricité de manière stable et abondante, 
          mais soulève des questions de sécurité et de gestion des déchets.
        </p>
        <p>
          Aujourd'hui, face à l'urgence <strong>climatique</strong>, les énergies fossiles sont progressivement remplacées par 
          des <strong>sources renouvelables</strong> et le <strong>nucléaire</strong>, permettant de réduire les émissions et de 
          favoriser une transition énergétique vers un avenir plus <strong>durable</strong>.
        </p>
        <h3>Le Nucléaire: Un frein historique</h3>
        <p>
          Si de nos jours le développement du <strong>nucléaire</strong> à été freiné c’est essentiellement dû aux accidents qui ont marqué 
          l’histoire comme <strong>Tchernobyl</strong> en 1986 et <strong>Fukushima</strong> en 2011. Rappelant les risques élevés associés à cette technologie 
          et incitant de nombreux pays à revoir ou ralentir leurs programmes <strong>nucléaire</strong>.
        </p>
      </div>
    </section>
  );
};

export default LineChart;
