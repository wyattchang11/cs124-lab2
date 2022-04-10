import TaskList from './TaskList.js';
import TaskAdder from './TaskAdder.js';

import { useState } from 'react';
import { collection, deleteDoc, doc, getFirestore, updateDoc, query, setDoc/* , serverTimestamp */ } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import Dropdown from 'react-bootstrap/Dropdown';


const subCollectionName = "tasks";
const ToggleBar = (props) => {
  const [showAllTasks, setShowAllTasks] = useState(true);
  const displayAllTasks = () => setShowAllTasks(true);
  const hideCompletedTasks = () => setShowAllTasks(false);
  const [currentTaskListId, setCurrentTaskListId] = useState((props.taskLists && props.taskLists.length > 0) ? props.taskLists[0].id : "");
  const [currentTaskListName, setCurrentTaskListName] = useState((props.taskLists && props.taskLists.length > 0) ? props.taskLists[0].name : "");
  const q = query(collection(props.db, props.collectionName, currentTaskListId, subCollectionName));
  const [tasks, loading, error] = useCollectionData(q);


  function changeTaskList(newTaskList) {
    setCurrentTaskListId(newTaskList.id);
    setCurrentTaskListName(newTaskList.name);
  }


  function handleAdd(taskName) {
    const uniqueId = generateUniqueID();
    setDoc(doc(props.db, props.collectionName, currentTaskListId, subCollectionName, uniqueId),
      {
        id: uniqueId,
        task: taskName,
        completed: false,
        dateCreated: new Date().getTime(),
        priority: "low",
      });
  }

  // function onItemChanged(taskCollection, taskID, field, value) {
  //   updateDoc(doc(props.db, collectionName, currentTaskListId, subCollectionName, taskID), {[field]:value});
  // }


  function sortByDate() {
    tasks = [...tasks].sort((a, b) => (a.creationTime < b.creationTime)? 1:-1)
  }

  function sortByName() {
    tasks = [...tasks].sort((a,b) => (a.task < b.task)? 1:-1)
  }


  if (loading) {
    return <p>Loading</p>;
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
    <div className="row">
      <div className="col-6">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {currentTaskListName}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {props.taskLists.map(taskList => {
              return <Dropdown.Item key={taskList.id} onClick={() => changeTaskList(taskList)}>{taskList.name}</Dropdown.Item>
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='col-6'onClick={props.toggleFilter}>
        <div className="Tab">
          Filter
        </div>
      </div>
    </div>
    <TaskAdder data={tasks} onAddTask={handleAdd} />
    <div className="row">
      <TaskList data={tasks}
        showAllTasks={showAllTasks}
        taskCollectionId={currentTaskListId}
        toggleTaskEditor={props.toggleTaskEditor}
        togglePriorityBar={props.togglePriorityBar}
        changeTaskToEdit={props.changeTaskToEdit}
        onItemChanged={props.onItemChanged} onToggle />
    </div>
  </div>);
}
export default ToggleBar;