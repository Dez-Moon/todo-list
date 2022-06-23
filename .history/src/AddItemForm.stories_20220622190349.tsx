import { action } from "@storybook/addon-actions";
import React from "react";
import AddItemForm from "./AddItemForm";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

export default {
  title: "AddItemForm Component",
  component: AddItemForm,
  decorators: [ReduxStoreProviderDecorator],
};
export const AddItemFormBaseExample = (props: any) => {
  return <AddItemForm addItem={callback} />;
};
const callback = action("Button add was pressed inside the form");
