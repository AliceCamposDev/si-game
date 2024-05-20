import { Link } from "react-router-dom"
import "./Menu.css"
function Menu(){
return(
    <div className="container">
        <div className="title">
            <h1>Titulo</h1>
        </div>
        <div className="buttons">
            <Link to="/game"><button>Jogar</button></Link>
            <Link to="/history"><button>Histórico</button></Link>
        </div>
    </div>
)
}
export default Menu