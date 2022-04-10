


const Filter = (props) => {

  function sortByDate(tasks) {
    tasks = [...tasks].sort((a, b) => (a.creationTime < b.creationTime)? 1:-1)
  }

  function sortByName(tasks) {
    tasks = [...tasks].sort((a,b) => (a.task > b.task)? 1:-1)
  }

    return <div className={"container backdrop"}>
        <div className={"taskModal"}>
        <div className="justify-content-center">
          Filter Tasks By
        </div> 
        <div className={"row align-items-center"}> 

                  <button className={"col-4 priority-button"} type={"button"} 
                          onClick={() => {
                            sortByName(props.tasks);
                            props.toggleFilter();
                            }}>
                    Name
                  </button>

                  <button className={"col-4 priority-button"} type={"button"} 
                          onClick={() => {
                            // props.sortByPriority();
                            props.toggleFilter();
                  }}>
                    Priority
                  </button>

                  <button className={"col-4 priority-button"} type={"button"} 
                          onClick={() => {
                            sortByDate(props.tasks);
                            props.toggleFilter();
                  }}>
                    Date
                  </button>

                  </div>
        </div>
        </div>


}

export default Filter;