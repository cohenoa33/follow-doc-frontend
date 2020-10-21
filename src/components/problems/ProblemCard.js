import React from "react";
import { Link } from "react-router-dom";

const ProblemCard = (props) => {
  const { name, description, dependent, id } = props.problem;
  return (
    <div className="problem-card">
      <Link to={`/problems/${id}`}>
        <div className="card-header">{name} </div>
        <div className="card-body"> Dependent: {dependent.name} </div>
        <div className="card-body">
          <h3> Problem Description: </h3>
          {description}
          <br />
        </div>
        <div className="card-footer">
          <button className="btn-info">More information </button>
        </div>
      </Link>
    </div>
  );
};

export default ProblemCard;
