import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import EuropeMap from "./components/EuropeMap.jsx";
import LineChart from "./components/LineChart.jsx";
import Cost from "./components/Cost.jsx";
import Number from "./components/Number.jsx";
import "./stylesheets/App.scss";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Number />
      <EuropeMap />
      <LineChart />
      <Cost />
    </>
  );
}

export default App;
