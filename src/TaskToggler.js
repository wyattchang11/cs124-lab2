export default function TaskToggler(props) {
    return <div className="row">
        <button className="col-6 CompletedBar" onClick={props.displayAllTasks}>
            <div className={props.showAllTasks ? "SelectedTab" : "Tab"}>
                All Tasks
            </div>
        </button>
        <button className="col-6 CompletedBar" onClick={props.hideCompletedTasks}>
            <div className={props.showAllTasks ? "Tab" : "SelectedTab"}>
                Outstanding Tasks
            </div>
        </button>
    </div>;
}