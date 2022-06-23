import AddItemForm from "./AddItemForm";

export default {
  title: "AddItemForm Component",
  component: AddItemForm,
};

export const AddItemFormBaseExample = (props: any) => {
  return (
    <AddItemForm
      addItem={(value: string) => {
        alert(value);
      }}
    />
  );
};
