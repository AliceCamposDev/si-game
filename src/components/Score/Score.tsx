import { useEffect, useState } from "react";
import "./Score.css";
import api from "../../services/api";
function Score(props: any) {
  let progress = document.getElementsByClassName(
    "progress"
  ) as HTMLCollectionOf<HTMLElement>;

  const maxPlayerProgress: number = props.maxPlayerProgress;
  const [relativeScore, setRelativeScore] = useState(maxPlayerProgress);

     useEffect(()=>{
      async function setRelativeScoreFunction(){
          if (true){
              api.get("get-relative-score" , {
                  headers: {
                    Authorization: props.accessToken,
                  },
                }).then((res: {data: {relativeScore: number}})=>{
                  setRelativeScore(res.data.relativeScore)
                  props.setRelativeScore(res.data.relativeScore)
                  console.log("setting relative score on page = ", res.data.relativeScore)
                })
          }
      }
      setRelativeScoreFunction()
     },[props.day])

  function scorepercent() {
    let percent = (relativeScore * 100) / maxPlayerProgress;
    if (relativeScore <= 0 || percent <= 0) {
      return "0%";
    }
    if (relativeScore >= maxPlayerProgress) {
      return "100%";
    }
    return percent.toString() + "%";
  }

  useEffect(() => {
    if (progress.length > 0) {
      progress[0].style.width = scorepercent();
    }
  }, [relativeScore]);
  return (
    <div className="scoreContainer">
      <div className="logo"></div>
      <div className="bar">
        <div className="progress"></div>
      </div>
    </div>
  );
}
export default Score;
