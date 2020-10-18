import React from "react";
import { Link } from "react-router-dom";

const ProblemCard = (props) => {
  const { name, description, dependent, id } = props.problem;
  return (
    <div className="problem-card">
      <div className="dependent-card">
        <h1>{name} </h1>
        <br />
        Dependent: {dependent.name}
      </div>
      <br />
      <h1 className="problem-name"></h1>
      <h3> Problem Description: </h3>
      <p className="problem-description">{description}</p>
      <br />
      <button className="btn">
        <Link to={`/problems/${id}`}> More Info</Link>{" "}
      </button>
    </div>
  );
};

export default ProblemCard;
