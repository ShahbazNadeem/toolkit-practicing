import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from "../redux/todo/todoSlice"

const AddTodo = () => {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const addTodoHandler = (e) => {
        e.preventDefault()
        dispatch(addTodo(input))
        setInput("")
    }
    return (
        <div>
            <form onSubmit={addTodoHandler}>
                <input type="text" placeholder='enter a todo' value={input}
                    onChange={(e) => setInput(e.target.value)} />
                <button type='submit'>Add todo</button>
            </form>
        </div>
    )
}

export default AddTodo