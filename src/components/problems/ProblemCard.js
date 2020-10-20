import React from "react";
import { Link } from "react-router-dom";

const ProblemCard = (props) => {
  const { name, description, dependent, id } = props.problem;
  return (
    <div className="problem-card">
      <Link to={`/problems/${id}`}>
        <div className="card-header">{name}</div>
        <div className="card-body">
          Dependent:
          <br />
          {dependent.name}
          <br />
          <br />
          <h3> Problem Description: </h3>
          {description}
        </div>
      </Link>
    </div>
  );
};

export default ProblemCard;
