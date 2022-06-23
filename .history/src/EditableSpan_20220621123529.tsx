import React, { useState } from "react";

type EditableSpanPropsType = {
  value: string;
};
const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  return editMode ? (
    <input
      onBlur={() => {
        setEditMode(false);
      }}
      value={props.value}
    />
  ) : (
    <span
      onDoubleClick={() => {
        setEditMode(true);
      }}
    >
      {props.value}
    </span>
  );
};

export default EditableSpan;
