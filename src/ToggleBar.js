import TaskList from './TaskList.js';
import TaskAdder from './TaskAdder.js';
import Header from './Header.js';


import { useState } from 'react';
import { collection, deleteDoc, doc, getFirestore, updateDoc, query, orderBy, setDoc/* , serverTimestamp */ } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import Dropdown from 'react-bootstrap/Dropdown';
import DeletedButton from './DeletedButton.js';

const subCollectionName = "tasks";
const ToggleBar = (props) => {
  const [showAllTasks, setShowAllTasks] = useState(true);
  const displayAllTasks = () => setShowAllTasks(true);
  const hideCompletedTasks = () => setShowAllTasks(false);

  const [currentTaskListId, setCurrentTaskListId] = useState((props.taskLists && props.taskLists.length > 0) ? props.taskLists[0].id : "");
  const [currentTaskListName, setCurrentTaskListName] = useState((props.taskLists && props.taskLists.length > 0) ? props.taskLists[0].name : "");
  const ascOrDesc = props.taskOrder === "task" ? "asc" : "desc";
  console.log(ascOrDesc);
  const q = query(collection(props.db, props.collectionName, currentTaskListId, subCollectionName), orderBy(props.taskOrder, ascOrDesc));

  const [tasks, loading, error] = useCollectionData(q);

  console.log(props.taskOrder);
  function changeTaskList(newTaskList) {
    setCurrentTaskListId(newTaskList.id);
    setCurrentTaskListName(newTaskList.name);
  }


  function handleAdd(taskName) {
    const uniqueId = generateUniqueID();
    setDoc(doc(props.db, props.collectionName,  currentTaskListId, subCollectionName, uniqueId),
      {
        id: uniqueId,
        task: taskName,
        completed: false,
        dateCreated: new Date().getTime(),
        priority: 0,
      });
  }

  function deleteCompletedTasks() {
    tasks.forEach((task) => {
      if(task.completed){
        deleteDoc(doc(props.db, props.collectionName, currentTaskListId, subCollectionName, task.id));
      }
    })
  }

  // function onItemChanged(taskCollection, taskID, field, value) {
  //   updateDoc(doc(props.db, collectionName, currentTaskListId, subCollectionName, taskID), {[field]:value});
  // }

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
      <button className="col-6 CompletedBar" onClick={displayAllTasks}>
        <div className={showAllTasks ? "SelectedTab" : "Tab"}>
          All Tasks
        </div>
      </button>
      <button className="col-6 CompletedBar" onClick={hideCompletedTasks}>
        <div className={showAllTasks ? "Tab" : "SelectedTab"}>
          Outstanding Tasks
        </div>
      </button>
    </div>
    <div className="row">
      <div className="col-6">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {currentTaskListName}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {props.taskLists.map(taskList => <Dropdown.Item key={taskList.id} onClick={() => changeTaskList(taskList)}>{taskList.name}</Dropdown.Item>)}
          <Dropdown.Divider/>
          <Dropdown.Item key="0" onClick={props.toggleTaskListAdder}>Add New Task List</Dropdown.Item> 
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <button className='col-6 CompletedBar' onClick={props.toggleFilter}>
        <div className="Tab">
          Filter
        </div>
      </button>
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
    <DeletedButton deleteCompletedTasks={deleteCompletedTasks}/>
  </div>);
}
export default ToggleBar;