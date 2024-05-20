import "./History.css"

function History(){
    return(
        <div className="historyContainer">
            <h1>Histórico</h1>
            <div className="historyCard">
                <div>
                    <p>Data:</p>
                    <p>06/05/2024 18:00</p>
                </div>
                <div>
                    <p>score:</p>
                    <p>57</p>
                </div>
                <div>
                    <p>Dias sobrevividos:</p>
                    <p>30</p>
                </div>
            </div>


            <div>
                <div>
                    <p>Data: 18:19</p>
                    <p>06/05/2024</p>
                </div>
                <div>
                    <p>score:</p>
                    <p>0</p>
                </div>
                <div>
                    <p>Dias sobrevividos:</p>
                    <p>26</p>
                </div>
            </div>
        </div>
    )
}
export default History