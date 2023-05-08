import SignIn from "./components/SignIn";
import { Route, Routes } from 'react-router-dom';
import SignUp from "./components/SignUp";
import Home from "./components/Notes";
import BreakPage from "./components/BreakPage";
import { PomoContext } from './components/Contexts/PomoContext'
import { useState } from "react";


function App() {
  const defaultBreak = 5 * 60
  const [Break, setBreak] = useState(parseInt(localStorage.getItem('break')) || defaultBreak);
  const formattedBreak = `${Math.floor(Break / 60).toString().padStart(2, "0")}:${(Break % 60).toString().padStart(2, "0")}`;
  const [isActiveBreak, setisActiveBreak] = useState(false);
  const defaultLongBreak = 15 * 60
  const [LongBreak, setLongBreak] = useState(parseInt(localStorage.getItem('longBreak')) || defaultLongBreak)
  const formattedLongBreak = `${Math.floor(LongBreak / 60).toString().padStart(2, "0")}:${(LongBreak % 60).toString().padStart(2, "0")}`;
  const [isActiveLongBreak, setisActiveLongBreak] = useState(false);
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [addTaskIsOpen, setAddTaskIsOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inputValues, setInputValues] = useState(['', '', '']);
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    return storedTasks || [];
  });
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState(0);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editing, setIsEditing] = useState(false)

  return (

    <div className="App">
      <PomoContext.Provider value={{ editing, setIsEditing, tasks, setTasks, input1, setInput1, input2, setInput2, input3, setInput3, editingTaskId, setEditingTaskId, todos, setTodos, inputValues, setInputValues, notes, setNotes, input, setInput, Break, setBreak, isActiveBreak, setisActiveBreak, formattedBreak, defaultBreak, isActiveLongBreak, setisActiveLongBreak, formattedLongBreak, setLongBreak, LongBreak, defaultLongBreak, addTaskIsOpen, setAddTaskIsOpen }}>
        <Routes>
          <Route exact path='/' element={<SignIn />}></Route>
          <Route exact path='home' element={<Home />}></Route>
          <Route exact path="break" element={<BreakPage />}></Route>
          <Route exact path='signup' element={<SignUp />}></Route>

        </Routes>
      </PomoContext.Provider>
    </div>
  );
}

export default App;

