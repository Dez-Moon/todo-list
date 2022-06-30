import { Switch } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setMode } from "../../state/app-reducer";
import { AppRootStateType } from "../../state/store";
import "./DarkMode.css";

const DarkMode = () => {
  const darkMode = useSelector<AppRootStateType>((state) => state.app.darkMode);
  const dispatch = useDispatch();
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
      dispatch(setMode({ value: false }));
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
      dispatch(setMode({ value: true }));
    }
  };
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (theme === "dark") {
      dispatch(setMode({ value: true }));
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
