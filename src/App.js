import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './Header.js';
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

const collectionName = "tasks";


function App(props) {
  const [showTaskEditor, setShowTaskEditor] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});

  const q = query(collection(db, collectionName));
  const [tasks, loading, error] = useCollectionData(q);
  console.log(tasks);

  function handleAdd(taskName) {
    const uniqueId = generateUniqueID();
    setDoc(doc(db, collectionName, uniqueId),
     {id: uniqueId, 
      task:taskName, 
      completed:false
    });
  }

  function onItemChanged(taskID, field, value) {
    updateDoc(doc(db, collectionName, taskID), {[field]:value});
  }

  function toggleTaskEditor(){
    setShowTaskEditor(!showTaskEditor);
  }

  function changeTaskToEdit(taskDescription){
    setTaskToEdit(taskDescription);
  }

  function deleteCompletedTasks() {
    // setTask(tasks.filter(t => !t.completed));
    tasks.forEach((task) => {
      if(task.completed){
        deleteDoc(doc(db, collectionName, task.id));
        console.log('deleted doc');
      }
    })
  }
  
  if (loading) {
    <p>Loading</p>
  }

  if (error) {
    <p>ERROR</p>
  }

  return (<div className="container">
    <Header/>
    <ToggleBar onAddTask={handleAdd} data={tasks} onItemChanged={onItemChanged} changeTaskToEdit={changeTaskToEdit} toggleTaskEditor={toggleTaskEditor}/>  
    <DeletedButton deleteCompletedTasks={deleteCompletedTasks}/>
    {showTaskEditor && <TaskEditor toggleTaskEditor={toggleTaskEditor} taskToEdit={taskToEdit} onItemChanged={onItemChanged}/>}
  </div>);
}

export default App;