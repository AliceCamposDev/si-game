import { json, text } from "stream/consumers";
import api from "../../services/api"
import "./Game.css"
import React, {useState, useEffect}  from 'react';

function Game (props: any){

   //TODO: innerHtml no questionText e questionQuestion!



    const [question, setQuestion] = useState([{_id: "", day: 0, text: "", question: "", readMore: "", _v: 0, correctAnswer: ""}])
    const [answers, setAnswers] = useState([{_id: "", day: 0, answer_text: "", score: 0, _v: 0}])
    const [showreadMore,setShowreadMore] = useState(true)
//TODO: testar se day existe antes de puxar do banco

    useEffect(() => {
        api.get('questions/'+props.day)
        .then((res: { data: Object; }) => {
           setQuestion(JSON.parse(JSON.stringify(res.data))) //TODO: consertar isso... crimes sendo cometidos aqui!
           setShowreadMore(true)
        })
     }, [props.day])

     useEffect(() => {
        api.get('answers/'+props.day)
        .then((res: { data: Object; }) => {
            setAnswers(JSON.parse(JSON.stringify(res.data)))//TODO: consertar isso... crimes sendo cometidos aqui!
        })
     }, [props.day])

     function choice(choice: number){
        props.playerChoiceScore(answers[choice]? answers[choice].score: 98)

        let popover = document.getElementById('popover') as HTMLElement
        popover.style.visibility = "visible"
        
     }

     function readMore(){
        let readMore = document.getElementById('readMore') as HTMLElement

        if (showreadMore){
            readMore.style.visibility = "visible"
            readMore.style.height = "100%"

            let readMoreText = document.getElementById('readMoreText') as HTMLElement
            readMoreText.innerHTML = question[0]? question[0].readMore: "";
            setShowreadMore (!showreadMore)
        }else{
            readMore.style.visibility = "hidden"
            readMore.style.height = "0px"
            setShowreadMore (!showreadMore)
        }
     }

     function continueBtn(){
        let readMore = document.getElementById('readMore') as HTMLElement
        readMore.style.visibility = "hidden"
        readMore.style.height = "0px"

        let popover = document.getElementById('popover') as HTMLElement
        popover.style.visibility = "hidden"
        
        
        props.passDay(props.day+1) 

     }

    

    return (
        <div className="container">
            <div className="question">
            <p id="questionText">{question[0]? question[0].text: ""}</p>
            <p id="questionQuestion">{question[0]? question[0].question: ""}</p>

            
            </div>
            <div className="responses">
            <button   onClick={()=> choice(0)} className="response">
            {answers[0]? answers[0].answer_text: ""}
            </button>
            <button  onClick={()=> choice(1)} className="response">
            {answers[1]? answers[1].answer_text: ""}
            </button>
            <button onClick={()=> choice(2)} className="response">
            {answers[2]? answers[2].answer_text: ""}
            </button>
            <button onClick={()=> choice(3)} className="response">
            {answers[3]? answers[3].answer_text: ""}
            </button>
            </div>

            <div className="popover" id="popover">
                <div className="correctAnswer">
                    <p>{question[0]? question[0].correctAnswer: ""}</p>
                        <div className="popoverBtns">
                            <button onClick={() => readMore()}>Leia mais</button>
                            <button onClick={() => continueBtn()}>Continuar</button>
                        </div>
                </div>
                <div className="readMore" id="readMore">
                    <p id="readMoreText"></p>
                </div>    
            </div>

        </div>
    )
}
export default Game     