import { TextField } from "@mui/material";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
};
const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [title, setTitle] = useState<string>("");
  const activateEditMode = () => {
    if (!props.disabled) {
      setEditMode(true);
      setTitle(props.title);
    }
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      activateViewMode();
    }
  };
  return editMode ? (
    <TextField
      onBlur={activateViewMode}
      variant='standard'
      onKeyPress={onKeyPressHandler}
      value={title}
      autoFocus
      onChange={onChangeTitleHandler}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
});

export default EditableSpan;
