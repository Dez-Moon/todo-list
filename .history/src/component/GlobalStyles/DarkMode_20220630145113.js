import React from "react";

const DarkMode = () => {
  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }
  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }
  return (
    <button
      className={theme === "dark" ? clickedClass : ""}
      id='darkMode'
      onClick={(e) => switchTheme(e)}
    ></button>
  );
};

export default DarkMode;
