import React, { useState } from "react";

type EditableSpanPropsType = {
  value: string;
};
const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [title, setTitle] = useState<string>("");
  const activateEditMode = () => {
    setEditMode(true);
  };
  const activateViewMode = () => {
    setEditMode(false);
  };
  return editMode ? (
    <input onBlur={activateViewMode} value={props.value} autoFocus />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
};

export default EditableSpan;
