import React, { ChangeEvent, useState } from "react";

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
  const editTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return editMode ? (
    <input
      onBlur={activateViewMode}
      value={title}
      autoFocus
      onChange={editTitle}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
};

export default EditableSpan;
