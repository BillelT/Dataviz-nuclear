import "../stylesheets/App.scss";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRef, useEffect } from "react";
import regions from "../data/french-regions.json";

function FrancePlants() {
  const mapRef = useRef(null);
  useEffect(() => {
    console.log(regions);
    let regionsArray = [];
    let depsAuvergne = [];
    regions.forEach((region) => {
      if (regionsArray.includes(region["region_name"])) {
        return;
      } else {
        regionsArray.push(region["region_name"]);
      }
    });
    regions.forEach((region) => {
      if (region["region_name"] === "Auvergne-Rhône-Alpes") {
        depsAuvergne.push(region["dep_name"]);
      }
    });
    console.log(regionsArray);
    console.log(depsAuvergne);
  });
  useEffect(() => {
    // console.log(regions);
    if (mapRef.current && !mapRef.current._leaflet_id) {
      const map = L.map(mapRef.current).setView(
        [48.8626304852, 2.33629344655],
        5
      );

      // Ajout des tuiles OpenStreetMap
      const tileUrl = "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png";
      L.tileLayer(tileUrl, {
        minZoom: 0,
        maxZoom: 17,
      }).addTo(map);

      // Utilisation de fetch pour charger les données GeoJSON
      const geojsonUrl =
        "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson";
      fetch(geojsonUrl)
        .then((response) => response.json())
        .then((data) => {
          L.geoJSON(data, {
            style: (feature) => {
              const code = feature.properties.code;
              if (
                [
                  "16",
                  "22",
                  "29",
                  "35",
                  "37",
                  "44",
                  "49",
                  "56",
                  "79",
                  "85",
                  "86",
                ].includes(code)
              ) {
                return { color: "#ffed00", stroke: 0, fillOpacity: 0.5 }; // Couleur jaune
              } else if (
                [
                  "02",
                  "14",
                  "27",
                  "28",
                  "50",
                  "53",
                  "59",
                  "60",
                  "61",
                  "62",
                  "72",
                  "76",
                  "78",
                  "80",
                ].includes(code)
              ) {
                return { color: "#ef8200", stroke: 0, fillOpacity: 0.5 }; // Couleur orange
              }
              return { stroke: 0, fillOpacity: 0.5 };
            },
          }).addTo(map);
        })
        .catch((error) =>
          console.error("Erreur lors du chargement du GeoJSON:", error)
        );
    }
  }, []);

  return (
    <div id="map" ref={mapRef} style={{ height: "100vh", width: "100%" }}></div>
  );
}

export default FrancePlants;
