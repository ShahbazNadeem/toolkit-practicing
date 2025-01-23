import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../redux/todo/todoSlice';

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // State to track the item being updated
  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState('');

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setNewText(currentText);
  };

  const handleUpdate = () => {
    if (newText.trim() === '') return;
    dispatch(updateTodo({ id: editingId, newText }));
    setEditingId(null);
    setNewText('');
  };

  return (
    <>
      <div>Todos</div>
      {todos.map((item) => (
        <li key={item.id}>
          {editingId === item.id ? (
            <>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              {item.text}
              <button onClick={() => handleEdit(item.id, item.text)}>Update</button>
              <button onClick={() => dispatch(removeTodo(item.id))}>X</button>
            </>
          )}
        </li>
      ))}
    </>
  );
};

export default Todos;
