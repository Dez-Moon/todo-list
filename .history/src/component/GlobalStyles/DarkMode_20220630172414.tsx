import { Switch } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
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
  const switchTheme = (e: any) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
      setChecked(false);
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
      setChecked(true);
    }
  };
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (theme === "dark") {
      setChecked(true);
    } else {
      return;
    }
  }, []);

  return (
    <Switch
      checked={checked}
      onChange={switchTheme}
      inputProps={{ "aria-label": "controlled" }}
    ></Switch>
  );
};

export default DarkMode;
