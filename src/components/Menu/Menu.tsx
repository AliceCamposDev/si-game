import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Menu.css"
import api from "../../services/api";
import { useEffect, useState } from "react";
function Menu(){
    const navigate = useNavigate();
    const location = useLocation();
    const  accessToken: string = location.state.accessToken;
    const [finished, setFinished]= useState(true)
    const continueGame = true
    const navigateToFrameContinue=()=>{
      navigate("/game",{state: {accessToken, continueGame}})
    }
    const navigateToHistory=()=>{
        navigate("/history", { state: { accessToken } });
    }
    const navigateToFrame=()=>{
        navigate("/game", { state:  { accessToken }  });
    }
    type HistoryType = {

        _id: string;
        date: string;
        finalScore: number;
        survived: boolean;
        survivedDays: number;
        finished: boolean;
        results: Array<string> ;
        playerId: string;
      };

      useEffect(()=>{
        api.get("last-history", {
          headers: {
            Authorization: accessToken,
          },
        })
      .then((res: { data: HistoryType }) => {
        console.log(res.data)
        if(res.data.finished != undefined){
          setFinished(res.data.finished);
        }
      });
      },[])
    
return(


    <div className="container">
        <div className="title">
            <h1>Titulo</h1>
        </div>
        <div className="buttons">
            {!finished ? <button onClick={navigateToFrameContinue}>Continuar</button> : <button onClick={navigateToFrame}>Novo jogo</button>}
            
            <button onClick={navigateToHistory}>Histórico</button>

        </div>
    </div>
)
}
export default Menu