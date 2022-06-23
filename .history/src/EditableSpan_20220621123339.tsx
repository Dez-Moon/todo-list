import React, { useState } from "react";

type EditableSpanPropsType = {
  value: string;
};
const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  return editMode ? (
    <span
      onDoubleClick={() => {
        setEditMode(true);
      }}
    >
      {props.value}
    </span>
  ) : (
    <input
      onBlur={() => {
        setEditMode(false);
      }}
    >
      {props.value}
    </input>
  );
};

export default EditableSpan;
