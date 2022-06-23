import React from "react";
import { Provider } from "react-redux";
import AppWithRedux from "./AppWithRedux";
import { store } from "./state/store";

export default {
  title: "AppWithRedux Component",
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],
};

export const AppWithReduxBaseExample = () => {
  return <AppWithRedux />;
};
