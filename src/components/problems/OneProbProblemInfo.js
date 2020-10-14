import React from "react";

const OneProbProblemInfo = (props) => {
  console.log(props.problem);
  return (
    <div>
      {props.problem.map((problem) => (
        <div className="problem-container-description">
          <span> Dependent: </span>
          <span> {problem.dependent.name}</span>
          <h1>{problem.name}</h1>
          Description:
          <div>{problem.description} </div>
        </div>
      ))}
    </div>
  );
};

export default OneProbProblemInfo;
