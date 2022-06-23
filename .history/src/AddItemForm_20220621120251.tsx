import React, { ChangeEvent, useState } from "react";

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
  const onKeyPressHandler = (e: KeyboardEvent><HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addItem();
    }
  };
  return (
    <div>
      <input
        onKeyPress={onKeyPressHandler}
        onChange={onChangeHandler}
        value={title}
        className={error ? "error" : ""}
      />
      <button onClick={addItem}>+</button>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
};

export default AddItemForm;
