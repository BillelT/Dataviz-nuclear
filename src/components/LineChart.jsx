import React, { useState, useRef, useEffect } from "react";
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
gsap.registerPlugin(ScrollTrigger);

const LineChart = () => {
  const [showData] = useState(true);

  // Références pour chaque chiffre
  const refCompteurs = useRef([]);

  const years = Data.Years.map((item) => item.year);
  const convertToNumber = (value) => parseInt(value.replace("g/Kwh", "").trim());

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Pétrole",
        data: showData ? Data.Oil.map((item) => convertToNumber(item.value)) : [],
        borderColor: "rgb(35, 101, 232)",
        backgroundColor: "rgba(35, 101, 232, 0.2)",
        tension: 0.2,
      },
      {
        label: "Nucléaire",
        data: showData ? Data.Nuclear.map((item) => convertToNumber(item.value)) : [],
        borderColor: "rgb(220, 220, 0)",
        backgroundColor: "rgba(220, 220, 0, 0.2)",
        tension: 0.2,
      },
      {
        label: "Gaz",
        data: showData ? Data.Gaz.map((item) => convertToNumber(item.value)) : [],
        borderColor: "rgb(204, 5, 5)",
        backgroundColor: "rgba(204, 5, 5, 0.2)",
        tension: 0.2,
      },
      {
        label: "Éolien et Solaire",
        data: showData ? Data.Eolian.map((item) => convertToNumber(item.value)) : [],
        borderColor: "rgb(18, 222, 154)",
        backgroundColor: "rgba(18, 222, 154, 0.2)",
        tension: 0.2,
      },
      {
        label: "Charbon",
        data: showData ? Data.Coal.map((item) => convertToNumber(item.value)) : [],
        borderColor: "rgb(108, 115, 128)",
        backgroundColor: "rgba(108, 115, 128, 0.2)",
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

  useEffect(() => {
    const resultDivs = document.querySelectorAll(".result");
    resultDivs.forEach((resultDiv) => {
        gsap.fromTo(
            resultDiv,
            {
                x: "+100vw", // Démarre en dehors de l'écran à gauche
                opacity: 0,
                position: "relative",
            },
            {
                x: 0, // Se déplace vers la position normale
                opacity: 1,
                duration: 1.5, // Durée de l'animation
                ease: "power2.out", // Type de transition
                scrollTrigger: {
                    trigger: resultDiv,
                    start: "top 80%", // L'animation se déclenche lorsque l'élément entre à 80% dans la fenêtre
                    toggleActions: "play none none none", // Action quand l'élément devient visible
                },
            }
        );
    });

    // Animation des valeurs numériques
    refCompteurs.current.forEach((compteur) => {
      if (compteur) {
        gsap.fromTo(
          compteur,
          { innerText: 0 }, // Valeur de départ
          {
            innerText: parseInt(compteur.getAttribute('data-target')), // Valeur finale
            duration: 2, // Durée de l'animation
            ease: "power2.out",
            onUpdate: function () {
              compteur.innerText = Math.floor(this.targets()[0].innerText);
            },
            scrollTrigger: {
              trigger: compteur,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section className="container p-top-bot-128 grid" id="yield">
      <div className="graph grid-col-sm-12-ls-1-9">
        <h2 className="article-title">
          Émissions de CO2 (g/kWh) des Différentes Sources Énergétiques au
          Cours du Temps dans le Monde
        </h2>
        <div>
          <Line data={chartData} options={options} />
        </div>
      </div>
      <div className="grid row-gap-32 grid-col-12">
        <div className="container-articles grid-col-sm-12-ls-1-9">
          <p className="font-size-16 p-bot-16">
            Depuis la création de l'électricité, la production d'énergie a
            évolué au fil des années, chaque source ayant ses avantages et
            inconvénients en termes d'émissions de CO2. Le charbon reste l'une
            des plus polluantes avec environ <span className="coal-color" ref={(el) => (refCompteurs.current[5] = el)} data-target="850">0</span>g de CO2 par kWh, tandis que
            le pétrole émet <span className="oil-color" ref={(el) => (refCompteurs.current[6] = el)} data-target="590">0</span>g par kWh,
            contribuant aussi fortement au réchauffement climatique. Le gaz
            naturel, bien que plus "propre" avec environ <span className="gaz-color" ref={(el) => (refCompteurs.current[7] = el)} data-target="510">0</span>g de CO2 par kWh, demeure une
            source de pollution fossile.
          </p>
          <p className="font-size-16 p-bot-16">
            Les énergies renouvelables comme l'éolien (environ <span className="eolian-color" ref={(el) => (refCompteurs.current[4] = el)} data-target="250">0</span>g de CO2 par kWh) et le
            solaire (environ <span className="solar-color" ref={(el) => (refCompteurs.current[3] = el)} data-target="250">0</span>g de CO2 par
            kWh) sont des alternatives à faible empreinte carbone, bien que leur
            intermittence pose des défis techniques. Le nucléaire, avec
            seulement <span className="nuclear-color" ref={(el) => (refCompteurs.current[2] = el)} data-target="4"> 0</span>g de CO2 par kWh,
            produit de l'électricité de manière stable et abondante, mais
            soulève des questions de sécurité et de gestion des déchets.
          </p>
          <p className="font-size-16 p-bot-16">
            Aujourd'hui, face à l'urgence climatique, les énergies fossiles sont
            progressivement remplacées par des sources renouvelables et le
            nucléaire, permettant de réduire les émissions et de favoriser une
            transition énergétique vers un avenir plus durable.
          </p>
          <h3 className="article-subtitle">
            Le Nucléaire: Un frein historique
          </h3>
          <p className="font-size-16">
            Si de nos jours le développement du nucléaire a été freiné c'est
            essentiellement dû aux accidents qui ont marqué l'histoire comme
            Tchernobyl en 1986 et Fukushima en 2011. Rappelant les risques
            élevés associés à cette technologie et incitant de nombreux pays à
            revoir ou ralentir leurs programmes nucléaires.
          </p>
        </div>
        <div className="value grid-col-sm-12-ls-11-13">
          <div className="result">
            <h2>Charbon</h2>
            <h1 className="coal-color">
              <span ref={(el) => (refCompteurs.current[0] = el)} data-target="850">0</span>g
            </h1>
            <h3>de CO2</h3>
          </div>
          <div className="result">
            <h2>Nucléaire</h2>
            <h1 className="nuclear-color">
              <span ref={(el) => (refCompteurs.current[1] = el)} data-target="4">0</span>g
            </h1>
            <h3>de CO2</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LineChart;
