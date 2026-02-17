import React, { useEffect, useState } from "react";
import { getTop10Leaders, getFlop10Leaders } from "../services/api.js";
import { useLanguage } from "../components/LanguageContext.js";
import LeaderCard from "../components/LeaderCard.js";

const Home = () => {
    const { t } = useLanguage();
  const [topLeaders, setTopLeaders] = useState([]);
  const [flopLeaders, setFlopLeaders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setTopLeaders(await getTop10Leaders());
      setFlopLeaders(await getFlop10Leaders());
    };
    fetchData();
  }, []);

  return (
    <div>
    <h1>{t("top10")}</h1>
    <div className="leader-grid">
      {topLeaders.map(l => <LeaderCard key={l.id} leader={l} />)}
    </div>

    <h1>{t("flop10")}</h1>
    <div className="leader-grid">
      {flopLeaders.map(l => <LeaderCard key={l.id} leader={l} />)}
    </div>
  </div>
  );
};

export default Home;
