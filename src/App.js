import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './Header.js';
import PriorityBar from './PriorityBar.js'
import TaskEditor from './TaskEditor.js';
import ToggleBar from './ToggleBar.js';
import DeletedButton from './DeletedButton.js';
import {  useState } from 'react';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

import '../src/style.css';

import {useCollectionData} from "react-firebase-hooks/firestore";
import {initializeApp} from "firebase/app";
import {collection, deleteDoc, doc, getFirestore, updateDoc, query, setDoc/* , serverTimestamp */} from "firebase/firestore";

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
  const taskListQ = query(collection(db, collectionName));
  const [taskLists, loading, error] = useCollectionData(taskListQ);
  const [currentTaskList, setCurrentTaskList] = useState((taskLists && taskLists.length > 0) ? taskLists[0].id : "");
  // const [tasks, setTasks] = useState(currentTaskList !== "" ? : {})
  console.log(taskLists);
  console.log(error);


  function toggleTaskList(newTaskList){
    setCurrentTaskList(newTaskList);
  }
  function handleAdd(taskName) {
    const uniqueId = generateUniqueID();
    setDoc(doc(db, collectionName, uniqueId),
     {id: uniqueId, 
      task:taskName, 
      completed: false,
      dateCreated: new Date().getTime(),
      priority: "low",
    });
  }

  function onItemChanged(taskCollection, taskID, field, value) {
    updateDoc(doc(db, collectionName, taskCollection, "tasks", taskID), {[field]:value});
  }

  function toggleTaskEditor(){
    setShowTaskEditor(!showTaskEditor);
  }

  function togglePriorityBar(){
    setShowPriorityBar(!showPriorityBar);
  }

  function changeTaskToEdit(taskDescription){
    setTaskToEdit(taskDescription);
  }

  function deleteCompletedTasks() {
    // tasks.forEach((task) => {
    //   if(task.completed){
    //     deleteDoc(doc(db, collectionName, task.id));
    //   }
    // })
  }
  
  if (loading) {
    <p>Loading</p>
  }

  if (error) {
    <p>ERROR</p>
  }

  return (<div className="container">
    <Header/>
    <ToggleBar onAddTask={handleAdd} 
                onItemChanged={onItemChanged} 
                changeTaskToEdit={changeTaskToEdit} 
                toggleTaskEditor={toggleTaskEditor} 
                togglePriorityBar={togglePriorityBar} 
                db={db} 
                collectionName={collectionName} 
                taskLists={taskLists}/>  
    <DeletedButton deleteCompletedTasks={deleteCompletedTasks}/>
    {showTaskEditor && <TaskEditor toggleTaskEditor={toggleTaskEditor} 
                                    taskToEdit={taskToEdit} 
                                    onItemChanged={onItemChanged}/>}
    {showPriorityBar && <PriorityBar togglePriorityBar={togglePriorityBar} 
                                      taskToEdit={taskToEdit} 
                                      onItemChanged={onItemChanged}/>}
  </div>);
}

export default App;