import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './Header.js';
import PriorityBar from './PriorityBar.js'
import TaskEditor from './TaskEditor.js';
import ToggleBar from './ToggleBar.js';
import TaskListAdder from './TaskListAdder';
import {  useState } from 'react';
import Filter from './Filter.js';


import '../src/style.css';

import {useCollectionData} from "react-firebase-hooks/firestore";
import {initializeApp} from "firebase/app";
import {collection, doc, getFirestore, updateDoc, query, setDoc/* , serverTimestamp */} from "firebase/firestore";
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

const firebaseConfig = {
  apiKey: "AIzaSyA56ajdAplN-Zf_wKrvBuhuxHvkXURp5lA",
  authDomain: "cs124-lab3-4dca6.firebaseapp.com",
  projectId: "cs124-lab3-4dca6",
  storageBucket: "cs124-lab3-4dca6.appspot.com",
  messagingSenderId: "677141143922",
  appId: "1:677141143922:web:76e99db1d556bdc19f7deb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collectionName = "taskLists";


function App(props) {
  const [showTaskEditor, setShowTaskEditor] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [showPriorityBar, setShowPriorityBar] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showTaskListAdder, setShowTaskListAdder] = useState(false);
  const taskListQ = query(collection(db, collectionName));
  const [taskLists, loading, error] = useCollectionData(taskListQ);
  const [taskListToEdit, setTaskListToEdit] = useState("");
  const [taskOrder, setTaskOrder] = useState("task");
  console.log(taskLists);
  console.log(error);


  function onItemChanged(taskCollection, taskID, field, value) {
    console.log("Calling On Item Changed", taskCollection, taskID, field, value);
    updateDoc(doc(db, collectionName, taskCollection, "tasks", taskID), {[field]:value});
  }

  function toggleTaskEditor(){
    setShowTaskEditor(!showTaskEditor);
  }

  function togglePriorityBar(){
    setShowPriorityBar(!showPriorityBar);
  }

  function toggleFilter() {
    setShowFilter(!showFilter);
  }

  function toggleTaskListAdder(){
    setShowTaskListAdder(!showTaskListAdder);
  }

  function addTaskList(taskListName){
    const uniqueId = generateUniqueID();
    setDoc(doc(db, collectionName, uniqueId), 
      {
        id: uniqueId,
        name: taskListName
      });

  }

  function changeTaskToEdit(taskList, taskDescription){
    setTaskToEdit(taskDescription);
    setTaskListToEdit(taskList);
  }

  function changeTaskOrder(newTaskOrder){
    setTaskOrder(newTaskOrder);
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

  return (<div className="container">
    <Header/>
    <ToggleBar  onItemChanged={onItemChanged} 
                changeTaskToEdit={changeTaskToEdit} 
                togglePriorityBar={togglePriorityBar} 
                toggleTaskEditor={toggleTaskEditor}
                db={db} 
                collectionName={collectionName} 
                taskLists={taskLists}
                taskOrder={taskOrder}
                toggleFilter={toggleFilter}
                toggleTaskListAdder={toggleTaskListAdder}/>  

    {showTaskEditor && <TaskEditor toggleTaskEditor={toggleTaskEditor} 
                                    taskToEdit={taskToEdit} 
                                    taskListToEdit={taskListToEdit}
                                    onItemChanged={onItemChanged}/>}
    {showPriorityBar && <PriorityBar togglePriorityBar={togglePriorityBar} 
                                      taskToEdit={taskToEdit} 
                                      taskListToEdit={taskListToEdit}
                                      onItemChanged={onItemChanged}/>}
    {showFilter && <Filter toggleFilter={toggleFilter} 
                           changeTaskOrder={changeTaskOrder}
                                  />}
    {showTaskListAdder && <TaskListAdder addTaskList={addTaskList} 
                                         toggleTaskListAdder={toggleTaskListAdder}/>}
                              
  </div>);
}

export default App;