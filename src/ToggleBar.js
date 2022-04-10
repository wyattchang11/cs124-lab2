import TaskList from './TaskList.js';
import TaskAdder from './TaskAdder.js';
import Header from './Header.js';
import Filter from'./Filter.js';

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
  const [showFilter, setShowFilter] = useState(false);
  const [currentTaskList, setCurrentTaskList] = useState((props.taskLists && props.taskLists.length > 0) ? props.taskLists[0].id : "");
  const q = query(collection(props.db, props.collectionName, currentTaskList, subCollectionName));
  const [tasks, loading, error] = useCollectionData(q);

  function changeTaskList(newTaskList) {
    setCurrentTaskList(newTaskList);
  }

  function handleAdd(taskName) {
    const uniqueId = generateUniqueID();
    setDoc(doc(props.db, props.collectionName, currentTaskList, subCollectionName, uniqueId),
      {
        id: uniqueId,
        task: taskName,
        completed: false,
        dateCreated: new Date().getTime(),
        priority: "low",
      });
  }

  

  function toggleFilter() {
    setShowFilter(!showFilter);
  }


  if (loading) {
    return (<div className="container">
      <Header/>
      <p>Loading</p>;
    </div>);
  }

  if (error) {
    return (<div className="container">
      <Header/>
      <p>Error</p>;
    </div>);
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
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='col-6'onClick={toggleFilter}>
        <div className="Tab">
          Filter
        </div>
      </div>
    </div>
    {showFilter && <Filter toggleFilter={toggleFilter} 
                                      taskToEdit={props.taskToEdit} 
                                      onItemChanged={props.onItemChanged}
                                      tasks={tasks}
                                      />}
    <TaskAdder data={tasks} onAddTask={props.onAddTask} />
    <div className="row">
      <TaskList data={tasks}
        showAllTasks={showAllTasks}
        toggleTaskEditor={props.toggleTaskEditor}
        togglePriorityBar={props.togglePriorityBar}
        changeTaskToEdit={props.changeTaskToEdit}
        onItemChanged={props.onItemChanged} onToggle />
    </div>
  </div>);
}
export default ToggleBar;