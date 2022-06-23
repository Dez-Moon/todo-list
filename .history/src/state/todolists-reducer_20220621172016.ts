import { ToDoListType } from './../../.history/src/App_20220621102428';
 type ActionType = {
    type: string
    [key: string]: any
 }
 export const todolistsReducer = (state: Array<ToDoListType>, action: ActionType): Array<ToDoListType>  => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return {};
            default:
            throw new Error("I don't understand this type")
    }
 }