import { useState } from "react";
const TaskListInfo = (props) => {
    const [inputValue, setInputValue] = useState(props.taskList);
    console.log(props.taskList);
    return <div className={"container backdrop"}>
        <div className={"taskModal"}>
            <div className="justify-content-center">
                <h3>Edit Task List</h3>
            </div>
            <div className={"row"}>
                <input value={inputValue} onChange={setInputValue} className={"taskEditor"} />
            </div>
            <div className={"row align-items-center"}>
                <button className={"col-6 alert-button alert-cancel"} type={"button"} onClick={props.toggleShowTaskListInfo}>
                    Cancel
                </button>
                <button className={"col-6 alert-button alert-ok"} type={"button"}
                    onClick={() => {
                        props.toggleShowShare();
                        props.shareTaskList(props.taskListName, inputValue);
                    }}>
                    Save
                </button>
            </div>
            <br/>
            <div className={"row"}>
                <button className="col-12 alert-button alert-ok" type="button">
                    Delete Task List
                </button>

            </div>
        </div>
    </div>;
}

export default TaskListInfo;