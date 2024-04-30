import { json, text } from "stream/consumers";
import api from "../../services/api"
import "./Game.css"
import React, {useState, useEffect}  from 'react';

function Game (props: any){

   
    const [question, setQuestion] = useState([{_id: "", day: 0, text: "", question: "", readmore: "", _v: 0, correctAnswer: 0}])
    const [answers, setAnswers] = useState([{_id: "", day: 0, answer_text: "", score: 0, _v: 0}])

    function test(){
        console.log(props.choiceScore)
    }

//TODO: testas se day existe antes de puxar do banco

    useEffect(() => {
        api.get('questions/'+props.day)
        .then((res: { data: Object; }) => {
           setQuestion(JSON.parse(JSON.stringify(res.data))) //TODO: consertar isso... crimes sendo cometidos aqui!
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
        console.log(props.day  )
        props.passDay(props.day+1) 
        console.log(props.day  )
     }

    return (
        <div className="container">
            <div className="question">
            <p>{question[0]? question[0].text: ""}</p>
            <p>{question[0]? question[0].question: ""}</p>
            </div>
            <div className="responses">
            <button   onClick={()=> choice(0)} className="response">
            {answers[0]? answers[0].answer_text: ""}
            </button>
            <button  onClick={() => test()} className="response">
            {answers[1]? answers[1].answer_text: ""}
            </button>
            <button onClick={()=> choice(2)} className="response">
            {answers[2]? answers[2].answer_text: ""}
            </button>
            <button onClick={()=> choice(3)} className="response">
            {answers[3]? answers[3].answer_text: ""}
            </button>
            </div>
        </div>
    )
}
export default Game     