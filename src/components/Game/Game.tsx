import api from "../../services/api"
import "./Game.css"

function Game (){

     function loadQuestion(day: number){
        const question = api.get('questions/'+day)
        
        return(question[0])
    }
    return (
        <div className="container">
            <div className="question">
            <p>{loadQuestion(1)}</p>
            <p>É o seu primeiro dia. Você encontra um cara de TI na máquina de café. Durante o bate-papo, ele lhe entrega um monte de papéis para ler sobre as regras de segurança. Você assina a carta de segurança da empresa e recebe um cartão com suas credenciais de login.</p>
            <p>O que você acha?</p>
            </div>
            <div className="responses">
            <button className="response">
            Isso é bom. É a primeira vez que você tem um documento assim. A segurança de TI é levada a sério aqui. Você começa a ler todas as informações que recebeu.
            </button>
            <button className="response">
            Você não tem tanta certeza. Gostaria de ter algo mais formal, com explicações mais claras e briefings sobre todas as políticas e procedimentos.

            </button>
            <button className="response">
            Você conhece essas coisas. Vai ler os documentos mais tarde, logo após ler os 'termos e condições' do WiFi Gratuido da Cafeteria.
            </button>
            <button className="response">
            Você acha que a administração deveria ser responsável por informar todos os funcionários.
            </button>
            </div>
        </div>
    )
}
export default Game     