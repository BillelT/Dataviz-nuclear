import { useRef, useEffect } from "react";
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

export default function EuropeMap() {
  const mapRef = useRef(null);
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
  useEffect(() => {
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
      console.log(euroCountries);
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

      console.log(mix["Africa"]);
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
          console.log(layer.feature.properties);
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

  return (
    <>
      <section className="container map-container grid m-bot-128 col-gap-20">
        <div className="grid-col-sm-12-ls-1-9">
          <h2 className="article-title">CO2 et mix énergétique</h2>
          <p className="article-chapeau p-bot-16">
            Observe t-on un lien entre les émissions de CO2 par habitant en 2022
            et la part de production du nucléaire des pays de l&apos;Union
            Européenne ?
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
            <div id="legend">
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
          {/* <svg
          onClick={() => {

          }}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M216,48V96a8,8,0,0,1-16,0V67.31l-42.34,42.35a8,8,0,0,1-11.32-11.32L188.69,56H160a8,8,0,0,1,0-16h48A8,8,0,0,1,216,48ZM98.34,146.34,56,188.69V160a8,8,0,0,0-16,0v48a8,8,0,0,0,8,8H96a8,8,0,0,0,0-16H67.31l42.35-42.34a8,8,0,0,0-11.32-11.32ZM208,152a8,8,0,0,0-8,8v28.69l-42.34-42.35a8,8,0,0,0-11.32,11.32L188.69,200H160a8,8,0,0,0,0,16h48a8,8,0,0,0,8-8V160A8,8,0,0,0,208,152ZM67.31,56H96a8,8,0,0,0,0-16H48a8,8,0,0,0-8,8V96a8,8,0,0,0,16,0V67.31l42.34,42.35a8,8,0,0,0,11.32-11.32Z"></path>
          </svg> */}
        </div>

        <div className="grid-col-sm-1-12-ls-8-12">
          <h3 className="article-subtitle">
            Les différences au niveau européen
          </h3>
          <p className="font-size-16 p-bot-64">
            Le mix énergétique dans sa production d&apos;électricité d&apos;un pays a un
            impact direct sur ses émissions de CO₂. La politique énergétique
            soutenue par la France a été majoritairement l&apos;utilisation du
            nucléaire, qui lui permet d&apos;être moins dépendant des énergies
            fossiles - particulièrement émettrices de dioxyde de carbone.
            C&apos;est le pays qui a le plus de nucléaire dans son mix
            électrique. D&apos;autres pays ne misent pas sur le nucléaire et
            combinent à la place souvent les énergies renouvelables avec des
            énergies fossiles (Italie, Espagne, Allemagne…). Les pays émettant
            le moins de CO₂ / habitant (Suède, Lettonie, Roumanie) utilisent eux
            majoritairement des énergies renouvelables mais sont également moins
            . Le nucléaire et les énergies renouvelables (éolien, solaire)
            permettent de produire de l&apos;électricité avec peu
            d&apos;émissions de CO₂.
          </p>
          <p className="font-size-16 p-bot-64">
            En analysant cette carte, on observe également la dépendance de
            nombreux pays aux énergies fossiles (Pologne, Grèce, Italie…). Ce
            sont des pays moins avancés dans la transition énergétique alors que
            l&apos;Europe vise “une économie sobre en carbone à l&apos;horizon 2050”. En
            suivant les exemples de la France ou de la Suède
          </p>
        </div>
      </section>
    </>
  );
}
