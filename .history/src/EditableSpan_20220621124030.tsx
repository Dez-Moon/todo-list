import React, { KeyboardEvent, useState } from "react";

type EditableSpanPropsType = {
  value: string;
};
const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [title, setTitle] = useState<string>(props.value);
  const activateEditMode = () => {
    setEditMode(true);
  };
  const activateViewMode = () => {
    setEditMode(false);
  };
  const editTitle = (e: KeyboardEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return editMode ? (
    <input
      onBlur={activateViewMode}
      value={props.value}
      autoFocus
      onChange={}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
};

export default EditableSpan;
