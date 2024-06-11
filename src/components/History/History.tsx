import "./History.css";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";

function History() {
  const location = useLocation();
  const accessToken: string = location.state.accessToken;

  type HistoryType = {
    date: string;
    finalScore: number;
    survived: boolean;
    survivedDays: number;
  };
  const historyInitialState: HistoryType = {
    date: "",
    finalScore: 0,
    survived: false,
    survivedDays: 0,
  };

  const [historydata, setHistoryData] = useState<HistoryType[]>([
    historyInitialState,
  ]);

  useEffect(() => {
    api
      .get("historyByToken", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res: { data: HistoryType[] }) => {
        setHistoryData(res.data);
      });
  }, []);

  return (
    <div className="historyContainer">
      <h1>Histórico</h1>
      <div className="cardsContainer">
        {historydata.length > 0 &&
          historydata.map((d, i) => (
            <div key={i} className="historyCard">
              <div>
                <p>Data:</p>
                <p>{d.date}</p>
              </div>
              <div>
                <p>score:</p>
                <p>{d.finalScore}</p>
              </div>
              <div>
                <p>Dias sobrevividos:</p>
                <p>{d.survivedDays}</p>
              </div>
              <br />
            </div>
          ))}
      </div>
    </div>
  );
}
export default History;
