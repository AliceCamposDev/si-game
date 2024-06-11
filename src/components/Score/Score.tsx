import { useEffect, useState } from "react"
import "./Score.css"
import api from "../../services/api"
function Score (props: any){

    let progress = document.getElementsByClassName('progress') as HTMLCollectionOf<HTMLElement> 

    const maxPlayerProgress = 35    
    const [lastScore, setLastscore] = useState(0)
    const [relativeScore, setRelativeScore] = useState(maxPlayerProgress)
    const [lastScoreReady, setLastScoreReady] = useState(false)

   useEffect(()=>{
    async function getLastScore(): Promise<void>{
        if(props.chosenId){
            const url = "answerScore/".concat(props.chosenId)
            await api.get(url).then((res: {data:{score: number}})=>{
                setLastscore (res.data.score)
                setLastScoreReady(!lastScoreReady)
            }).catch(error => {
                console.log(error)
            })
        }
    }
    getLastScore()
   },[props.day])

useEffect(()=>{

    if ((relativeScore + lastScore) <= 0){
        setRelativeScore(0)
        props.setRelativeScore(0)
    }else if((relativeScore + lastScore) >= maxPlayerProgress){
        setRelativeScore(maxPlayerProgress)
        props.setRelativeScore(maxPlayerProgress)

    }else{
        setRelativeScore(relativeScore+lastScore)
        props.setRelativeScore(relativeScore+lastScore)
    }
},[lastScoreReady])




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
    },[relativeScore]) 
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