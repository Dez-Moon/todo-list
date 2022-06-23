import React from "react";
import { Provider } from "react-redux";
import Task from "./Task";

export default {
  title: "Task Component",
  component: Task,
};

export const TaskBaseExample = (props: any) => {
  return (
    <div>
      <Provider store={store}>
        <Task
          todolistId={"todolist1"}
          task={{ id: "1", isDone: true, title: "hohoho" }}
        />
        <Task
          todolistId={"todolist2"}
          task={{ id: "2", isDone: false, title: "vahahah" }}
        />
      </Provider>
    </div>
  );
};