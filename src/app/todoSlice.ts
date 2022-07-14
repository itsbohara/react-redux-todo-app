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
    if (!tasks) return [];
    return JSON.parse(tasks);
}

const updateTaskDB = (tasks) => {
    const tasksArray = arrayFromObj(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasksArray))
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

        getTasksSuccess(state, action) {
            const tasks = action.payload;
            const byId = objFromArray(tasks);
            const allIds = keyArrayFromArray(tasks);
            state.tasks = { byId, allIds };
        },

        addTaskSuccess(state, action) {
            const task = action.payload;
            state.tasks.byId[task.id] = task;
            state.tasks.allIds.push(task.id);
        },

        removeTaskSuccess(state, action) {
            const taskId = action.payload;
            state.tasks.allIds = state.tasks.allIds.filter((id: any) => id !== taskId);
            state.tasks.byId = omit(state.tasks.byId, [taskId]);
        },
        updateTask(state, action) {
            const task = action.payload;
            state.board.byId[task.id] = task;
        }
    }
});

// Reducer
export default slice.reducer;

export function getTasks() {
    return async (dispatch: any, getState: any) => {
        const tasks = fetchTasks();
        dispatch(slice.actions.getTasksSuccess(tasks));
    }
}


export function addTask(task) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addTaskSuccess(task));
        const tasks = getState().todo.tasks.byId;
        //localstorage db
        updateTaskDB(tasks);
    }
}

export function updateTask(task) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateTask(task));
        const tasks = getState().todo.tasks.byId;
        //localstorage db
        updateTaskDB(tasks);
    }
}


export function deleteTask(taskId) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.removeTaskSuccess(taskId));
        const tasks = getState().todo.tasks.byId;
        //localstorage db
        updateTaskDB(tasks);
    }
}

function arrayFromObj(obj, defaultKey = "id") {
    const array = <any>[];
    for (const key in obj) {
        array.push(obj[key]);
    }
    return array;
}

function objFromArray(array, key = 'id') {
    return array.reduce((accumulator, current) => {
        accumulator[current[key]] = current;
        return accumulator;
    }, {});
}

function keyArrayFromArray(array, key = 'id') {
    return array.reduce((accumulator, current) => {
        accumulator.push(current[key])
        return accumulator;
    }, []);
}
