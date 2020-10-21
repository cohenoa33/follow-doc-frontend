import React from "react";
import DeletePopUp from "../components/DeletePopUp";

export const renderDeletePopup = (handleDelete, className) => (
  <DeletePopUp handleDelete={handleDelete} className={className} />
);
