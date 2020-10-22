import React from "react";

const SortFuture = ({ dependents, handleFilter }) => {
  return (
    <div>
      <h1 className="h1-title">Appointments List</h1>
      <label>
        Filter by Dependent:{" "}
        <select name="filter" onChange={handleFilter}>
          <option value="all">All</option>
          {dependents.map((dependant) => (
            <option key={dependant.id} value={dependant.name}>
              {dependant.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SortFuture;
