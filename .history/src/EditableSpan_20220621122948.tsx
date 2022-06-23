import React from "react";

type EditableSpanPropsType = {
  value: string;
};
const EditableSpan = (props: EditableSpanPropsType) => {
  return <span>{props.value}</span>;
};

export default EditableSpan;
