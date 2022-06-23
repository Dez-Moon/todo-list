import { ActionTypes } from '@mui/base';
import { TasksStateType } from './../../.history/src/App_20220621183248';
type RemoveTaskActionType = {
  type: "REMOVE_TASK";
  id: string;
  taskId: string;
}
type ActionsType = RemoveTaskActionType

export const tasksReducer = (
  state: TasksStateType,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 
    default:
      throw new Error("I don't understand this type");
  }
};
export const removeTaskAC = (): RemoveTaskActionType => ({type: "REMOVE-TASK", id: ActionTypes.})