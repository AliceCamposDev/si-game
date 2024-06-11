import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Menu.css"
function Menu(){
    const navigate = useNavigate();
    const location = useLocation();
    const  accessToken: string = location.state.accessToken;
    const navigateToHistory=()=>{
        navigate("/history", { state: { accessToken } });
    }
    const navigateToFrame=()=>{
        navigate("/game", { state:  { accessToken }  });
    }
return(


    <div className="container">
        <div className="title">
            <h1>Titulo</h1>
        </div>
        <div className="buttons">
            <button onClick={navigateToFrame}>Jogar</button>
            <button onClick={navigateToHistory}>Histórico</button>

        </div>
    </div>
)
}
export default Menu