import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';




const Task = (props) => {
  return (<div>
    <div className={"row top-buffer"}>
      <div className={"col-12"}>
        <div className={props.className} id="task" aria-label={props.task.task + ", " + (props.task.priority === 0 ? "low" : (props.task.priority === 1 ? "medium" : "high")) + "priority click to complete"}>
          <div className="row">
            <button className="col-8 TaskFocusButton" onClick={() => {
              console.log(props.taskCollectionId, props.task.id);
              props.onItemChanged(props.taskCollectionId, props.task.id, "completed", !props.task.completed);
            }}>
              {props.task.task}
            </button>

            <button className='col-2 justify-content-center' 
            aria-label={"set priority"}
            onClick={() => {
              // console.log(props.taskCollectionId, props.task.id);
              props.changeTaskToEdit(props.taskCollectionId, props.task);
              props.togglePriorityBar();
            }}>

              <FontAwesomeIcon icon={faClock} name="priorityButton" size="sm" />
            </button>

            <button className="col-2 justify-content-center" onClick={() => {
              props.changeTaskToEdit(props.taskCollectionId, props.task);
              props.toggleTaskEditor();
            }}
            aria-label={"edit task"}>
              <FontAwesomeIcon icon={faEdit} name="editButton" size="sm" />
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>)
}
export default Task;