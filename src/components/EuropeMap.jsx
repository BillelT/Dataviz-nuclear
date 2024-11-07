import "../stylesheets/App.scss";
import { createRoot } from "react-dom/client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PieChart from "./PieChart";
import { useRef, useEffect } from "react";
import geojsonFeature from "../data/europe.json";
import euroCountries from "../data/euro-countries.json";
import emissions from "../data/emissions-per-capita2022.json";
import mix from "../data/mix-energy-type-countries.json";

export default function EuropeMap() {
  const mapRef = useRef(null);
  function getColor(value) {
    if (value === 0 || value === "undefined" || value === null) {
      return "rgba(0, 0, 0, 0)";
    }
    if (value === "weight") {
      return 0;
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

      var myStyle = {
        color: "#ff7800",
        stroke: true,
        weight: 0,
        opacity: 1,
        fillOpacity: 0.5,
      };

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

      var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      };

      console.log(mix["Africa"]);
      L.geoJSON(geojsonFeature, {
        // pointToLayer: function (feature, latlng) {
        //   return L.circleMarker(latlng, geojsonMarkerOptions);
        // },
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
          // Crée un élément div pour le contenu de la popup
          const popupContent = document.createElement("div");
          popupContent.innerHTML = `
      <b>Pays :</b> ${layer.feature.properties.sovereignt}<br>
      <b>Émissions :</b> ${
        layer.options.dataValue === undefined
          ? "Données non disponible"
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
      <div className="map-container">
        <div
          id="map"
          ref={mapRef}
          style={{ height: "100vh", width: "100%" }}
        ></div>
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
