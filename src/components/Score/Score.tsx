import { useEffect, useState } from "react"
import "./Score.css"
function Score (){

    let progress = document.getElementsByClassName('progress') as HTMLCollectionOf<HTMLElement> 

    const maxPlayerProgress = 35
    const [score, setScore] = useState(maxPlayerProgress)
    const [relativeScore, setRelativeScore] = useState(maxPlayerProgress)
  
    function scorepercent(){
        let percent = relativeScore*100/maxPlayerProgress
        console.log("percent ", percent, "   relativeScore ",relativeScore)
        if (relativeScore<=0 || percent <= 0){
            return ("0%")
        }
        if (relativeScore >= maxPlayerProgress){
            return("100%")
        }
        return (percent + "%")
    }

    function changeScore(answerScore: number){
        setScore(score + answerScore)
        if ((relativeScore + answerScore) <= 0){
            setRelativeScore(0)
        }else if((relativeScore + answerScore) >= maxPlayerProgress){
            setRelativeScore(maxPlayerProgress)
        }else{
            setRelativeScore(relativeScore+answerScore)
        }
    }


    useEffect(() => {
        if (progress.length > 0){
            progress[0].style.width = scorepercent()
         }
    },[score]) 
    return(
        <div className="scoreContainer">
            <div className="logo">
               
            </div>
            <div className="bar">
                <div className="progress">

                </div>
            </div>
            <button onClick={()=> changeScore(-3)}>abacate</button>
            <button onClick={()=> changeScore(+3)}>amora</button>
        </div>
    )
}
export default Score 