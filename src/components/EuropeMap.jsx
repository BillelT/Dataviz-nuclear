import { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PieChart from "./PieChart";
import geojsonFeature from "../data/europe.json";
import euroCountries from "../data/euro-countries.json";
import emissions from "../data/emissions-per-capita2022.json";
import mix from "../data/mix-energy-type-countries.json";
import countriesFr from "../data/countries-fr.json";
import "../stylesheets/DonutChart.scss";
import "../fullscreen/Control.FullScreen.css";
import "../fullscreen/Control.FullScreen";
import NumberData from "./NumberData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EuropeMap() {
  const [legendClosed, setLegendClosed] = useState(false);
  const titleRef = useRef(null);
  const mapRef = useRef(null);
  const subtitleRef = useRef(null);

  function toggleLegend() {
    setLegendClosed((prev) => !prev);
  }

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          ease: "power2.out",
        }
      );
    }
    if (mapRef.current && subtitleRef.current) {
      gsap.fromTo(
        [mapRef.current, subtitleRef.current],
        {
          y: "30",
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (mapRef.current && !mapRef.current._leaflet_id) {
      const map = L.map(mapRef.current, {
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: "topleft",
        },
      }).setView([48, 10], 4.5);

      // Ajout des tuiles OpenStreetMap
      const tileUrl = "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png";
      L.tileLayer(tileUrl, {
        minZoom: 4,
        maxZoom: 8,
      }).addTo(map);

      let countries = [];
      geojsonFeature["features"].forEach((feature) => {
        countries.push(feature.properties.sovereignt);
      });
      let countriesFiltered = [];
      countries.forEach((country) => {
        for (let euroCountry of euroCountries) {
          if (euroCountry["name"] === country) {
            countriesFiltered.push(country);
          }
        }
      });
      function getEmission(country) {
        if (countriesFiltered.includes(country)) {
          for (let key in emissions) {
            if (key === country) {
              return emissions[key]["co2"];
            }
          }
        } else {
          return 0;
        }
      }
      function getWeight(country) {
        if (countriesFiltered.includes(country)) {
          return 2;
        } else {
          return 0;
        }
      }

      L.geoJSON(geojsonFeature, {
        style: function (feature) {
          return {
            fillColor: getColor(
              getEmission(feature.properties.sovereignt) / 9.5
            ),
            fillOpacity: 0.5,
            color: "rgba(0, 0, 0, 0.23)",
            weight: getWeight(feature.properties.sovereignt),
            dataValue: getEmission(feature.properties.sovereignt),
          };
        },
      })
        .bindPopup(function (layer) {
          if (
            !countriesFiltered.includes(layer.feature.properties.sovereignt)
          ) {
            return;
          }
          // Crée un élément div pour le contenu de la popup
          const popupContent = document.createElement("div");
          popupContent.innerHTML = `
      <b>Pays :</b> ${countriesFr[layer.feature.properties["iso_a2"]]}<br>
      <b>Émissions de CO₂ / habitant en 2022 :</b> ${
        layer.options.dataValue === undefined
          ? "Données non disponibles"
          : layer.options.dataValue === 0
          ? "Pays hors UE"
          : `${Number(layer.options.dataValue).toFixed(2)} Tonnes`
      }`;
          popupContent.className = "popup-chart";

          // Crée un conteneur pour le composant React `PieChart`
          const chartContainer = document.createElement("div");
          chartContainer.className = "chart-container";
          popupContent.appendChild(chartContainer);

          // Utilise `createRoot` pour rendre `PieChart` dans la popup
          const root = createRoot(chartContainer);
          root.render(
            <PieChart data={mix[layer.feature.properties.sovereignt]} />
          );

          return popupContent;
        })
        .addTo(map);
    }
  }, []);

  function getColor(value) {
    if (value === 0 || value === "undefined" || value === null) {
      return "rgba(0, 0, 0, 0)";
    }
    if (value == "0") {
      return "#fff";
    }
    //value from 0 to 1
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }

  return (
    <>
      <section className="container map-container grid m-bot-128 col-gap-20" id="mix">
        <div className="grid-col-sm-12-ls-1-9">
          <div className="h2-container">
            <h2 className="article-title" ref={titleRef}>
              De grosses inégalités d&apos;émissions de CO2 en Europe
            </h2>
          </div>
          <p className="article-chapeau p-bot-16">
            En comparant les émissions de CO2 par habitant avec le mix
            énergétique des pays de l&apos;Union Européenne, on observe des
            disparités importantes. Quels sont les pays les plus émetteurs de
            CO2 par habitant et la production du nucléaire des pays de
            l&apos;Union Européenne est-elle corrélée à ses émissions de CO2 ?
          </p>
          <p className="font-size-16 p-bot-64">
            La carte présente les pays de l&apos;Union européenne, colorés en
            fonction de leur nombre en Tonnes d&apos;émissions de CO2 par
            habitant en 2022 et au clic sur un pays, sa production électrique
            par type d&apos;énergie est montrée.
          </p>
        </div>
        <div
          className="map-container grid-col-sm-1-12-ls-1-7"
          style={{ height: "443px", width: "100%" }}
        >
          {" "}
          <div id="map" ref={mapRef} style={{ height: "100%", width: "100%" }}>
            <div id="legend" className={legendClosed ? "hidden" : ""}>
              <button onClick={toggleLegend}>
                <svg
                  className={legendClosed ? "chevron rotate" : "chevron"}
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"></path>
                </svg>
              </button>
              <table>
                <thead>
                  <tr>
                    <th>
                      {" "}
                      Émissions de CO₂ par habitant en 2022 dans les pays de
                      l&apos;Union Européenne (en Tonnes)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(10).keys()].map((i) => (
                    <tr key={i + 1}>
                      <td>{i + 1}</td>
                      <td
                        className="color"
                        style={{
                          backgroundColor: getColor((i + 1) / 10),
                          opacity: 0.5,
                        }}
                      ></td>
                    </tr>
                  ))}
                  <tr></tr>
                  <tr
                    style={{
                      marginTop: "30px",
                    }}
                  >
                    {/* <td>Non disponible</td>
                <td
                className="color"
                style={{ backgroundColor: "rgba(0, 0, 0, 100)", opacity: 1 }}
                ></td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid-col-sm-1-12-ls-8-12">
          <h3 className="article-subtitle" ref={subtitleRef}>
            Des différences au niveau européen
          </h3>
          <p className="font-size-16 p-bot-64">
            Le mix énergétique dans sa production d&apos;électricité d&apos;un
            pays a un impact direct sur ses émissions de CO₂. La politique
            énergétique soutenue par la France a été majoritairement
            l&apos;utilisation du nucléaire, qui lui permet d&apos;être moins
            dépendant des énergies fossiles - particulièrement émettrices de
            dioxyde de carbone. C&apos;est le pays qui a le plus de nucléaire
            dans son mix énergétique. D&apos;autres pays ne misent pas sur le
            nucléaire et combinent à la place souvent les énergies renouvelables
            avec des énergies fossiles (Italie, Espagne, Allemagne…). Les pays
            émettant le moins de CO₂ / habitant (Suède, Lettonie, Roumanie)
            utilisent eux majoritairement des énergies renouvelables mais ont
            aussi une production électrique totale moindre que les grandes
            puissances de l&apos;UE. Le nucléaire et les énergies renouvelables
            (éolien, solaire) permettent de produire de l&apos;électricité avec
            peu d&apos;émissions de CO₂.
          </p>
          <p className="font-size-16 p-bot-64">
            En analysant cette carte, on observe également la dépendance de
            nombreux pays aux énergies fossiles (Pologne, Grèce, Italie…). Ce
            sont des pays moins avancés dans la transition énergétique alors que
            l&apos;Europe vise{" "}
            <i>“une économie sobre en carbone à l&apos;horizon 2050”</i>. En
            suivant les exemples de la France ou de la Suède, et avec un soutien
            adapté, ces pays pourraient réduire leurs émissions de CO₂ et
            progresser vers une énergie plus propre. Cependant, ce que la carte
            ne montre pas, c&apos;est la dépendance de l&apos;Union européenne
            aux importations pour un peu plus de la moitié de sa consommation
            d&apos;énergie et notamment des énergies fossiles.
          </p>
        </div>
        <div className="grid-col-sm-12-ls-1-9">
          {/* <h3 className="article-subtitle">Quelques données</h3> */}
          {/* <DonutChartSimple /> */}
          <div className="flex-container-space-between">
            <NumberData
              sub="Allemagne"
              number={49}
              under="d'énergies fossiles"
              unit="%"
              color="lime-color"
            />
            <NumberData
              sub="France"
              number={49}
              under="d'énergie nucléaire"
              unit="%"
              color="lime-color"
            />
            <NumberData
              sub="Suède"
              number={60}
              under="d'énergies renouvelables"
              unit="%"
              color="lime-color"
            />
          </div>
        </div>
      </section>
    </>
  );
}
