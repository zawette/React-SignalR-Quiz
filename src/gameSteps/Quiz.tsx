import React from "react";
import "./Quiz.css";
import Collapse from "react-zaw-collapse";

interface Props {
  Question: React.ReactNode;
  answers: string[];
  setStep:(step:number)=>any;
}



function Quiz(props: Props) {
  const {} = props;
  let possibleAnswers = props.answers.map(answer => (
    <button className="quizAnswerBtn">{answer}</button>
  ));

  return (
    <div className="quizContainer">
      <div className="question">{props.Question} </div>
      <div className="answersContainer">{possibleAnswers}</div>
    </div>
  );
}

export default Quiz;
