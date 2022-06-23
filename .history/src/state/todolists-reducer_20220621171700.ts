import { ToDoListType } from './../../.history/src/App_20220621102428';
 type ActionType = {
    type: string
    [key: string]: any
 }
 let toDoList1 = uuidv1();
 let toDoList2 = uuidv1();
 let [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
   { id: toDoList1, title: "What to learn", filter: "all" },
   { id: toDoList2, title: "What to buy", filter: "all" },
 ]);

const state = [
    { id: toDoList1, title: "What to learn", filter: "all" },
{ id: toDoList2, title: "What to buy", filter: "all" }]
 export const todolistsReducer = (state: Array<ToDoListType>, action: ActionType): Array<ToDoListType>  => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return {};
            default:
            throw new Error("I don't understand this type")
    }
 }