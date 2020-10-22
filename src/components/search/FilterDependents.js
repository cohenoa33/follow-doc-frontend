import React from "react";

const FilterDependents = ({ dependents, handleFilter }) => {
  return (
    <div>
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

export default FilterDependents;
