import React from "react";

const SortFuture = ({ status, handleSort }) => {
  return (
    <div>
      <label>
        <input
          name="futureOnly"
          type="checkbox"
          value={status}
          onChange={handleSort}
        />{" "}
        Show Only Future Appointments
      </label>
    </div>
  );
};

export default SortFuture;
