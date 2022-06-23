import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
};
const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [title, setTitle] = useState<string>(props.title);
  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
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
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
};

export default EditableSpan;
