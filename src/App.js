import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  // const [showTaskEditor, setShowTaskEditor] = useState(false);
  // // const [taskToEdit, setTaskToEdit] = useState({});
  // function toggleTaskEditor(){
  //   setShowTaskEditor(!showTaskEditor);
  // }

  return (<div>
      <div className={"row top-buffer"}>
        <div className={"col-12"}>
            <div className={props.className}>
              <div className="row">
                <div className="col-10" onClick={() => props.changeTaskField(props.task, "completed", !props.task.completed)}>
                  {props.task.task}
                </div>
                <div className="col-2 justify-content-center" onClick={() => {
                  props.changeTaskToEdit(props.task);
                  props.toggleTaskEditor();
                }}>
                  <FontAwesomeIcon icon={faEdit} name="editButton" size="sm"/>
                </div>
              </div>
                
            </div>
        </div>
      </div>
      
    </div>)
}

const TaskEditor = (props) => {
  const [inputValue, setInputValue] = useState(props.taskToEdit.task);
  const changeInputValue = (e) => setInputValue(e.target.value);
  return <div className={"container backdrop"}>
        <div className={"taskModal"}>
              <div className={"row"}>
                <input value={inputValue} onChange={changeInputValue} className={"taskEditor"}/>
              </div>
              <div className={"row align-items-center"}>
                <button className={"col-6 alert-button alert-cancel"} type={"button"} onClick={props.toggleTaskEditor}>
                    Cancel
                </button>
                <button className={"col-6 alert-button alert-ok"} type={"button"}
                        onClick={() => {
                          props.toggleTaskEditor();
                          props.changeTaskField(props.taskToEdit, "task", inputValue);
                        }}>
                    OK
                </button>
              </div>
        </div>
    </div>
}

const Header = (props) => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
      const interval = setInterval(() => setTime(new Date()), 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
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
      <TaskList onAddTask={props.onAddTask} data={props.data} showAllTasks={showAllTasks} toggleTaskEditor={props.toggleTaskEditor} changeTaskToEdit={props.changeTaskToEdit} changeTaskField={props.changeTaskField} />
    </div>
  </div>);
}

const TaskList = (props) => {
  const data = props.showAllTasks ? props.data : props.data.filter(entry => !entry.completed);
  return (data.map(entry =>  <Task 
    onAddTask={props.onAddTask} 
    id={entry.id} 
    task={entry} 
    changeTaskField={props.changeTaskField}  
    toggleTaskEditor={props.toggleTaskEditor}
    changeTaskToEdit={props.changeTaskToEdit}
    className={entry.completed ? "CompletedTask" : "Task"} />))
}

const DeletedButton = (props) => {
  return (
    <div>
      <FontAwesomeIcon icon={faTrash} name="trashButton" size="xl" onClick={props.deleteCompletedTasks}/>
    </div>
  );
}




function App() {
  const [tasks, setTask] = useState(initialData)
  const [showTaskEditor, setShowTaskEditor] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  function handleAdd(task, taskName) {
    setTask([...task, { id: generateUniqueID(), task: taskName, completed: false }])
  }

  function changeTaskField(task, field, value) {
    setTask(tasks.map(
      t => t.id === task.id ? {...t, [field]: value} : t
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
    <ToggleBar onAddTask={handleAdd} data={tasks} changeTaskField={changeTaskField} changeTaskToEdit={changeTaskToEdit} toggleTaskEditor={toggleTaskEditor}/>  
    <DeletedButton deleteCompletedTasks={deleteCompletedTasks}/>
    {showTaskEditor && <TaskEditor toggleTaskEditor={toggleTaskEditor} taskToEdit={taskToEdit} changeTaskField={changeTaskField}/>}
  </div>);
}

export default App;