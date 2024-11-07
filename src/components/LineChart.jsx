import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Enregistrer les composants utilisés de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(true);

  useEffect(() => {
    // Charger les données depuis le fichier JSON
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Erreur lors du chargement des données : ", error));
  }, []);

  // Construire les données pour le graphique
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Nucléaire",
        data: showData ? data.map((item) => item.value) : [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.2,
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
      <h2>Évolution de la valeur en g/kWh</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
