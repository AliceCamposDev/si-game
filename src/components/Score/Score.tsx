import { useEffect, useState } from "react"
import "./Score.css"
function Score (props: any){

    let progress = document.getElementsByClassName('progress') as HTMLCollectionOf<HTMLElement> 

    const maxPlayerProgress = 35
    const [score, setScore] = useState(maxPlayerProgress)
  
   useEffect(()=>{
    setScore(score + props.choiceScore)
    if ((props.relativeScore +props.choiceScore) <= 0){
        props.setRelativeScore(0)
    }else if((props.relativeScore + props.choiceScore) >= maxPlayerProgress){
        props.setRelativeScore(maxPlayerProgress)
    }else{
        props.setRelativeScore(props.relativeScore+props.choiceScore)
    }
   },[props.day])


    function scorepercent(){
        let percent = props.relativeScore*100/maxPlayerProgress
        if (props.relativeScore<=0 || percent <= 0){
            return ("0%")
        }
        if (props.relativeScore >= maxPlayerProgress){
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