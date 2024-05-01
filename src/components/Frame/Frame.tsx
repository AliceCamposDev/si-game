import Game from "../Game/Game";
import Score from "../Score/Score";
import Calendar from "../Calendar/Calendar";
import "./Frame.css";
import { useState } from "react";



function Frame() {
  
  const [choiceScore, setChoiceScore] = useState(99)
  const [day, setDay] = useState(1)

  

  return (
    <div className="frameContainer">
      <div className="row">
        <div className="column">
          <Score choiceScore={choiceScore} day={day} />
          <Game choiceScore={choiceScore} playerChoiceScore={(v: any) => setChoiceScore(v)} day={day} passDay={(v: any) => setDay(v)}/>
        </div>
        <Calendar day={day}/>
      </div>
    </div>
  );
}
export default Frame;
