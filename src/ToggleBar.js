import TaskList from './TaskList.js';
import TaskAdder from './TaskAdder.js';
import { useState } from 'react';


const ToggleBar = (props) => {
    const [showAllTasks, setShowAllTasks] = useState(true);
    const displayAllTasks = () => setShowAllTasks(true);
    const hideCompletedTasks = () => setShowAllTasks(false);
    
    // const [currentTaskList, setCurrentTaskList] = useState(props.TaskList[0]);

    // const q = query(collection("taskLists", collectionName, currentTaskList[0], "tasks"));

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
      <TaskAdder data={props.data} onAddTask={props.onAddTask}/>
      <div className="row">
        <TaskList data={props.data} showAllTasks={showAllTasks} toggleTaskEditor={props.toggleTaskEditor} togglePriorityBar={props.togglePriorityBar} changeTaskToEdit={props.changeTaskToEdit} onItemChanged={props.onItemChanged} onToggle/>
      </div>
    </div>);
}
export default ToggleBar;