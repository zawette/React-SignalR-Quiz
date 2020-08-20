import React from "react";
import Collapse from "react-zaw-collapse";

interface Props {
  children: React.ReactNode;
  Question: React.ReactNode;
  answers: []
}

function Quiz(props: Props) {
  const {} = props;

  return (
    <Collapse
      header={props.Question}
      onToggle={prevState => console.log(prevState)}
      initExpanded={true}
      className="Quiz"
    >
      Officia excepteur est velit tempor voluptate laborum excepteur ad enim
      duis velit velit velit exercitation. Sunt mollit nisi minim sint amet
      culpa nisi laborum velit. Ipsum laboris voluptate dolor ex sint nisi
      cillum occaecat deserunt eiusmod labore elit. Excepteur minim fugiat
      officia consectetur laboris commodo. Eiusmod occaecat deserunt ullamco ea
      aute. Cillum deserunt est eiusmod ipsum occaecat occaecat magna veniam ad
      aliqua anim nisi qui.
    </Collapse>
  );
}

export default Quiz;
