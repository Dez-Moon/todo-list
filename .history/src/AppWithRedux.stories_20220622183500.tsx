import React from "react";
import { Provider } from "react-redux";
import AppWithRedux from "./AppWithRedux";

export default {
  title: "AppWithRedux Component",
  component: AppWithRedux,
};

export const AppWithReduxBaseExample = () => {
  return (
    <Provider store={store}>
      {" "}
      <AppWithRedux />
    </Provider>
  );
};
