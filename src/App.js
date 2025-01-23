import './App.css';
import AddTodo from './components/AddTodo';
import CreateFrom from './components/CreateFrom';
import Navbar from './components/Navbar';
import NewTodo from './components/NewTodo';
import Read from './components/Read';
import Todos from './components/Todos';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar /> 
      <h1>learn about redux toolkitt</h1>
      {/* <AddTodo />
      <Todos /> */}
      <Routes>
        <Route path='/' element={<NewTodo/>} />
        <Route path='/createpost' element={<CreateFrom />} />
        <Route path='/read' element={<Read />} />
        <Route path='/edit/:id' element={<Update />} />
      </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
