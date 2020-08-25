import React, { useState, useEffect } from "react";
import "./Quiz.css";
import Collapse from "react-zaw-collapse";
import { steps } from "../utils/constants";
import { HubConnection } from "@microsoft/signalr";

interface Props {
  data: {
    question: string;
    answer: string;
    anecdote: string;
    propositions: string[];
  };
  setStep: (step: number) => any;
  currentPlayer: string;
  HubConnection:HubConnection;
}

function Quiz(props: Props) {
  const [disableBtn,setDisableBtn]=useState(false);
  const [seconds, setSeconds] = useState(10);
  const meterPercentage = (seconds / 10) * 100;

  const answerQuiz=(answer:string)=>{
    setDisableBtn(true);
    if(answer===props.data!.answer){
      props.HubConnection.invoke("AddScoreTo",props.currentPlayer);
    }
  }


  let possibleAnswers = props.data.propositions.map(proposition => (
    <button className="quizAnswerBtn" disabled={disableBtn} key={proposition} value={proposition} onClick={(e)=>answerQuiz(e.currentTarget.value ) }>
      {proposition}
    </button>
  ));

  useEffect(() => {
    const interval = setInterval(
      () => setSeconds(seconds => seconds - 1),
      1000
    );
    if (seconds === 0) {
      clearInterval(interval);
      props.setStep(steps.PRE_GAME);
    }
    return () => clearInterval(interval!);
  }, [seconds]);

  return (
    <div className="quizContainer">
      <div className="progressBarContainer">
        <span
          className="progressDots"
          style={{ width: `${meterPercentage}%` }}
        ></span>
      </div>
      <div className="question">{props.data.question} </div>
      <div className="answersContainer">{possibleAnswers}</div>
    </div>
  );
}

export default Quiz;
