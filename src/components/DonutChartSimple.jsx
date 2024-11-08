import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChartSimple = () => {
  const chartData = {
    labels: [
      "Nucléaire",
      "Énergies renouvelables",
      "Énergies fossiles (Charbon + Gaz + Pétrole)",
    ],
    datasets: [
      {
        label: " % ",
        data: [3.397, 7.479 + 6.734, 31.569 + 23.49 + 26.731],
        backgroundColor: ["#dcdc00", "#41cd41", "#3c3d3f"],
        hoverBackgroundColor: ["#dcdc00", "#41cd41", "#3c3d3f"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      tooltip: {
        bodyColor: "white",
        titleColor: "white",
      },
    },
  };

  return (
    <>
      <div style={{ width: "100%", margin: "0" }} className="chart-simple">
        <Doughnut data={chartData} options={chartOptions} />
        <p>Mix énergétique mondial, 2022</p>
      </div>
    </>
  );
};

export default DonutChartSimple;
