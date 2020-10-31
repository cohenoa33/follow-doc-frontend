import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { addFile } from "../../actions";
import { connect } from "react-redux";
{
  /* accept="image/png, image/gif, application/doc, application/pdf, application/docx " */
}

const Dropzone = (props) => {
  const maxSize = 1048576;

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file);
      formData.append("problem_id", props.id);

      props.uploadFile(formData);
    });
  }, []);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
  } = useDropzone({
    onDrop,
    // accept: "image/png",
    minSize: 0,
    maxSize,
  });

  const isFileTooLarge = !rejectedFiles
    ? null
    : rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  return (
    <button className="uploadFiles">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {!isDragActive && "Click here or drop a file to upload"}
        {isDragActive && !isDragReject && "Drop files here"}
        {isDragReject && "File type not accepted, sorry"}
        {isFileTooLarge && (
          <div className="text-danger mt-2">File is too large.</div>
        )}
      </div>
    </button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFile: (problem) => dispatch(addFile(problem)),
  };
};

export default connect(null, mapDispatchToProps)(Dropzone);
