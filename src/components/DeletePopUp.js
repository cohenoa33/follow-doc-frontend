import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const DeletePopUp = ({ handleDelete, className }) => {
  return (
    <Popup
      trigger={<button className={className}> Delete </button>}
      modal
      nested
      closeOnDocumentClick={false}
    >
      {(close) => (
        <div className="modal">
          <div>
            <button className="back-btn" onClick={close}>
              back
            </button>
          </div>
          <div>Are you sure you want to delete this item?</div>
          <br />
          <button className="btn-10" onClick={handleDelete}>
            {" "}
            Yes
          </button>
        </div>
      )}
    </Popup>
  );
};

export default DeletePopUp;
