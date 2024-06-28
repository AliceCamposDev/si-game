import "./GameOver.css";
function GameOver(props: any) {
  return (
    <div className="gameOverContainer">
      <div className="gameOverFrame">
        <h2>Você sobreviveu {props.day - 1} dias!</h2>
        <p>Tente novamente, você pode fazer melhor</p>
      </div>
    </div>
  );
}
export default GameOver;
