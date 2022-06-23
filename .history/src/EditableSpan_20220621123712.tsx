import React, { useState } from "react";

type EditableSpanPropsType = {
  value: string;
};
const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  const activateEditMode = () => {
    setEditMode(true);
  };
  return editMode ? (
    <input
      onBlur={() => {
        setEditMode(false);
      }}
      value={props.value}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
};

export default EditableSpan;
