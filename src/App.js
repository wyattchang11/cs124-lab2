import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './Header.js';
import PriorityBar from './PriorityBar.js'
import TaskEditor from './TaskEditor.js';
import ToggleBar from './ToggleBar.js';
import Share from './Share.js';
import TaskListAdder from './TaskListAdder';
import { useState } from 'react';
import Filter from './Filter.js';
import SignIn from './SignIn';
import SignUp from './SignUp';
import InputField from './InputField';

import '../src/style.css';

import { useCollectionData } from "react-firebase-hooks/firestore";
import { initializeApp } from "firebase/app";
import {
  collection, doc, getFirestore, updateDoc, arrayUnion, query, setDoc, where,/* , serverTimestamp */
  deleteDoc
} from "firebase/firestore";
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';


import {
  getAuth,
  sendEmailVerification,
  signOut
} from "firebase/auth";

import {
  useAuthState
} from 'react-firebase-hooks/auth';
import TaskListInfo from './TaskListInfo';

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
const auth = getAuth();


function App(props) {
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  function verifyEmail() {
    sendEmailVerification(user);
  }

  if (loadingAuth) {
    return <p>Checking...</p>;
  } else if (user) {
    return <div>
      <div className='row'>
        <div className='col-12'>
          {user.email}
        </div>
      </div>
      <div className='row'>
        <button className='signOutButton col-12' onClick={() => signOut(auth)}>
          <b>Sign Out</b>
        </button>

      </div>

      <SignedInApp displayName={user.displayName} {...props} user={user} />
      {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
    </div>
  } else {
    return <>
      {errorAuth && <p>Error App: {errorAuth.message}</p>}
      <SignIn auth={auth} key="Sign In" />
      <SignUp auth={auth} key="Sign Up" />
    </>
  }
}







function SignedInApp(props) {
  const [showTaskEditor, setShowTaskEditor] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [showPriorityBar, setShowPriorityBar] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showTaskListAdder, setShowTaskListAdder] = useState(false);
  const taskListQ = query(collection(db, collectionName), where("owner", "==", props.user.uid));
  const [taskLists, loading, error] = useCollectionData(taskListQ);
  const [taskListToEdit, setTaskListToEdit] = useState("");
  const [currentTaskList, setCurrentTaskList] = useState(null);
  const [taskOrder, setTaskOrder] = useState("task");
  const [showShare, setShowShare] = useState(false);
  const [showTaskListInfo, setShowTaskListInfo] = useState(false);

  function onItemChanged(taskCollection, taskID, field, value) {
    console.log("Calling On Item Changed", taskCollection, taskID, field, value);
    updateDoc(doc(db, collectionName, taskCollection, "tasks", taskID), { [field]: value });
  }

  function editTaskListName(taskListId, taskListName) {
    updateDoc(doc(db, collectionName, taskListId), {
      ...currentTaskList,
      name: taskListName
    });
    setCurrentTaskList({ ...currentTaskList, name: taskListName });
  }

  function deleteTaskList(taskListId) {
    deleteDoc(doc(db, collectionName, taskListId));
    setCurrentTaskList(null);
  }

  function shareTaskList(taskListId, userEmail) {
    console.log("Sharing Task List to ", taskListId, userEmail);
    updateDoc(doc(db, collectionName, taskListId), {
      ...currentTaskList,
      hasAccess: arrayUnion(userEmail)
    });
  }

  function toggleShowShare() {
    setShowShare(!showShare);
  }

  function toggleShowTaskListInfo() {
    setShowTaskListInfo(!showTaskListInfo);
  }

  function toggleTaskEditor() {
    setShowTaskEditor(!showTaskEditor);
  }

  function togglePriorityBar() {
    setShowPriorityBar(!showPriorityBar);
  }

  function toggleFilter() {
    setShowFilter(!showFilter);
  }

  function toggleTaskListAdder() {
    setShowTaskListAdder(!showTaskListAdder);
  }

  function addTaskList(taskListName) {
    const uniqueId = generateUniqueID();
    const task = {
      id: uniqueId,
      name: taskListName,
      hasAccess: [props.user.email],
      owner: props.user.uid
    };
    setDoc(doc(db, collectionName, uniqueId), task);
    setCurrentTaskList(task);

  }

  function changeTaskToEdit(taskList, taskDescription) {
    setTaskToEdit(taskDescription);
    setTaskListToEdit(taskList);
  }

  function changeCurrentTaskList(newTaskList) {
    setCurrentTaskList({
      ...newTaskList
    });
  }

  function changeTaskOrder(newTaskOrder) {
    setTaskOrder(newTaskOrder);
  }

  if (loading) {
    return (<div className="container">
      <Header />
      <p>Loading</p>;
    </div>);
  }

  if (error) {
    return (<div className="container">
      <Header />
      <p>{error.message}</p>;
    </div>);
  }

  if (currentTaskList === null) {
    console.log(taskLists);
    setCurrentTaskList(taskLists.length > 0 ? taskLists[0] : {});
  }

  return (<div className="container">
    <Header userName={props.displayName}
      toggleShowShare={toggleShowShare}
      toggleShowTaskListInfo={toggleShowTaskListInfo} />
    
    {taskLists.length > 0 ? (<ToggleBar onItemChanged={onItemChanged}
      changeTaskToEdit={changeTaskToEdit}
      togglePriorityBar={togglePriorityBar}
      toggleTaskEditor={toggleTaskEditor}
      db={db}
      collectionName={collectionName}
      taskLists={taskLists}
      currentTaskList={currentTaskList}
      changeCurrentTaskList={changeCurrentTaskList}
      taskOrder={taskOrder}
      toggleFilter={toggleFilter}
      toggleTaskListAdder={toggleTaskListAdder} />) : <InputField placeholder={"Enter New Task List"} onSubmit={addTaskList} />}

    {showTaskEditor && <TaskEditor toggleTaskEditor={toggleTaskEditor}
      taskToEdit={taskToEdit}
      taskListToEdit={taskListToEdit}
      onItemChanged={onItemChanged} />}
    {showPriorityBar && <PriorityBar togglePriorityBar={togglePriorityBar}
      taskToEdit={taskToEdit}
      taskListToEdit={taskListToEdit}
      onItemChanged={onItemChanged} />}
    {showFilter && <Filter toggleFilter={toggleFilter}
      changeTaskOrder={changeTaskOrder} />}
    {showTaskListAdder && <TaskListAdder addTaskList={addTaskList}
      toggleTaskListAdder={toggleTaskListAdder} />}

    {showShare && <Share taskListId={currentTaskList.id}
      shareTaskList={shareTaskList}
      toggleShowShare={toggleShowShare} />}

    {showTaskListInfo && <TaskListInfo taskList={currentTaskList}
      toggleShowTaskListInfo={toggleShowTaskListInfo}
      deleteTaskList={deleteTaskList}
      editTaskListName={editTaskListName} />}

  </div>);
}

export default App;