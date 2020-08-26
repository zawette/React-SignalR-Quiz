import React, { useRef } from "react";
import Collapse from "react-zaw-collapse";
import "./GameTitleStep.css";
interface Props {
  ReadyGame: (numberOfPlayers: number,lang:string,difficulty:string,quiz:string) => any;
}

function GameTitleStep(props: Props) {
  const langRef=useRef<HTMLSelectElement>(null);
  const quizRef=useRef<HTMLSelectElement>(null);
  const difficultyRef=useRef<HTMLSelectElement>(null);
  
  return (
    <div className="gameTitleContainer">
      <div className="Title">Who is The Hmar</div>
      <div className="nbrOfPlayersbtnContainer">
        <button
          className="nbrOfPlayersBtn"
          onClick={() => {
            props.ReadyGame(1,langRef.current!.value,difficultyRef.current!.value,quizRef.current!.value);
          }}
        >
          1 Player
        </button>
        <button
          className="nbrOfPlayersBtn"
          onClick={() => {
            props.ReadyGame(2,langRef.current!.value,difficultyRef.current!.value,quizRef.current!.value);
          }}
        >
          2 Players
        </button>
        <button
          className="nbrOfPlayersBtn"
          onClick={() => {
            props.ReadyGame(3,langRef.current!.value,difficultyRef.current!.value,quizRef.current!.value);
          }}
        >
          3 Players
        </button>
        <button
          className="nbrOfPlayersBtn"
          onClick={() => {
            props.ReadyGame(4,langRef.current!.value,difficultyRef.current!.value,quizRef.current!.value);
          }}
        >
          4 Players
        </button>
      </div>

      <Collapse header="configuration" className="configuration">
        <div className="lang">
          <div>language</div>
          <select name="lang" id="lang" ref={langRef}>
            <option value="fr">français</option>
            <option value="en">english</option>
          </select>
        </div>
        <div className="difficulty">
          <div>difficulty</div>
          <select name="difficulty" id="difficulty" ref={difficultyRef}>
            <option value="débutant">easy</option>
            <option value="confirmé">normal</option>
            <option value="expert">hard</option>
          </select>
        </div>
        <div className="quizName">
          <div>quiz</div>
          <select name="quiz" id="quiz" ref={quizRef}>
            <option value="culturegenerale">culturegenerale</option>
            <option value="culturegenerale2">culturegenerale2</option>
            <option value="culturegenerale3">culturegenerale3</option>
            <option value="culturegenerale3">culturegenerale3</option>
            <option value="culturegenerale4">culturegenerale4</option>
            <option value="culturegenerale5">culturegenerale5</option>
            <option value="cultureMondiale">cultureMondiale</option>
            <option value="cutlureEnVrac1">cutlureEnVrac1</option>
            <option value="cutlureEnVrac2">cutlureEnVrac2</option>
            <option value="geoPourTous">geoPourTous</option>
            <option value="inventions">inventions</option>
            <option value="nintendo">nintendo</option>
            <option value="playstation">playstation</option>
            <option value="personnagesCelebres">personnagesCelebres</option>
            <option value="peupleDuMonde">peupleDuMonde</option>
            <option value="series">series</option>
            <option value="starsMondiales">starsMondiales</option>
            <option value="starsMondiales2">starsMondiales2</option>
            <option value="starsMondiales3">starsMondiales3</option>
            <option value="starsMondiales4">starsMondiales4</option>
            <option value="VilleDuMonde">VilleDuMonde</option>

          </select>
        </div>
      </Collapse>
    </div>
  );
}

export default GameTitleStep;
