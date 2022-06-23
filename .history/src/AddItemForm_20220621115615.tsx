import React, { useState } from "react";
import { setSyntheticLeadingComments } from "typescript";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
const AddItemForm = (props: AddItemFormPropsType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("Title is required");
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return (
    <div>
      <input
        onKeyPress={onKeyPressHandler}
        onChange={onChangeHandler}
        value={title}
      />
      <button onClick={AddTask}>+</button>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
};

export default AddItemForm;
