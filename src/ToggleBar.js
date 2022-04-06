import TaskList from './TaskList.js';
import TaskAdder from './TaskAdder.js';
import { useState } from 'react';
import {collection, deleteDoc, doc, getFirestore, updateDoc, query, setDoc/* , serverTimestamp */} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";

const ToggleBar = (props) => {
    const [showAllTasks, setShowAllTasks] = useState(true);
    const displayAllTasks = () => setShowAllTasks(true);
    const hideCompletedTasks = () => setShowAllTasks(false);
    const q = query(collection(props.db, "taskLists", "EQT3yNLD651XBmdGfM2L", "tasks"));
    const [tasks, loading, error] = useCollectionData(q);




    if (loading) {
      <p>Loading</p>
    }
  
    if (error) {
      <p>ERROR</p>
    }
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
      <TaskAdder data={tasks} onAddTask={props.onAddTask}/>
      <div className="row">
        <TaskList data={tasks} showAllTasks={showAllTasks} toggleTaskEditor={props.toggleTaskEditor} togglePriorityBar={props.togglePriorityBar} changeTaskToEdit={props.changeTaskToEdit} onItemChanged={props.onItemChanged} onToggle/>
      </div>
    </div>);
}
export default ToggleBar;