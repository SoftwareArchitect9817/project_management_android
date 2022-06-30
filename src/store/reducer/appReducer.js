import initialState from '../state';

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'toggleBottomModal': {
      const bottomModal = action.payload.bottomModal;
      return {
        ...state,
        bottomModal,
      };
    }
    case 'viewTask': {
      const selectedTask = action.payload.selectedTask;
      return {
        ...state,
        selectedTask,
      };
    }
    case 'user': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'project': {
      return {
        ...state,
        projects: action.payload,
      };
    }
    case 'member': {
      return {
        ...state,
        members: action.payload,
      };
    }
    case 'task': {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    // case 'addProject': {
    //   return {
    //     ...state,
    //     projects: [...state.projects, action.payload],
    //   };
    // }
    // case 'updateProject': {
    //   let projects = state.projects.map(project => {
    //     if (project.id === action.payload.id) {
    //       return action.payload;
    //     } else return project;
    //   });

    //   return {
    //     ...state,
    //     projects,
    //   };
    // }
    // case 'removeProject': {
    //   let projects = state.projects.map(project => {
    //     if (project.id === action.payload) return false;
    //     else return true;
    //   });

    //   return {
    //     ...state,
    //     projects,
    //   };
    // }
    // case 'initProject': {
    //   return {
    //     ...state,
    //     projects: action.payload,
    //   };
    // }
    default:
      return state;
  }
};
