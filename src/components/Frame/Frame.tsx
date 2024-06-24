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

const maxPlayerProgress = 35;

type HistoryType = {
  _id?: string;
  date: string;
  finalScore: number;
  survived: boolean;
  survivedDays: number;
  finished: boolean;
  results: Array<string>;
  playerId: string;
  relativeScore: number;
};
const historyInitialState: HistoryType = {
  date: "",
  finalScore: 0,
  survived: false,
  survivedDays: 0,
  finished: false,
  results: [],
  playerId: "",
  relativeScore: maxPlayerProgress,
};

function Frame() {
  const location = useLocation();
  const accessToken: string = location.state.accessToken;
  const initialRender = useRef(true);
  const initialRender2 = useRef(true);
  const initialRender3 = useRef(true);
  const initialState: Array<string> = [];
  const [playerId, setPlayerId] = useState("");
  const [day, setDay] = useState(1);
  const [relativeScore, setRelativeScore] = useState(maxPlayerProgress);
  const [historyId, setHistoryId] = useState("");
  const [readyToSendInit, setReadyToSendInit] = useState(false);
  const [chosenId, setChosenId] = useState("");
  const [finished, setFinished] = useState(true);
  const [lastHistoryId, setLastHistoryId] = useState("");
  const [verifyContinue, setVerifyContinue] = useState(false);
  const [historyData, setHistoryData] = useState([historyInitialState]);

  useEffect(() => {
    console.log("accessToken", accessToken);
    api
      .get("player-id", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res: { data: { _id: string } }) => {
        console.log("playerid",res.data._id)
        setPlayerId(res.data._id);
      });
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      console.log("this should be the first page render on initialrender")
      initialRender.current = false;
    } else {
          api
            .get("last-history", {
              headers: {
                Authorization: accessToken,
              },
            })
            .then((res: { data: HistoryType }) => {
              if (res.data._id) {
                setLastHistoryId(res.data._id);
                setFinished(res.data.finished);
                console.log("lastHistoryId", res.data._id);
                console.log("finished", res.data.finished);
              } else {
                setFinished(true);
                console.log("last history id is empty here")
              }
             setVerifyContinue(!verifyContinue);
             console.log("calling next useeffect anyway")
            });
    }
  }, [playerId]);

  useEffect(() => {
    if (initialRender2.current) {
       console.log("this should be the first page render on initialrender2")
       initialRender2.current = false;
    } else {
      console.log("this should be called when verifyContinue changes")
      console.log("last game finished", finished);
      if (!finished) {
        const getDay = async () => {
          await api
            .get("History-by-id/" + lastHistoryId)
            .then((res: { data: [HistoryType] }) => {
              const survivedDays = res.data[0].survivedDays + 1;
              console.log(survivedDays);
              setDay(survivedDays);
            });
        };
        getDay();
        setHistoryId(lastHistoryId);
      } else {
        console.log("last game finished ", finished);
        setHistoryData([
          {
            finished: false,
            survivedDays: 0,
            survived: false,
            finalScore: 0,
            results: initialState,
            date: new Date().toDateString(),
            playerId: playerId,
            relativeScore: maxPlayerProgress,
          },
        ]);
        setReadyToSendInit(true);
      }
   }
  }, [verifyContinue]);

  useEffect(() => {
    if (initialRender3.current) {
      console.log("this should be the first page render on initialrender3")
      initialRender3.current = false;
   } else {
    if (readyToSendInit) {
      console.log("init history data is ",historyData)
      api.post("history", historyData).then((res: { data: any }) => {
        console.log("hist id on frame", res.data);
        setHistoryId(res.data);
      });
      setReadyToSendInit(false);
    }
   }
  }, [readyToSendInit]);

  if (relativeScore <= 0) {
    api.post("set-history-finished/"+historyId, "",{
      headers: {
        Authorization: accessToken,
      },
    })
    return <GameOver 
    day = {day}/>;
  } else if (day > 30) {
    console.log("set-history")
    api.post("set-history-finished/"+historyId, "", {
      headers: {
        Authorization: accessToken,
      },
    })
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
              maxPlayerProgress={maxPlayerProgress}
              historyId = {historyId}
              chosenId={chosenId}
              playerId={playerId}
              finished={finished}
              accessToken={accessToken}
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
