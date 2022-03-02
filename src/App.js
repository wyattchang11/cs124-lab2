import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, Fragment } from 'react';
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

const Task = (props) => {
  return (
    <div class="row">
        <div class="col-12">
            <div className={props.className} onClick={(()=> console.log("1"))/*toggleComplete(props)*/}>
              {props.task}
              <FontAwesomeIcon icon={faEdit} name="editButton"/>
            </div>
        </div>
    </div>)
}

const Header = (props) => {
    const [time, setTime] = useState(new Date());
    return <div class="row">
        <div class="col-12">
            <div class="Header">
                <p id="time">{time.getHours() % 12}:{time.getMinutes()}</p>
                <p id="day">Today is {time.toLocaleString('default', { month: 'long' })} {time.getDate()}</p>
            </div>
        </div>
    </div>
} 

const ToggleBar = (props) => {
  const [showAllTasks, setShowAllTasks] = useState(true);
  const displayAllTasks = () => setShowAllTasks(true);
  const hideCompletedTasks = () => setShowAllTasks(false);
  return (<div>
    <div class="row">
      <div class="col-6" onClick={displayAllTasks}>
        <div className={showAllTasks ? "SelectedTab" : "Tab"}>
          All Tasks
        </div>
      </div>
      <div class="col-6" onClick={hideCompletedTasks}>
        <div className={showAllTasks ? "Tab" : "SelectedTab"}>
          Outstanding Tasks
        </div>
      </div>
    </div>
    <div class="row">
      <TaskList onAddTask={props.onAddTask} data={props.data} showAllTasks={showAllTasks}/>
    </div>
  </div>);
}

const TaskList = (props) => {
  const data = props.showAllTasks ? props.data : props.data.filter(entry => !entry.completed);
  return (data.map(entry =>  <Task onAddTask={props.onAddTask} id={entry.id} task={entry.task} className={entry.completed ? "CompletedTask" : "Task"} />))

}





function App() {
  const [tasks, setTask] = useState(initialData)
  const [completedTasks, setCompletedTask] = useState([]);
  
  

  function handleAdd(task) {
    setTask([...task, { id: generateUniqueID(), completed: false }])
  }

  function toggleComplete(task) {
    task.completed === false ? setCompletedTask([...task, { id: generateUniqueID(), completed: true }]) : 
    setCompletedTask(completedTasks.filter(t => t.id !== task.id))
}

  function deleteCompletedTasks() {
    setTask(tasks.filter(t => !completedTasks.includes(t.id)));
    setCompletedTask([]);
  }
  
  function editTask(taskId, name, value) {
    setTask(tasks.map(t => t.id === taskId ? {...t, [name]:value} : t));
  }
  
  return (<div class="container">
    <Header/>
    <ToggleBar onAddTask={handleAdd} data={tasks}/>  
  </div>);
}

export default App;