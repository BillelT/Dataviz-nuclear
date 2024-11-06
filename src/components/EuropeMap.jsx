import "../stylesheets/App.scss";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRef, useEffect } from "react";
import geojsonFeature from "../data/europe.json";
import euroCountries from "../data/euro-countries.json";
import emissions from "../data/emissions-per-capita2022.json";

function EuropeMap() {
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
      console.log(countriesFiltered);
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
          // countriesFiltered.forEach((country) => {
          //   console.log(country);
          // });
          // console.log(emissions["Algeria"]["co2"]);
          return {
            fillColor: getColor(
              getEmission(feature.properties.sovereignt) / 9.5
            ),
            fillOpacity: 0.5,
            color: "rgba(0, 0, 0, 0.23)",
            weight: getWeight(feature.properties.sovereignt),
          };
        },
      }).addTo(map);
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
          <p>
            Émissions de CO₂ par habitant en 2022 dans les pays de l&apos;Union
            Européenne
          </p>
          <table>
            <thead>
              <tr>
                <th>CO₂ (tonnes per capita)</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(11).keys()].map((i) => (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td
                    style={{
                      backgroundColor: getColor((i + 1) / 11),
                      width: "50px",
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

export default EuropeMap;
