import { ToDoListType } from './../../.history/src/App_20220621102428';
 type ActionType = {
    type: string
    [key: string]: any
 }

 export const todolistsReducer = (state: Array<ToDoListType>, action: ActionType): Array<ToDoListType>  => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age +1};
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount +1};
        case 'CHANGE-NAME':
            return {...state, name: action.newName}
            default:
            throw new Error("I don't understand this type")
    }
 }