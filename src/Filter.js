


const Filter = (props) => {


    return <div className={"container backdrop"}>
        <div className={"taskModal"}>
        <div className="justify-content-center">
          Sort Tasks By
        </div> 
        <div className={"row align-items-center"}> 

                  <button className={"col-4 priority-button"} type={"button"} 
                          onClick={() => {
                            props.changeTaskOrder("task");
                            props.toggleFilter();
                            }}>
                    Name
                  </button>

                  <button className={"col-4 priority-button"} type={"button"} 
                          onClick={() => {
                            props.changeTaskOrder("priority");
                            props.toggleFilter();
                  }}>
                    Priority
                  </button>

                  <button className={"col-4 priority-button"} type={"button"} 
                          onClick={() => {
                            props.changeTaskOrder("dateCreated");
                            props.toggleFilter();
                  }}>
                    Date
                  </button>

                  </div>
        </div>
        </div>


}

export default Filter;