import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasksSlice";

 // const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
 // ^^ Don't need!! ConfigureStore automatically adds thunk middleware, middleware to check for accidental state mutation, and sets up
 //    Redux DevTools Extension Connection

const store = configureStore({
    reducer:{
        tasks: taskReducer,
        // can have different slices with difference reducers here (instead of using combineReducers)
    }
});

export default store;