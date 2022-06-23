import React, { useState } from "react";

type EditableSpanPropsType = {
  value: string;
};
const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  return {editMode ? <span>{props.value}</span> : <input>{props.value}</input>}
};

export default EditableSpan;
