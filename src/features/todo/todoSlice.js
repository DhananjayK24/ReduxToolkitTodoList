import { createSlice } from "@reduxjs/toolkit";

const localStorageTodo = JSON.parse(localStorage.getItem('TodoList'));
const todos = (localStorage.getItem('TodoList')!==null) ? localStorageTodo : [];

const initialState = {
     todos: todos,
};

const updateLocalStorage = (newTodos) =>{
    localStorage.setItem('TodoList', JSON.stringify(newTodos));
};

const todoSlice = createSlice({
    name: 'Todo',
    initialState,
    reducers: {
        add_task: (state,  {payload} ) =>{
            const todo = payload;
            state.todos = [...state.todos, {id: todo, todo: todo, success: false}]; 
            updateLocalStorage(state.todos);
        },
        success_task: (state, {payload}) =>{
            state.todos = state.todos.map((t)=> (t.id===payload.id) ? {...t, success: !t.success} : t);
            updateLocalStorage(state.todos);
        },
        remove_task: (state, {payload}) =>{
            state.todos = state.todos.filter((t)=>t.id!==payload.id);
            updateLocalStorage(state.todos);
        }
    }
});

export default todoSlice.reducer;
export const {add_task, success_task, remove_task} = todoSlice.actions;