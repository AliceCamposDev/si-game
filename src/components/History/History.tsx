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
    finished: boolean;
  };
  const historyInitialState: HistoryType = {
    date: "",
    finalScore: 0,
    survived: false,
    survivedDays: 0,
    finished: false,
  };

  const [historydata, setHistoryData] = useState<HistoryType[]>([
    historyInitialState,
  ]);

  useEffect(() => {
    api
      .get("history-by-token", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res: { data: HistoryType[] }) => {
        setHistoryData(res.data);
      });
  }, []);

  function parseDate (date: string): string{
    const parts = date.split("T")[0].split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const formattedDate = day + "/" + month + "/" + year;
    return formattedDate;
  }

  return (
    <div className="historyContainer">
      <h2>Histórico</h2>
      <div className="cardsContainer">
        {historydata.length > 0 ? (
          historydata.map((d, i) => (
            <div key={i} className="historyCard">
              <div>
                <p>{parseDate(d.date)}</p>
              </div>
              <div>
                <p>score:&#160;</p>
                <p>{d.finalScore}</p>
              </div>
              <div>
                <p>Dias sobrevividos:&#160;</p>
                <p>{d.survivedDays}</p>
              </div>
              <br />
            </div>
          ))
        ) : (
          <p className="historyNotFound">Nenhum histórico encontrato</p>
        )}
      </div>
    </div>
  );
}
export default History;



