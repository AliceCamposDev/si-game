import { useEffect, useState } from "react"
import "./Score.css"
function Score (props: any){

    let progress = document.getElementsByClassName('progress') as HTMLCollectionOf<HTMLElement> 

    const maxPlayerProgress = 35
    const [score, setScore] = useState(maxPlayerProgress)
    const [relativeScore, setRelativeScore] = useState(maxPlayerProgress)
  
   useEffect(()=>{
    setScore(score + props.choiceScore)
    if ((relativeScore +props.choiceScore) <= 0){
        setRelativeScore(0)
    }else if((relativeScore + props.choiceScore) >= maxPlayerProgress){
        setRelativeScore(maxPlayerProgress)
    }else{
        setRelativeScore(relativeScore+props.choiceScore)
    }
   },[props.day])


    function scorepercent(){
        let percent = relativeScore*100/maxPlayerProgress
        if (relativeScore<=0 || percent <= 0){
            return ("0%")
        }
        if (relativeScore >= maxPlayerProgress){
            return("100%")
        }
        return (percent + "%")
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

        </div>
    )
}
export default Score 