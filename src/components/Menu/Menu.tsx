import { Link } from "react-router-dom"

function Menu(){
return(
    <div>
        <div>Logo e Título</div>
        <div>
            <Link to="/game"><button>Jogar</button></Link>
            <button>Estatisticas</button>
            <button>Creditos</button>
        </div>
    </div>
)
}
export default Menu