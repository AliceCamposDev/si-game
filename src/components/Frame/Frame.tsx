import Game from "../Game/Game";
import Score from "../Score/Score";
import Calendar from "../Calendar/Calendar";
import GameOver from "../GameOver/GameOver";
import Victory from "../Victory/Victory";
import "./Frame.css";
import { useEffect, useState, useRef } from "react";
import EasterEgg from "../EasterEgg/EasterEgg";
import api from "../../services/api";

function Frame() {
  const initialRender = useRef(true);
  const initialRender2 = useRef(true);
  const initialRender3 = useRef(true);
  const initialRender4 = useRef(true);

  const [playerId, setPlayerId] = useState("");
  const [day, setDay] = useState(1);
  const [results, setResults] = useState([null]);
  const [score, setScore] = useState(0);
  const maxPlayerProgress = 35;
  const [relativeScore, setRelativeScore] = useState(maxPlayerProgress);
  const [historyId, setHistoryId] = useState("");
  const [readyToSendInit, setReadyToSendInit] = useState(false);
  const [readyToSendHistory, setReadyToSendHistory] = useState(false);
  
  const [historyData, setHistoryData] = useState({
    playerId: "",
    survivedDays: 0,
    survived: false,
    finalScore: 0,
    date: new Date(),
    results: results,
  });

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setHistoryData({
        survivedDays: day,
        survived: false,
        results: results,
        finalScore: historyData.finalScore + score,
        date: historyData.date,
        playerId: playerId,
      });
      setReadyToSendHistory(true)
    }
  }, [results]);

  useEffect(() => {
    async function getPlayerId() {
      await api
        .get("playersId/" + "email3@test.com")
        .then((res: { data: Object }) => {
          setPlayerId(JSON.parse(JSON.stringify(res.data))[0]._id);
        });
    }
    getPlayerId();
  }, []);

  useEffect(() => {
    if (readyToSendHistory){
      api
      .put("history/" + historyId, historyData)
      .then((res: { data: Object }) => {
        console.log(JSON.parse(JSON.stringify(res.data)));
      });
      setReadyToSendHistory(false)
    }
  }, [readyToSendHistory]);

  useEffect(() => {
    if (initialRender3.current) {
      initialRender3.current = false;
    } else {
      console.log("player id:", playerId);
      setHistoryData({
        survivedDays: 0,
        survived: false,
        finalScore: 0,
        results: results,
        date: new Date(),
        playerId: playerId,
      });
      setReadyToSendInit(true);
    }
  }, [playerId]);

  useEffect(() => {
    if (readyToSendInit) {
      api.post("history", historyData).then((res: { data: string }) => {
        setHistoryId(res.data);
      });
      setReadyToSendInit(false);
    }
  }, [readyToSendInit]);

  if (relativeScore <= 0) {
    return <GameOver />;
  } else if (day > 30) {
    if (relativeScore >= maxPlayerProgress) {
      return <EasterEgg />;
    } else {
      return <Victory />;
    }
  } else {
    return (
      <div className="frameContainer">
        <div className="row">
          <div className="column">
            <Score
              relativeScore={relativeScore}
              setRelativeScore={(v: any) => setRelativeScore(v)}
              choiceScore={score}
              day={day}
            />
            <Game
              score={score}
              results={results}
              choiceScore={(v: any) => setScore(v)}
              choiceId={(v: any) => {
                setResults([...results, v]);
              }}
              day={day}
              passDay={(v: any) => setDay(v)}
            />
          </div>
          <Calendar day={day} />
        </div>
      </div>
    );
  }
}
export default Frame;
