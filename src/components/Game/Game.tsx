import api from "../../services/api";
import "./Game.css";
import { useState, useEffect, useRef } from "react";

function Game(props: any) {
  type QuestionType = {
    _id: string;
    day: number;
    text: string;
    question: string;
    readMore: string;
  };
  const questionInitialState: QuestionType = {
    _id: "",
    day: 0,
    text: "",
    question: "",
    readMore: "",
  };

  type AnswerType = {
    _id: string;
    answerText: string;
  };
  const answerInitialState: AnswerType = {
    _id: "",
    answerText: "",
  };

  const questionLoaded = useRef(false);
  const initialRender1 = useRef(true);
  const initialRender2 = useRef(true);

  const [question, setQuestion] = useState<QuestionType>(questionInitialState);
  const [answers, setAnswers] = useState<AnswerType[]>([answerInitialState]);
  const [showreadMore, setShowreadMore] = useState(true);
  const [firstChoice, setFirstChoice] = useState(true);

  useEffect(() => {
    if (props.day % 7 == 0 || props.day % 7 == 6) {
      props.passDay(props.day + 1);
    } else {
      if (initialRender1.current) {
        if (!questionLoaded.current) {
          const getQuestions = async () => {
            await api
              .get("questions/" + props.day)
              .then((res: { data: Array<QuestionType> }) => {
                setQuestion(res.data[0]);
              });
          };
          getQuestions();
          console.log("setting question");
          questionLoaded.current = true;
        }else{ 
          const getQuestions = async () => {
            await api
              .get("questions/" + props.day)
              .then((res: { data: Array<QuestionType> }) => {
                setQuestion(res.data[0]);
              });
          };
          getQuestions();
          console.log("setting question");
          questionLoaded.current = true;
        }
      }
    }
  }, [props.day]);

  useEffect(() => {
    if (initialRender2.current) {
      console.log(
        "this should be the first page render on game initialrender2"
      );
      initialRender2.current = false;
    } else {
      const getAnswers = async () => {
        await api
          .get("answers/" + props.day)
          .then((res: { data: AnswerType[] }) => {
            setAnswers(res.data);
          });
      };
      getAnswers();
      console.log("setting answers");
    }
  }, [question]);

  useEffect(() => {
    if (question) {
      let questionText = document.getElementById("questionText") as HTMLElement;
      questionText.innerHTML = question ? question.text : "";

      let questionQuestion = document.getElementById(
        "questionQuestion"
      ) as HTMLElement;
      questionQuestion.innerHTML = question ? question.question : "";

      let option1 = document.getElementById("option1") as HTMLElement;
      option1.innerHTML = answers[0] ? answers[0].answerText : "";
      option1.style.pointerEvents = "all";

      let option2 = document.getElementById("option2") as HTMLElement;
      option2.innerHTML = answers[1] ? answers[1].answerText : "";
      option2.style.pointerEvents = "all";

      let option3 = document.getElementById("option3") as HTMLElement;
      option3.innerHTML = answers[2] ? answers[2].answerText : "";
      option3.style.pointerEvents = "all";

      let option4 = document.getElementById("option4") as HTMLElement;
      option4.innerHTML = answers[3] ? answers[3].answerText : "";
      option4.style.pointerEvents = "all";

      let response = document.getElementsByClassName(
        "response"
      ) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < response.length; i++) {
        response[i].style.cursor = "pointer";
      }

      let optionConf = document.getElementsByClassName(
        "optionConf"
      ) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < optionConf.length; i++) {
        optionConf[i].style.display = "none";
      }
      setShowreadMore(true);
      setFirstChoice(true);
    }
  }, [answers]);

  function confChoice(position: number): void {
    let optionConf = document.getElementsByClassName(
      "optionConf"
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < optionConf.length; i++) {
      optionConf[i].style.display = "none";
    }

    let response = document.getElementsByClassName(
      "response"
    ) as HTMLCollectionOf<HTMLElement>;

    response[position].style.cursor = "default";
    optionConf[position].style.display = "block";
  }
  async function choice(choice: number): Promise<void> {
    if (answers[choice]) {
      if (firstChoice) {
        const accessToken: string = props.accessToken;
        let correct: boolean = false;
        setFirstChoice(false);
        const chosenAnswerId: string = answers[choice]._id;
        await api
          .post(
            "chosen-answer",
            {
              answerId: chosenAnswerId,
              historyId: props.historyId,
              day: props.day,
            },
            {
              headers: {
                Authorization: accessToken,
              },
            }
          )
          .then((res: { data: { score: number } }) => {
            console.log("score", res.data.score);
            if (res.data.score < 0) {
              correct = false;
            } else {
              correct = true;
            }
          });
        props.setChosenId(chosenAnswerId);

        let option1 = document.getElementById("option1") as HTMLElement;
        option1.style.pointerEvents = "none";

        let option2 = document.getElementById("option2") as HTMLElement;
        option2.style.pointerEvents = "none";

        let option3 = document.getElementById("option3") as HTMLElement;
        option3.style.pointerEvents = "none";

        let option4 = document.getElementById("option4") as HTMLElement;
        option4.style.pointerEvents = "none";

        let popover = document.getElementById("popover") as HTMLElement;
        let feedback = document.getElementById("feedback") as HTMLElement;

        if (correct) {
          popover.style.background = "rgb(37, 207, 37)";
          feedback.innerHTML = "Correto!";
        } else {
          popover.style.background = "rgb(207, 57, 37)";
          feedback.innerHTML = "Errado!";
        }
      }

      let jsonCorrectAnswer = [{ correctAnswer: "" }];
      await api
        .get("question-answer/" + props.day)
        .then((res: { data: Object }) => {
          jsonCorrectAnswer = JSON.parse(JSON.stringify(res.data)); //TODO: consertar isso... crimes sendo cometidos aqui!
        });
      let correctAnswerElement = document.getElementById(
        "correctAnswer"
      ) as HTMLElement;
      correctAnswerElement.innerHTML = jsonCorrectAnswer[0]
        ? jsonCorrectAnswer[0].correctAnswer
        : "";
    }

    let popover = document.getElementById("popover") as HTMLElement;
    popover.style.visibility = "visible";
  }

  function readMore(): void {
    let readMore = document.getElementById("readMore") as HTMLElement;

    if (showreadMore) {
      readMore.style.visibility = "visible";
      readMore.style.height = "100%";

      let readMoreText = document.getElementById("readMoreText") as HTMLElement;
      readMoreText.innerHTML = question ? question.readMore : "";
      setShowreadMore(!showreadMore);
    } else {
      readMore.style.visibility = "hidden";
      readMore.style.height = "0px";
      setShowreadMore(!showreadMore);
    }
  }

  function continueBtn(): void {
    let readMore = document.getElementById("readMore") as HTMLElement;
    readMore.style.visibility = "hidden";
    readMore.style.height = "0px";

    let popover = document.getElementById("popover") as HTMLElement;
    popover.style.visibility = "hidden";

    props.passDay(props.day + 1);
  }

  return (
    <div className="gameContainer">
      <div className="shell-box">
        <div className="shell-heading">
          <i className="terminal icon">{">_"}</i> Power Shell
        </div>
        <div className="shell-script">
          <div className="welcome"></div>
          <div className="history"></div>
          <div className="cmd-line">
            PS C:\{">    "}
            <span className="type" id="questionText"></span>
            <br />
            <span className="type" id="questionQuestion"></span>
          </div>
        </div>
      </div>

      <div className="responses">
        <div className="optionContainer">
          <div
            id="option1"
            onClick={() => confChoice(0)}
            className="response"
          />
          <button
            onClick={() => choice(0)}
            id="option1Conf"
            className="optionConf"
          >
            {" "}
            Confirmar
          </button>
        </div>

        <div className="optionContainer">
          <div
            id="option2"
            onClick={() => confChoice(1)}
            className="response"
          />
          <button
            onClick={() => choice(1)}
            id="option1Conf"
            className="optionConf"
          >
            {" "}
            Confirmar
          </button>
        </div>

        <div className="optionContainer">
          <div
            id="option3"
            onClick={() => confChoice(2)}
            className="response"
          />
          <button
            onClick={() => choice(2)}
            id="option1Conf"
            className="optionConf"
          >
            {" "}
            Confirmar
          </button>
        </div>

        <div className="optionContainer">
          <div
            id="option4"
            onClick={() => confChoice(3)}
            className="response"
          />
          <button
            onClick={() => choice(3)}
            id="option1Conf"
            className="optionConf"
          >
            {" "}
            Confirmar
          </button>
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
  );
}
export default Game;
