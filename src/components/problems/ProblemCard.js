import React from "react";
import { Link } from "react-router-dom";

const ProblemCard = (props) => {
  const { name, description, dependent, id } = props.problem;
  return (
    <div className="problem-card">
      <div className="dependent-card">
        <div className="card-header">{name} </div>
        <br />
        Dependent: {dependent.name}
      </div>
      <div className="card-body">
        <h3> Problem Description: </h3>
        {description}
        <br />
      </div>
      <div className="card-footer">
        <button className="btn-info">
          <Link to={`/problems/${id}`}>More information</Link>{" "}
        </button>
      </div>
    </div>
  );
};

export default ProblemCard;
