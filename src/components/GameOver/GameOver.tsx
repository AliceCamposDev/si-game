import "./GameOver.css"
function GameOver(props: any){

    return(
        <div className="gameOverContainer">
            <h2>Você sobreviveu {props.day} dias!</h2>
            <p>Tente novamente, você pode fazer melhor</p>
      </div>
    )
}
export default GameOver 