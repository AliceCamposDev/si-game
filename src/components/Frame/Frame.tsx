import Game from "../Game/Game"
import Score from "../Score/Score"
import Calendar from "../Calendar/Calendar"

function Frame (){
    return(
        <div>
            <Score />
            <Game />
            <Calendar />
        </div>
        
    )
}
export default Frame