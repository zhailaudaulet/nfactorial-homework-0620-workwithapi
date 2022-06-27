import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { TodoistApi } from '@doist/todoist-api-typescript'

// const BACKEND_URL = "http://192.168.31.180:3000";
// $ curl https://api.todoist.com/sync/v8/completed/get_all \
//     -H "Authorization: Bearer 5af13cc8eb60f65c0ac53c8f4b83a50262003ac3"




const api = new TodoistApi('5af13cc8eb60f65c0ac53c8f4b83a50262003ac3')

// api.getProject(2293687449)
//     .then((project) => console.log(project))
//     .catch((error) => console.log(error))



function App() {
  const [completedItems, setCompletedItems] = useState([])
  const [itemToAdd, setItemToAdd] = useState("");
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showItems, setShowItems] = useState("")
  const [ccounter, setCcounter] = useState(0)
  // const [hook, setHook] = useState([])
  // setHook(items)
  let counter = 1
  // let basecount = 0


  const handleItemDeleteC=(id)=>{
    api.reopenTask(id)
    .then((isSuccess) => {api.deleteTask(id); setCcounter(ccounter+counter)})
    .catch((error) => console.log(error))
    


  }

  const handleChangeItem = (event) => {
    setItemToAdd(event.target.value);
  };

  const toggleShowList = ()=>{
    showItems == true ? (
      setShowItems(false)
    ):(setShowItems(true))
    setCcounter(ccounter+counter)


  }

  const handleAddItem = () => {
    api.addTask({
      content: itemToAdd,
      projectId:2293687449


  })
      .then((task) => setItems([...items, task]))
      .catch((error) => console.log(error))
    setItemToAdd('')
    // axios
    //   .post(`${BACKEND_URL}/todos`, {
    //     label: itemToAdd,
    //   })
    //   .then((response) => {
    //     const newItem = response.data;
    //     ([newItem, ...items]);
    //   });
    // setItemToAdd("");
  };
  // const handleItemImportant = ({id}) =>{

  //   api.getTask(id)
  //     .then((task)=>{
  //       if (task.priority===0) {
  //       api.updateTask(id, { priority: 4 })
  //       .then((task) => console.log(task))
  //       .catch((error) => console.log(error))
  //       setItems((prevItems) =>
  //       prevItems.map((task) => {
  //         if (task.id === id) {
  //           return { ...task, important: !task.important };
  //         } else return task;
  //       })
  //     );
  //     } else{
  //       api.updateTask(id, { priority: 1 })
  //       .then((task) => console.log(task))
  //       .catch((error) => console.log(error))
  //       setItems((prevItems) =>
  //       prevItems.map((task) => {
  //         if (task.id === id) {
  //           return { ...task, important: !task.important };
  //         } else return task;
  //       }))
  //     }
  //   })

  //   // api.updateTask(id, { priority: 4 })
  //   //   .then((task) => console.log(task))
  //   //   .catch((error) => console.log(error))
  //   //   setItems((prevItems) =>
  //   //   prevItems.map((task) => {
  //   //     if (task.id === id) {
  //   //       return { ...task, important: !task.important };
  //   //     } else return task;
  //   //   })
  //   // );
  // }
  
  const toggleItemDone = ({ id, done }) => {
    api.closeTask(id)
      .then((task) => setItems(items.filter((task)=>task.id!==id)))
      // .then((isSuccess) => console.log(isSuccess))
      .catch((error) => console.log(error))


  }
  const toggleItemUnDone = (id)=>{
    api.reopenTask(id)
    setCcounter(ccounter+counter)


    
//use filter!!

    
    // axios
    //   .put(`${BACKEND_URL}/todos/${id}`, {
    //     done: !done,
    //   })
    //   .then((response) => {
    //     const newItem = response.data;
    //     setItems(
    //       items.map((item) => {
    //         if (item.id === newItem.id) {
    //           return newItem;
    //         }
    //         return item;
    //       })
    //     );
    //   });
  };
  const handleItemDelete = (id) => {
    api.deleteTask(id)
    .then((task) => setItems(items.filter((task)=>task.id!==id)))
    .catch((error) => console.log(error))
    // axios.delete(`${BACKEND_URL}/todos/${id}`).then((response) => {
    //   setItems(items.filter((item) => item.id !== response.data?.id));
    // });
  };

  useEffect(() => {
    api.getTasks({projectId:2293687449})
      .then((tasks) => {setItems(tasks)})
      .catch((error) => console.log(error))}, []);
  // api.getTasks({projectId:2293687449})
  // .then((tasks) => {setItems(tasks)})
  // .catch((error) => console.log(error))
  
  useEffect(()=>{
    axios.get('https://api.todoist.com/sync/v8/completed/get_all/', {
      headers: {
        Authorization: 'Bearer 5af13cc8eb60f65c0ac53c8f4b83a50262003ac3'
      }
    }).then((response) => {
      setCompletedItems(response.data.items)
      // setItemsC(response.data.items);
    });
  }, [ccounter])

  return (
    <div className="todo-app">
      {/* App-header */}
      <div className="app-header d-flex">
        <h1>Todo List</h1>
      </div>

      <div className="top-panel d-flex">
        {/* Search-panel */}
        <input
          type="text"
          className="form-control search-input"
          placeholder="type to search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
      <div className="margl">
        {showItems === true?(
          <button className="btn btn2 btn-outline-secondary" onClick={toggleShowList}>
                Show uncompleted items
          </button>
        ):(
          <button className="btn btn2 btn-outline-secondary" onClick={toggleShowList}>
          Show completed items
          </button>
        )}

      </div>

      {/* List-group */}
      <div>
      {showItems==false?(<ul className="list-group todo-list">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className="list-group-item">
              <span className={`todo-list-item${item.done ? " done" : ""}`}>
                <span
                  className="todo-list-item-label"
                  onClick={() => toggleItemDone(item)}
                >
                  {item.content}
                </span>
                

                {/* <button
                  type="button"
                  className="btn btn-outline-success btn-sm float-right"
                  onClick={()=>handleItemImportant(item)}
                >
                  <i className="fa fa-exclamation" />
                </button> */}

                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm float-right"
                  onClick={() => handleItemDelete(item.id)}
                >
                  <i className="fa fa-trash-o" />
                </button>
              </span>
            </li>
          ))
        ) : (
          <div>No todos🤤</div>
        )}

        
      </ul>):(
              <ul className="list-group todo-list">
              {completedItems.length > 0 ? (
                completedItems.map((item) => (
                  <li key={item.id} className="list-group-item">
                    <span className={`todo-list-item done ${item.important?"important":":"}`}>
                      <span
                        className="todo-list-item-label"
                        onClick={() => toggleItemUnDone(item.task_id)}
                      >
                        {item.content}
                      </span>
                      
      
                      {/* <button
                        type="button"
                        className="btn btn-outline-success btn-sm float-right"
                        onClick={()=>handleItemImportant(item)}
                      >
                        <i className="fa fa-exclamation" />
                      </button> */}
      
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm float-right"
                        onClick={() => handleItemDeleteC(item.task_id)}
                      >
                        <i className="fa fa-trash-o" />
                      </button>
                    </span>
                  </li>
                ))
              ) : (
                <div>No completed items</div>
              )}
      
              
            </ul>
      )}
      </div>

      {/* Add form */}
      <div className="item-add-form d-flex" >
        <input
          value={itemToAdd}
          type="text"
          className="form-control"
          placeholder="What needs to be done"
          onChange={handleChangeItem}
        />
        <button className="btn btn-outline-secondary" onClick={handleAddItem}>
          Add item
        </button>
      </div>





    </div>
  );
}

export default App;