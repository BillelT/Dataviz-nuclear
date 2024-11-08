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
      const map = L.map(mapRef.current).setView([48, 10], 4.5);

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
          <h2 className="article-title">Title</h2>
          <p className="article-chapeau p-bot-16">
            Chapeau Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Architecto incidunt vero quam expedita illo excepturi labore quaerat
            doloribus temporibus nesciunt sequi vel ab, eveniet doloremque
            magni, quidem explicabo sint nulla itaque voluptate omnis, obcaecati
            animi blanditiis. Accusantium nesciunt libero minus.
          </p>
          <p className="font-size-16 p-bot-64">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit,
            excepturi illo? Blanditiis suscipit debitis non, nam aliquid est
            sint soluta illo quis perspiciatis iusto repellat, doloremque quos,
            quisquam exercitationem modi porro molestias expedita. Itaque
            facere, consectetur similique iste placeat natus. Perferendis
            blanditiis laudantium quam tenetur assumenda deleniti cupiditate
            consequatur labore?
          </p>
        </div>
        <div
          id="map"
          className="grid-col-sm-1-12-ls-1-7"
          ref={mapRef}
          style={{ height: "443px", width: "100%" }}
        >
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
        <div className="grid-col-sm-1-12-ls-8-12">
          <h3 className="article-subtitle">Subtitle</h3>
          <p className="font-size-16 p-bot-64">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit,
            excepturi illo? Blanditiis suscipit debitis non, nam aliquid est
            sint soluta illo quis perspiciatis iusto repellat, doloremque quos,
            quisquam exercitationem modi porro molestias expedita. Itaque
            facere, consectetur similique iste placeat natus. Perferendis
            blanditiis laudantium quam tenetur assumenda deleniti cupiditate
            consequatur labore?
          </p>
        </div>
      </section>
    </>
  );
}
