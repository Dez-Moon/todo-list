import { Grid, Paper } from "@mui/material";
import React from "react";
import AddItemForm from "./AddItemForm";

const TodolistsList = () => {
  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addToDoList} />
      </Grid>
      <Grid container spacing={5}>
        {todolists.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <ToDoList todolist={tl} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default TodolistsList;
