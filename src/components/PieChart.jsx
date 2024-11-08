import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (dataChart) => {
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

  const chartData = {
    labels: [
      "Nucléaire",
      "Énergies renouvelables (Solaire + Éolien + Hydro)",
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
        backgroundColor: ["#dcdc00", "#41cd41", "#3c3d3f", "#a106ef"],
        hoverBackgroundColor: ["#dcdc00", "#41cd41", "#3c3d3f", "#a106ef"],
      },
    ],
  };

  return (
    <>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <h2>Production électrique par type d&apos;énergie :</h2>
        <p>Mesurée en Térawattheure (TWh)</p>
        <p>Production totale en 2022 : {total.toFixed(2)} TWh</p>
        <Doughnut data={chartData} />
        <p>
          Ember (2024) – avec un traitement par{" "}
          <a
            href="https://ourworldindata.org/"
            target="_blank"
            rel="noreferrer"
          >
            Our World in Data
          </a>
        </p>
        <a
          href="https://ourworldindata.org/grapher/electricity-prod-source-stacked"
          target="_blank"
          rel="noreferrer"
        >
          Source des données
        </a>
      </div>
    </>
  );
};

export default PieChart;
