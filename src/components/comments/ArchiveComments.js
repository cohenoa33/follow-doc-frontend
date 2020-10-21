import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import OneProbCommentsTable from "./OneProbCommentTable";

class ArchiveComments extends React.Component {
  renderOneProbCommentsTable = (comments) => (
    <OneProbCommentsTable comments={comments} />
  );
  render() {
    return (
      <Popup
        trigger={<button className="btn"> Archive Notes </button>}
        modal
        nested
        closeOnDocumentClick={false}
        onOpen={this.refreshState}
        lockScroll={true}
      >
        {(close) => (
          <div className="modal">
            <button className="back-btn" onClick={close}>
              back
            </button>
            <div className="actions">
              <h1 className="h1-title">Archive Notes </h1>
              {this.renderOneProbCommentsTable(this.props.comments)}
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default ArchiveComments;
