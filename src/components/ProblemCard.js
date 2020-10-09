import React from "react";
import { Link } from "react-router-dom";

const ProblemCard = (props) => {
  const { name, description, dependent, id } = props.problem;
  //   let slug = name.replace(/ /g, "-").replace(/[^a-zA-Z0-9._~_-]/g, "") + id;
  return (
    <div className="problem-card">
      <span className="problem-for">Dependent: {dependent.name} </span>
      <h3>Problem Name:</h3>
      <h1 className="problem-name">
        <Link to={`/problems/${id}`}>{name} </Link>{" "}
      </h1>
      <h3> Description: </h3>
      <p className="problem-description">{description}</p>
    </div>
  );
};

export default ProblemCard;
