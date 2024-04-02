import React,{useEffect, useState} from 'react';
import './App.css';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";

function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] = useState([])

  const handleAddTodo =  () =>{
     let newTodoItem = {
      title:newTitle,
      description:newDescription,
     }

     let updatedTodoArray = [...allTodos];
     updatedTodoArray.push(newTodoItem);
     setTodos(updatedTodoArray);
     localStorage.setItem("todoList",JSON.stringify(updatedTodoArray))

     setNewTitle("")
     setNewDescription("")
  }

  const handleComplete =(index) => {
    let now = new Date(); 
    let dd = now.getDate()
    let mm = now.getMonth()+1
    let yy =now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = `${dd}-${mm}-${yy} at ${h}-${m}-${s};`;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArray = [...completedTodos];
    updatedCompletedArray.push(filteredItem);
    setCompletedTodos(updatedCompletedArray);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos",JSON.stringify(updatedCompletedArray));
    
  }

  const handleDeleteTodo = (index) =>  {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    
    localStorage.setItem("todoList",JSON.stringify(reducedTodo));
    setTodos(reducedTodo,1);
  }
  const handleDeleteCompletedTodo  = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);
    
    localStorage.setItem("completedTodos",JSON.stringify(reducedTodo));
    setCompletedTodos (reducedTodo);
  }

  useEffect(()=> {
    let savedTodo = JSON.parse(localStorage.getItem("todoList"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
     if (savedTodo) {
       setTodos (savedTodo);
     }

     if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
     }
  },[])

  return (
    <div className="App">
      <h1>Task Management</h1>

      <div className = "todo-wrapper">
        <div className='input-wrapper'>
      <div  className="todo-input">
        <div className= "todo-input-item">
            <div>
              <label>Title</label><br/>
              <input type="text" value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} placeholder="What's the task title?"/>
            </div>
        </div>
       
        <div className= "todo-input-item">
            <div>
              <label>Description</label><br/>
              <input type="text" value={newDescription} onChange={(e)=> setNewDescription(e.target.value)} placeholder="State your description?"/>
            </div>
        </div>
        <div className= "todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
        </div>
        </div>
        </div>
          <div  className="btn-area">
              <button className=  {`secondaryBtn ${isCompleteScreen===false && "active"}`} onClick={() => setIsCompleteScreen(false)}>Tasks</button>
              <button  className=  {`secondaryBtn ${isCompleteScreen === true && "active"}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
          </div>
              {isCompleteScreen === false && allTodos.map((item,index) =>{
                return(
                  <div className="todo-list">
                  <div className='todo-list-item' key = {index}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

               <div>
                 <AiOutlineDelete className='icon'  onClick ={() => handleDeleteTodo(index)} title="Delete?"/>
                 <BsCheck2 className='check-icon' onClick={() =>handleComplete(index) } title='Completed?'/>
               </div>
               
        
          </div>
                )
              })}
              {isCompleteScreen === true && completedTodos.map((item,index) =>{
                return(
                  <div className="todo-list">
                  <div className='todo-list-item' key = {index}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><i>Completed on{item.completedOn}</i></p>
                </div>

               <div>
                 <AiOutlineDelete className='icon'  onClick ={() => handleDeleteCompletedTodo(index)} title="Delete?"/>
                 </div>
               
        
          </div>
                )
              })}
      </div>
    </div>
  );
}

export default App;
