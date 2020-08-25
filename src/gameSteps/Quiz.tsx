import React, { useState, useEffect } from "react";
import "./Quiz.css";
import Collapse from "react-zaw-collapse";
import { steps } from "../utils/constants";

interface Props {
  data: {
    question: string;
    answer: string;
    anecdote: string;
    propositions: string[];
  }[];
  setStep: (step: number) => any;
  currentPlayer: string;
}

function Quiz(props: Props) {
  const [seconds, setSeconds] = useState(10);
  const meterPercentage = (seconds / 10) * 100;
  let possibleAnswers = props.data[0].propositions.map(proposition => (
    <button className="quizAnswerBtn" key={proposition} value={proposition}>
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
      <div className="question">{props.data[0].question} </div>
      <div className="answersContainer">{possibleAnswers}</div>
    </div>
  );
}

export default Quiz;
