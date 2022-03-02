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
    <div className={"row top-buffer"}>
        <div className={"col-12"}>
            <div className={props.className} onClick={() => props.onToggleComplete(props.task)}>
              <div className="row">
                <div className="col-10">
                  {props.task.task}
                 </div>
                <div className="col-2 justify-content-center">
                  <FontAwesomeIcon icon={faEdit} name="editButton" size="sm" onClick={() => console.log(1)}/>
                </div>
              </div>
                
            </div>
        </div>
    </div>)
}

const Header = (props) => {
    const [time, setTime] = useState(new Date());
    // useEffect(() => {
    //   const interval = setInterval(() => setTime(new Date()), 1000);
  
    //   return () => {
    //     clearInterval(interval);
    //   };
    // }, []);
    return <div className="row">
        <div className="col-12">
            <div className="Header">
                <p id="time">{time.getHours()}:{time.getMinutes()}</p>
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
    <div className="row">
      <div className="col-6" onClick={displayAllTasks}>
        <div className={showAllTasks ? "SelectedTab" : "Tab"}>
          All Tasks
        </div>
      </div>
      <div className="col-6" onClick={hideCompletedTasks}>
        <div className={showAllTasks ? "Tab" : "SelectedTab"}>
          Outstanding Tasks
        </div>
      </div>
    </div>
    <div className="row">
      <TaskList onAddTask={props.onAddTask} data={props.data} showAllTasks={showAllTasks} onToggleComplete={props.onToggleComplete}/>
    </div>
  </div>);
}

const TaskList = (props) => {
  const data = props.showAllTasks ? props.data : props.data.filter(entry => !entry.completed);
  return (data.map(entry =>  <Task onAddTask={props.onAddTask} id={entry.id} task={entry} onToggleComplete={props.onToggleComplete} className={entry.completed ? "CompletedTask" : "Task"} />))

}





function App() {
  const [tasks, setTask] = useState(initialData)

  function handleAdd(task) {
    setTask([...task, { id: generateUniqueID(), completed: false }])
  }

  function toggleComplete(task) {
    setTask(tasks.map(
      t => t.id === task.id ? {...t, completed: !t.completed} : t
    ))
  }

  // function deleteCompletedTasks() {
  //   setTask(tasks.filter(t => !completedTasks.includes(t.id)));
  //   setCompletedTasks([]);
  // }
  
  function editTask(taskId, name, value) {
    setTask(tasks.map(t => t.id === taskId ? {...t, [name]:value} : t));
  }
  
  return (<div className="container">
    <Header/>
    <ToggleBar onAddTask={handleAdd} data={tasks} onToggleComplete={toggleComplete}/>  
  </div>);
}

export default App;