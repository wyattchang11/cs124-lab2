import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

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
    task: "Take the kids out for dinner",
    completed: false,
  }

]

const Task = (props) => {
  return (
    <div class="row">
        <div class="col-12">
            <div class="Task">
                {props.task}
                <span>
                    <icon class="fas fa-edit"></icon>
                </span>
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

const Tab = (props) => {
  const classNames = ["tab-list-item"];
  if (props.activeTab === props.label) {
    classNames.push("tab-list-active");
  }
  return <li className={classNames.join(" ")}
          onClick={() => props.onClickTab(props.label)}>
            {props.label}
  </li>
}

const TabList = (props) => {
  const [activeTab, setActiveTab] = useState(props.children[0].key);

  return <div className="tabs">
      <ol className="tab-list">
          {props.children.map(child =>
              <Tab key={child.key}
                   label={child.key}
                   activeTab={activeTab}
                   onClickTab={(label) => setActiveTab(label)}/>)}
      </ol>
      {props.children.map(child => activeTab === child.key && child)}
  </div>;
}


const ToggleBar = (props) => {
    return (<div class="row">
        <div class="col-12">

        </div>
    </div>);
}

const TaskList = (props) => {
  return (
  <div class="container">
    <Header/>
    <ToggleBar/>
    <table>
        {props.data.map((entry) => {
        return <Task onAddTask={props.onAddTask} id={entry.id} task={entry.task} className={entry.completed ? "" : ""} />
        })}
    </table>
  </div>)

}





function App() {
  const [tasks, setTask] = useState(initialData)
  const [completedTasks, setCompletedTask] = useState([]);
  
  

  function handleAdd(task) {
    setTask([...task, { id: generateUniqueID(), completed: false }])
  }

  function handleComplete(task) {
    setCompletedTask([...task, { id: generateUniqueID(), completed: true }])
  }

  function deleteCompletedTasks() {
    setTask(tasks.filter(t => !completedTasks.includes(t.id)));
    setCompletedTask([]);
  }
  
  function editTask(taskId, name, value) {
    setTask(tasks.map(t => t.id === taskId ? {...t, [name]:value} : t));
  }
  
  return <TaskList onAddTask={handleAdd} data={tasks}/>;
}

export default App;