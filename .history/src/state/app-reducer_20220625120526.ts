
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    status: 'loading' as RequestStatusType
 }
 type InitialStateType = typeof initialState
 
export const appReducer = (
    state: TasksStateType = initialState,
    action: ActionsType
  ): TasksStateType => {
    switch (action.type) {
      case 
      default:
        return state;
    }
  };
  