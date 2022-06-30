import { Switch } from "@mui/material";
import React, { ChangeEvent } from "react";
import "./DarkMode.css";

const DarkMode = () => {
  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme: any;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }
  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }
  const switchTheme = (e: ChangeEvent<HTMLInputElement>) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
    }
  };
  const [checked, setChecked] = React.useState(true);

  return (
    <Switch
      checked={checked}
      onChange={() => {}}
      inputProps={{ "aria-label": "controlled" }}
    ></Switch>
  );
};

export default DarkMode;