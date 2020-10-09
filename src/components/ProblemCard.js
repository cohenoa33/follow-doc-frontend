import React from "react";

const ProblemCard = (props) => {
  const { name, description, dependent } = props.problem;
  return (
    <div className="problem-card">
      <span className="problem-for">Dependent: {dependent.name} </span>
      <h3>Problem Name:</h3>
      <h1 className="problem-name">{name}</h1>
      <h3> Description: </h3>
      <p className="problem-description">{description}</p>
    </div>
  );
};

export default ProblemCard;
