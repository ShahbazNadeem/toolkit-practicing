import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{ id: 1, text: "helo world" }],
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
            console.log(state.todos, 'state');
            // jo id match ni kr rhi jo remove ho jay gi baqi show ho gi
        },
        updateTodo: (state, action) => {
            const { id, newText } = action.payload; // Destructure the payload
            const todo = state.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.text = newText;
            }
        },

    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer