import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import metadata from "../data/electricity-prod-source-stacked.metadata.json";
import showdown from "showdown";

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (dataChart) => {
  console.log(dataChart["data"]);
  const total =
    parseFloat(dataChart["data"]["Other renewables excluding bioenergy"]) +
    parseFloat(dataChart["data"]["bioenergy"]) +
    parseFloat(dataChart["data"]["hydro"]) +
    parseFloat(dataChart["data"]["solar"]) +
    parseFloat(dataChart["data"]["wind"]) +
    parseFloat(dataChart["data"]["oil"]) +
    parseFloat(dataChart["data"]["gas"]) +
    parseFloat(dataChart["data"]["coal"]) +
    parseFloat(dataChart["data"]["nuclear"]);

  console.log(total);

  const chartData = {
    labels: [
      "Nucléaire",
      "Énergies renouvelables (Solaire + Éolien + Hydraulique)",
      "Énergies fossiles (Charbon + Gaz + Pétrole)",
      "Autres (Bioénergies + autres renouvelables)",
    ],
    datasets: [
      {
        label: " % ",
        data: [
          (parseFloat(dataChart["data"]["nuclear"]) / total) * 100,
          ((parseFloat(dataChart["data"]["solar"]) +
            parseFloat(dataChart["data"]["wind"]) +
            parseFloat(dataChart["data"]["hydro"])) /
            total) *
            100,
          ((parseFloat(dataChart["data"]["oil"]) +
            parseFloat(dataChart["data"]["gas"]) +
            parseFloat(dataChart["data"]["coal"])) /
            total) *
            100,
          ((parseFloat(
            dataChart["data"]["Other renewables excluding bioenergy"]
          ) +
            parseFloat(dataChart["data"]["bioenergy"])) /
            total) *
            100,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
      },
    ],
  };
  var converter = new showdown.Converter();
  var html = converter.makeHtml(metadata["chart"]["subtitle"]);
  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h2>Production électrique par type d&apos;énergie :</h2>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
      <Doughnut data={chartData} />
    </div>
  );
};

export default PieChart;
