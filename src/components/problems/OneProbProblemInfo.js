import React from "react";

const OneProbProblemInfo = ({ name, description, dependent }) => {
  return (
    <div>
      <div className="problem-container-description">
        <br />
        <span> Dependent: </span>
        <span> {dependent}</span>
        <h1>{name}</h1>
        Description:
        <div>{description} </div>
      </div>
    </div>
  );
};

export default OneProbProblemInfo;
