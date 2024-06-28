import html2canvas from "html2canvas";
import styles from "./Victory.module.css"; 

function Victory(props: any) {
  const handleCapture = () => {
    const contentRef = document.getElementById("content") as HTMLElement;

    if (!contentRef) {
      console.error("#content not found");
      return;
    }

    html2canvas(contentRef).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "vitoria.png";
      link.click();
    });
  };

  return (
    <div className={styles.victoryContainer}>
      <div className={styles.victoryContainerLeft}>
        <h2>
          Parabéns! {props.playerName} Você completou todos os dias! Compartilhe sua
          conquista pelo <b className={styles.roamB}>ROAM stories</b> para desafiar seus amigos a fazerem o
          mesmo!
        </h2>
        <button className={styles.button} onClick={handleCapture}>Baixar Imagem para compartilhar</button>
      </div>
      <div className={styles.victoryContainerRight}>
        <div id="content" className={styles.content}>
          <div className={styles.contentInner}>
            <h2>
              Consegui sobreviver por todos os dias na <br/><span className={styles.gameName}>nome do jogo</span>,<br/> será que você
              tambêm consegue?
            </h2>
            <p>Acesse o QR-Code ou o link abaixo e mostre que você não é o elo mais fraco!</p>
            <div className={styles.QRCode}></div>
            <p>linkdositeamsdasmkd.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Victory;