import Game from "../Game/Game";
import Score from "../Score/Score";
import Calendar from "../Calendar/Calendar";
import "./Frame.css";

function Frame() {
  return (
    <div className="frameContainer">
      <div className="row">
        <div className="column">
          <Score />
          <Game />
        </div>
        <Calendar />
      </div>
    </div>
  );
}
export default Frame;
