import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Data from "../data/mix-energie-gkwh.json"; // Assurez-vous que votre JSON est correctement importé

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
    <div>
      <h2>Émissions de CO2 (g/kWh) des Différentes Sources Énergétiques au Cours du Temps</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
