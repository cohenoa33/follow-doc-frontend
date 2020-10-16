import React from "react";
import { Link } from "react-router-dom";

const ProblemCard = (props) => {
  const { name, description, dependent, id } = props.problem;
  return (
    <div className="problem-card">
      <Link to={`/problems/${id}`}>
        <span className="problem-for">Dependent: {dependent.name} </span>
        <h3>Problem Name:</h3>
        <h1>{name} </h1>
        <h1 className="problem-name"></h1>
        <h3> Description: </h3>
        <p className="problem-description">{description}</p>
      </Link>{" "}
    </div>
  );
};

export default ProblemCard;
