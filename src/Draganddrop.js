import React from "react";
import { Button } from "antd";
import "./App.css";
import axios from "axios";
const BASE_URL=`http://localhost:2000/`;
const emojiOptions = [
  { value: "😃", label: "😃 Smiling" },
  { value: "❤️", label: "❤️ Heart" },
  { value: "👍", label: "👍 Thumbs Up" },
  { value: "🚀", label: "🚀 Rocket" },
];



class Draganddrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEmoji: "🙂",
      newTask: "",
      tasks:[],
    };
  }
  componentDidMount(){
    axios.get(`${BASE_URL}task`).then((response)=>{
      console.log(response.status);//to check if te data come or not console
      this.setState({tasks:response.data})

    }).catch((error)=>{
      console.log(error);


    })
  } 
  //delete
  handleDeleteTask = (taskId) => {
    axios.delete(`${BASE_URL}task/${taskId}`).then((response)=>{
      console.log(response);
      console.log(response.status);
      if(response.status==204){
        const updatedTasks = this.state.tasks.filter((task) => task._id !== taskId);
        this.setState({ tasks: updatedTasks });
      }
      // console.log(response.data); juste l teste
     


    }).catch((error)=>{
      console.log(error);


    })

  };
  //add
  handleAddTask = () => {
    const { newTask } = this.state;
    if (newTask.trim() === "") return;

    const newTaskObject = {
      content: newTask,    status: "todo", // Set the status property to "todo"

    };

    
      this.addNewTask(newTaskObject)
    
  };
  addNewTask =(newTask)=>{
    axios.post(`${BASE_URL}task`,newTask).then((response)=>{
      // console.log(response.data); juste l teste
      this.setState(
        (prevState) => ({
          tasks: [...prevState.tasks, response.data],//response.data hedha el task elli tzed jdid
          newTask: "",
        }),
      );


    }).catch((error)=>{
      console.log(error);


    })
  };
  handleEmojiChange = (value) => {
    this.setState({ selectedEmoji: value });
  };


  handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("application/json", taskId);
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  handleDrop = (e, dropZone) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("application/json");
    axios.put(`${BASE_URL}task/${taskId}`,{status: dropZone}).then((response)=>{
     if(response.status==200){
      const updatedTasks = this.state.tasks.filter((task) => task._id !== taskId);
      const droppedTask = this.state.tasks.find((task) => task._id === taskId);
      this.setState(
        {
          tasks: [...updatedTasks,response.data],
        },
      );
     }


    }).catch((error)=>{
      console.log(error);


    })
   
  };
  render() {
    const { selectedEmoji, tasks, newTask } = this.state;
    return (
      <div className="drag-and-drop-container">
        
        <div className="add-task">
          <input
            type="text"
            placeholder="Add new task..."
            value={newTask}
            onChange={(e) => this.setState({ newTask: e.target.value })}
          />
          <button onClick={this.handleAddTask}>Add Task</button>
        </div>

        <div
          className="task-list"
          onDragOver={(e) => this.handleDragOver(e)}
          onDrop={(e) => this.handleDrop(e, "ticket")}
        >
          <h3>tickets</h3>
          {tasks
            .filter((task) => task.status === "ticket")
            .map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => this.handleDragStart(e, task._id)}
                className="task"
              >
                {task.content}
                <Button onClick={() => this.handleDeleteTask(task._id)}>
                  Delete
                </Button>
              </div>
            ))}
        </div>

        <div
          className="task-list"
          onDragOver={(e) => this.handleDragOver(e)}
          onDrop={(e) => this.handleDrop(e, "todo")}
        >
          <h3>To Do</h3>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => this.handleDragStart(e, task._id)}
                className="task"
              >
                {task.content}
              </div>
            ))}
        </div>

        <div
          className="task-list"
          onDragOver={(e) => this.handleDragOver(e)}
          onDrop={(e) => this.handleDrop(e, "progress")}
        >
          <h3>In Progress</h3>
          {tasks
            .filter((task) => task.status === "progress")
            .map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => this.handleDragStart(e, task._id)}
                className="task"
              >
                {task.content}
              </div>
            ))}
        </div>

        <div
          className="task-list"
          onDragOver={(e) => this.handleDragOver(e)}
          onDrop={(e) => this.handleDrop(e, "complete")}
        >
          <h3>Done</h3>
          {tasks
            .filter((task) => task.status === "complete")//mot cleee mm que le base :3 complete
            .map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => this.handleDragStart(e, task._id)}
                className="task"
              >
                {task.content}
              </div>
            ))}
        </div>
    
      </div>
      
    );
  }
}

export default Draganddrop;
