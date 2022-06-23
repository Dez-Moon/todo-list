import React from "react";

const AddItemForm = () => {
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
