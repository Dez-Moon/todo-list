import { AddBox } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from "react";
import { RequestStatusType } from "./state/app-reducer";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};
const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  console.log("AddItemFormCalled");
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItem();
    }
  };
  return (
    <div>
      <TextField
        variant='outlined'
        error={!!error}
        label='Type value'
        onKeyPress={onKeyPressHandler}
        onChange={onChangeHandler}
        value={title}
        helperText={error}
      />
      <IconButton color='primary' onClick={addItem} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  );
});

export default AddItemForm;
