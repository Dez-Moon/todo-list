import React, { useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
const AddItemForm = (props: AddItemFormPropsType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

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
