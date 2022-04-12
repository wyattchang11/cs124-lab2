import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';




const Task = (props) => {
    return (<div>
        <div className={"row top-buffer"}>
          <div className={"col-12"}>
              <button className={props.className} id="task">
                <div className="row">
                  <div className="col-8" onClick={() => {
                    console.log(props.taskCollectionId, props.task.id);
                    props.onItemChanged(props.taskCollectionId, props.task.id, "completed", !props.task.completed);
                }}>
                    {props.task.task}
                  </div>

                  <button className='col-2 justify-content-center' onClick={() => {
                  // console.log(props.taskCollectionId, props.task.id);
                  props.changeTaskToEdit(props.taskCollectionId, props.task);
                  props.togglePriorityBar();
                  }}>

                    <FontAwesomeIcon icon={faClock} name="priorityButton" size="sm" />
                  </button>

                  <button className="col-2 justify-content-center" onClick={() => {
                    props.changeTaskToEdit(props.taskCollectionId, props.task);
                    props.toggleTaskEditor();
                  }}>
                    <FontAwesomeIcon icon={faEdit} name="editButton" size="sm"/>
                  </button>
                </div>
                  
              </button>
          </div>
        </div>
        
      </div>)
}
export default Task;
