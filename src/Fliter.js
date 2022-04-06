


const Filter = (props) => {
    return <div className={"container backdrop"}>
        <div className={"taskModal"}>
        <div className="justify-content-center">
          Filter Tasks By
        </div> 
        <div className={"row align-items-center"}> 

                  <button className={"col-4 priority-button"} type={"button"} 
                          onClick={() => {
                            props.sortByName();
                            props.toggleFilter();
                            }}>
                    Name
                  </button>

                  <button className={"col-4 priority-button"} type={"button"} 
                          onClick={() => {
                            
                            props.toggleFilter();
                  }}>
                    Priority
                  </button>

                  <button className={"col-4 priority-button"} type={"button"} 
                          onClick={() => {
                            props.sortByDate();
                            props.toggleFilter();
                  }}>
                    Creation Date
                  </button>

                  </div>
        </div>
        </div>


}

export default Filter;