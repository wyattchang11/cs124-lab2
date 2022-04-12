import Task from './Task.js';


const TaskList = (props) => {
    const data = props.showAllTasks ? props.data : props.data.filter(entry => !entry.completed);
    if(!data){
      return <p>NO DATA</p>;
    }
    return (data.map(entry =>  <Task 
      onAddTask={props.onAddTask} 
      key={entry.id} 
      task={entry} 
      onItemChanged={props.onItemChanged}  
      taskCollectionId={props.taskCollectionId}
      toggleTaskEditor={props.toggleTaskEditor}
      changeTaskToEdit={props.changeTaskToEdit}
      togglePriorityBar={props.togglePriorityBar}
      className={entry.completed ? "CompletedTask " : "Task " + (entry.priority === 2 ? "high" : (entry.priority === 0 ? "low": "medium"))}/>))
}
export default TaskList;