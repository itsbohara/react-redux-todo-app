import { createSlice } from "@reduxjs/toolkit"
import omit from 'lodash/omit';

const initialState: any = {
    tasks: {
        byId: {},
        allIds: []
    }
}

const fetchTasks = () => {
    const tasks: any = localStorage.getItem('tasks');
    return JSON.parse(tasks);
}

const updateTaskDB = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

        getTasksSuccess(state, action) {
            const tasks = action.payload;
            // const byId = objFromArray(tasks);
            // const allIds = keyArrayFromArray(tasks);
            // state.tasks = { byId, allIds };
            state.tasks = tasks;
        },

        addTaskSuccess(state, action) {
            const task = action.payload;
            state.tasks.byId[task.id] = task;
            state.tasks.allIds.push(task.id);
            //localstorage db
            updateTaskDB(state.tasks);
        },

        removeTaskSuccess(state, action) {
            const taskId = action.payload;
            state.tasks.allIds = state.tasks.allIds.filter((id: any) => id !== taskId);
            state.tasks.byId = omit(state.tasks.byId, [taskId]);
            //localstorage db
            updateTaskDB(state.tasks);
        },
        updateTask(state, action) {
            const task = action.payload;
            state.board.byId[task.id] = task;
            //localstorage db
            updateTaskDB(state.tasks);
        }
    }
});

// Reducer
export default slice.reducer;

export function getTasks() {
    return async (dispatch, getState) => {
        const tasks = fetchTasks();
        dispatch(slice.actions.getTasksSuccess(tasks));
    }
}

export function addTask(task) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addTaskSuccess(task));
    }
}

export function updateTask(task) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateTask(task));
    }
}


export function deleteTask(taskId) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.removeTaskSuccess(taskId));
    }
}