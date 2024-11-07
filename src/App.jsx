import Header from "./components/Header.jsx";
import Hero from "./components/hero.jsx";
import EuropeMap from "./components/EuropeMap.jsx";
import LineChart from "./components/LineChart.jsx";
import Cost from "./components/Cost.jsx";
import "./stylesheets/App.scss";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <EuropeMap />
      <LineChart />
      <Cost />
    </>
  );
}

export default App;
