import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './Header.js';
import TaskEditor from './TaskEditor.js';
import ToggleBar from './ToggleBar.js';
import DeletedButton from './DeletedButton.js';
import {  useState } from 'react';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

import '../src/style.css';
const initialData = [
  {
    id: 1,
    task: "Abstain from interruption",
    completed: false,
  },
  {
    id: 2,
    task: "Engaged to the game",
    completed: true,
  }, 
  {
    id: 3,
    task: "Take the kids out for dinner divide by two and add 7 then you're good to go",
    completed: false,
  }
]


function App() {
  const [tasks, setTask] = useState(initialData)
  const [showTaskEditor, setShowTaskEditor] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  function handleAdd(task, taskName) {
    setTask([...task, { id: generateUniqueID(), task: taskName, completed: false }])
  }

  function onItemChanged(taskID, field, value) {
    setTask(tasks.map(
      t => t.id === taskID ? {...t, [field]: value} : t
    ))
  }

  function toggleTaskEditor(){
    setShowTaskEditor(!showTaskEditor);
  }

  function changeTaskToEdit(taskDescription){
    setTaskToEdit(taskDescription);
  }

  function deleteCompletedTasks(task) {
    setTask(tasks.filter(t => !t.completed));
  }

  return (<div className="container">
    <Header/>
    <ToggleBar onAddTask={handleAdd} data={tasks} onItemChanged={onItemChanged} changeTaskToEdit={changeTaskToEdit} toggleTaskEditor={toggleTaskEditor}/>  
    <DeletedButton deleteCompletedTasks={deleteCompletedTasks}/>
    {showTaskEditor && <TaskEditor toggleTaskEditor={toggleTaskEditor} taskToEdit={taskToEdit} onItemChanged={onItemChanged}/>}
  </div>);
}

export default App;