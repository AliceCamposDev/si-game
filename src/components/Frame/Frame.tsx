import Game from "../Game/Game";
import Score from "../Score/Score";
import Calendar from "../Calendar/Calendar";
import GameOver from "../GameOver/GameOver";
import Victory from "../Victory/Victory";
import "./Frame.css";
import { useEffect, useState, useRef } from "react";
import EasterEgg from "../EasterEgg/EasterEgg";
import api from "../../services/api";
import { useLocation } from "react-router-dom";

function Frame() {
  const location = useLocation();
  const accessToken: string = location.state.accessToken;
  const initialRender = useRef(true);
  const initialState: Array<string> = [];
  const [playerId, setPlayerId] = useState("");
  const [day, setDay] = useState(1);
  const maxPlayerProgress = 35;
  const [relativeScore, setRelativeScore] = useState(maxPlayerProgress);
  const [historyId, setHistoryId] = useState("");
  const [readyToSendInit, setReadyToSendInit] = useState(false);
  const [chosenId, setChosenId] = useState("");

  const [historyData, setHistoryData] = useState({
    playerId: "",
    survivedDays: 0,
    survived: false,
    finalScore: 0,
    date: new Date(),
    results: initialState,
  });

  useEffect(() => {
    api.get("playerId", {
        headers: {
          Authorization: accessToken,
        },
      }).then((res: { data: { _id: string } }) => {
        setPlayerId(res.data._id);
      });
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setHistoryData({
        survivedDays: 0,
        survived: false,
        finalScore: 0,
        results: initialState,
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
              chosenId={chosenId}
              playerId={playerId}
              day={day}
              setRelativeScore={(v: number) => setRelativeScore(v)}
            />
            <Game
              setChosenId={(v: string) => setChosenId(v)}
              accessToken={accessToken}
              historyId={historyId}
              day={day}
              passDay={(v: number) => setDay(v)}
            />
          </div>
          <Calendar day={day} />
        </div>
      </div>
    );
  }
}
export default Frame;
