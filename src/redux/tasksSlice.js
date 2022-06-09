import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Status } from "./statusEnum" 
const axios = require('axios').default;

function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return (maxId + 1).toString();
}

/*
CreateSlice:
- Helps simplify reducer logic and actions.
- Can write reducers as functions inside an object, instead of have a switch-case ladder
- reducers able to write shorter immutable update logic (can write mutable but really it's immutable using Immer on the backend)
- action creators get generated automatically based on the reducer functions
- can pass multiple arguments to reducers using "prepare callback"
*/

const initialState = {
    tasks: [],
    status: Status.IDLE,
    error: null
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const resp = await axios.get('https://txcyylnjri.execute-api.us-east-1.amazonaws.com/prod/gettasks');
    return resp.data
  })

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers:{
        addTask: (state, action)=>{
            const newTask = {
                id: nextTodoId(state.tasks),
                name: action.payload.task,
                completed: false
            }
            state.tasks.push(newTask);
        },
        deleteTask: (state, action)=>{
            state.tasks = state.tasks.filter((item) => item.id !== action.payload.id);
        },
        toggleTask: (state, action)=>{
            const task = state.tasks.find((item) => item.id === action.payload.id);
            task.completed = !task.completed
        },
        toggleAll: (state, action)=>{
            if (action.payload.selectAll){
                state.tasks.forEach((element, index) => {
                    element.completed = true;
                });
            } else {
                state.tasks.forEach((element, index) => {
                    element.completed = false;
                });
            }
        }
    },
    extraReducers(builder)  {
        builder
        .addCase(fetchTasks.pending, (state, action) => {
          state.status = Status.LOADING;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = Status.SUCCEEDED
            const currentIds = state.tasks.map(task => task.id);
            action.payload.reverse();
            action.payload.forEach((element, index) => {
            if (!currentIds.includes(element.task_id)) {
                state.tasks.push({
                    id: element.task_id,
                    name: element.task_name,
                    completed: element.completed
                })
            }
            })
        })
        .addCase(fetchTasks.rejected, (state, action) => {
          state.status = Status.FAILED
          state.error = action.error.message
        })
    }
});

/* 
Thunks are typically written in "slice" files. 
createSlice  does not have any special support for defining thunks, so you should write them as separate functions in the same file. 
That way, they have access to the plain action creators for that slice, and it's easy to find where the thunk lives.
*/

export const {addTask, deleteTask, toggleTask, toggleAll} = tasksSlice.actions;

export const selectTodos = state => state.tasks.tasks;

export const selectTodosRemaining = state => state.tasks.tasks.filter(task => !task.completed).length

export default tasksSlice.reducer;