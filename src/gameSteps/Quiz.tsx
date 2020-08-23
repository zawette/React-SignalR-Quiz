import React, { useState, useEffect } from "react";
import "./Quiz.css";
import Collapse from "react-zaw-collapse";

interface Props {
  data: { question: string; answers: string[] }[];
  setStep: (step: number) => any;
}

function Quiz(props: Props) {
  const [seconds, setSeconds] = useState(10);
  const meterPercentage=seconds/10*100;
  let possibleAnswers = props.data[0].answers.map(answer => (
    <button className="quizAnswerBtn" key={answer}>
      {answer}
    </button>
  ));

  useEffect(() => {
    const interval = setInterval(() => setSeconds(seconds => seconds - 1), 1000);
    if (seconds === 0) clearInterval(interval);
    return () => clearInterval(interval!);
  }, [seconds]);

  return (
    <div className="quizContainer">
      <div className="progressBarContainer">
        <span className="progressDots" style={{width:`${meterPercentage}%`}}></span>
      </div>
      <div className="question">{props.data[0].question} </div>
      <div className="answersContainer">{possibleAnswers}</div>
    </div>
  );
}

export default Quiz;
