import { json, text } from "stream/consumers";
import api from "../../services/api"
import "./Game.css"
import React, {useState, useEffect}  from 'react';

function Game (props: any){
    const [question, setQuestion] = useState([{_id: "", day: 0, text: "", question: "", readMore: ""}])
    const [answers, setAnswers] = useState([{_id: "", answerText: ""}])
    const [showreadMore,setShowreadMore] = useState(true)
    const [firstChoice,setFirstChoice] = useState(true)
//TODO: testar se day existe antes de puxar do banco

    useEffect(() => {
        if (props.day%7==0 || props.day%7==6){
            props.passDay(props.day+1) 
          }else{
            const getQuestions = async () => {
                await api.get('questions/'+props.day)
                    .then((res: { data: Object; }) => {
                        setQuestion(JSON.parse(JSON.stringify(res.data)))//TODO: consertar isso... crimes sendo cometidos aqui!
                    })
            }
            getQuestions()
          }
     }, [props.day])

     useEffect(()=>{
        const getAnswers = async () => {
            await api.get('answers/'+props.day)
                .then((res: { data: Object; }) => {
                    setAnswers(JSON.parse(JSON.stringify(res.data)))//TODO: consertar isso... crimes sendo cometidos aqui!
                })
        }
        getAnswers()
     }, [question])

     useEffect(() => {
        if (question.length > 0){
            let questionText = document.getElementById('questionText') as HTMLElement
            questionText.innerHTML = question[0]? question[0].text: "";

            let questionQuestion = document.getElementById('questionQuestion') as HTMLElement
            questionQuestion.innerHTML = question[0]? question[0].question: "";
        
            let option1 = document.getElementById('option1') as HTMLElement
            option1.innerHTML = answers[0]? answers[0].answerText: "";
            option1.style.pointerEvents = "all"

            let option2 = document.getElementById('option2') as HTMLElement
            option2.innerHTML = answers[1]? answers[1].answerText: "";
            option2.style.pointerEvents = "all"

            let option3 = document.getElementById('option3') as HTMLElement
            option3.innerHTML = answers[2]? answers[2].answerText: "";
            option3.style.pointerEvents = "all"

            let option4= document.getElementById('option4') as HTMLElement
            option4.innerHTML = answers[3]? answers[3].answerText: "";
            option4.style.pointerEvents = "all"

            let response = document.getElementsByClassName('response') as HTMLCollectionOf<HTMLElement> 
            for (let i =0; i < response.length; i++){
                response[i].style.cursor="pointer"
            }

            let optionConf = document.getElementsByClassName('optionConf') as HTMLCollectionOf<HTMLElement> 
            for (let i =0; i < optionConf.length; i++){
                optionConf[i].style.display="none"
            }
            setShowreadMore(true)
            setFirstChoice(true)

        }
     },[answers])

     function confChoice(position: number){
        let optionConf = document.getElementsByClassName('optionConf') as HTMLCollectionOf<HTMLElement> 
        for (let i =0; i < optionConf.length; i++){
            optionConf[i].style.display="none"
        }

        let response = document.getElementsByClassName('response') as HTMLCollectionOf<HTMLElement> 

        response[position].style.cursor="default"
        optionConf[position].style.display = "block"
     }
     async function choice(choice: number){
        
        if (answers[choice]){
            if (firstChoice){
                let correct: boolean = false
                setFirstChoice(false)
                props.choiceId (answers[choice]._id)
                await api.get('Answerscore/'+answers[choice]._id)
                    .then((res: { data: Object; }) => {
                    const jsonScore = JSON.parse(JSON.stringify(res.data))
                    props.choiceScore(jsonScore[0].score)
                    if (jsonScore[0].score >= 0){
                        correct = true
                    }else{
                        correct = false
                    }
                })

                let option1= document.getElementById('option1') as HTMLElement
                option1.style.pointerEvents = "none"

                let option2= document.getElementById('option2') as HTMLElement
                option2.style.pointerEvents = "none"

                let option3= document.getElementById('option3') as HTMLElement
                option3.style.pointerEvents = "none"

                let option4= document.getElementById('option4') as HTMLElement
                option4.style.pointerEvents = "none"

                let popover= document.getElementById('popover') as HTMLElement
                let feedback= document.getElementById('feedback') as HTMLElement
                

                if (correct){
                    popover.style.background = "rgb(37, 207, 37)"
                    feedback.innerHTML = "Correto!"
                }else{
                    popover.style.background = "rgb(207, 57, 37)"
                    feedback.innerHTML = "Errado!"
                }
                
                
                

            }
            
            let jsonCorrectAnswer = [{correctAnswer: ""}]
            await api.get('QuestionAnswer/'+props.day)
            .then((res: { data: Object; }) => {
               jsonCorrectAnswer=(JSON.parse(JSON.stringify(res.data)))//TODO: consertar isso... crimes sendo cometidos aqui!
               
            })
            let correctAnswerElement = document.getElementById('correctAnswer') as HTMLElement
            correctAnswerElement.innerHTML = jsonCorrectAnswer[0]? jsonCorrectAnswer[0].correctAnswer: ""   
        }

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
        <div className="gameContainer">
            <div className="shell-box">
                <div className="shell-heading">
                    <i className="terminal icon">{'>_'}</i> Power Shell
                </div>
                <div className="shell-script">
                <div className="welcome"></div>
                <div className="history"></div>
                <div className="cmd-line" >PS C:\{'> '}
                    <span className="type" id="questionText"></span>
                    <br/>
                    <span className="type" id="questionQuestion"></span></div>
                </div>
            </div>




            <div className="responses">

            <div className="optionContainer">
                <div  id="option1" onClick={()=> confChoice(0)} className="response"/>
                <button onClick={()=> choice(0)} id="option1Conf" className="optionConf"> Confirmar</button>
            </div>

            <div className="optionContainer">
                <div  id="option2" onClick={()=> confChoice(1)} className="response"/>
                <button onClick={()=> choice(1)} id="option1Conf" className="optionConf"> Confirmar</button>
            </div>

            <div className="optionContainer">
                <div  id="option3" onClick={()=> confChoice(2)} className="response"/>
                <button onClick={()=> choice(2)} id="option1Conf" className="optionConf"> Confirmar</button>
            </div>

            <div className="optionContainer">
                <div  id="option4" onClick={()=> confChoice(3)} className="response"/>
                <button  onClick={()=> choice(3)} id="option1Conf" className="optionConf"> Confirmar</button>
            </div>

            
            </div>

            <div className="popover" id="popover">
                <div className="correctAnswer">
                    <h3 id="feedback">Correto!</h3>
                    <p id="correctAnswer"></p>
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