import React from "react";
import Task from "./Task";

export default {
  title: "Task Component",
  component: Task,
};

export const TaskBaseExample = (props: any) => {
  return <Task todolistId={props.id} task={task} key={task.id} />;
};
