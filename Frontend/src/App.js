import React, { Component } from "react";
import { Navbar } from "./components/Navbar";
import TodoRows from "./components/TodoRows";
import axios from "axios";

// const api = axios.create({
// 	baseURL: `http://localhost:8000/api`
// })

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Sai Kiran",
      todoItems: [],
      newTodo: "",
      newDescription: "",
    };

    // ps: we dont need this binding if we use arrow functions like I used in line 42
    // this.addTodo = this.addTodo.bind(this);
    // this.updateDesc = this.updateDesc.bind(this);
    // this.deleteTodo = this.deleteTodo.bind(this);
    // this.editTodo = this.editTodo.bind(this);
  }

  updateValue = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  updateDesc = (event) => {
    this.setState({ newDescription: event.target.value });
  };

  addTodo = () => {
    const data = {
      title: this.state.newTodo,
      description: this.state.newDescription,
    };

    axios
      .post(`http://localhost:8000/api/todos`, data)
      .then(() => this.getTodos())
      .catch((error) => console.log(error));

    this.setState({
      newTodo: "",
      newDescription: "",
    });
  };

  editTodo = (id) => {
    const updatedTodoItems = this.state.todoItems.map((todo) => {
      if (todo._id === id) {
        return {
          ...todo,
          isEditStarted: true,
        };
      } else {
        return {
          ...todo,
          isEditStarted: false,
        };
      }
    });
    this.setState({
      todoItems: updatedTodoItems,
    });
  };

  saveTodo = (todo) => {
    axios
      .patch(`http://localhost:8000/api/todos/${todo._id}`, todo)
      .then(() => this.getTodos())
      .catch((error) => console.log(error));
  };

  editval = (event, id) => {
    const updatedTodos = this.state.todoItems.map((todo) => {
      if (todo._id === id) {
        todo.title = event.target.value;
        return todo;
      } else {
        return todo;
      }
    });
    this.setState({ todoItems: updatedTodos });
  };

  editdesc = (event, id) => {
    const updatedDesc = this.state.todoItems.map((todo) => {
      if (todo._id === id) {
        todo.description = event.target.value;
        return todo;
      } else {
        return todo;
      }
    });
    this.setState({ todoItems: updatedDesc });
  };

  getTodos = () => {
    axios
      .get(`http://localhost:8000/api/todos`)
      .then((response) => {
        this.setState({ todoItems: response.data });
        console.log(response);
      })
      .catch((error) => console.log(error));


    //You can also use fetch instead of axios
    // fetch("http://localhost:8000/api/todos")
    // .then((res) => res.json())
    // .then((todosData) => {
    // 	const formattedData = todosData.map((eachTodo) => {
    // 		return {
    // 			...eachTodo,
    // 			isEditStarted: false
    // 		}
    // 	})

    //   this.setState({
    // 	todoItems: formattedData,
    //   });
    // });
  };

  deleteTodo = (id) => {
    const Todo = this.state.todoItems.find((todo) => todo._id === id);
    const deleteIndex = Todo._id;

    axios
      .delete(`http://localhost:8000/api/todos/${deleteIndex}`)
      .then(() => this.getTodos())
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getTodos();
  }

  render = () => (
    <div className="container">
      <br />
      <div className="row g-3">
        <Navbar name={this.state.userName} />
        <div className="col-12">
          <form
            action="null"
            className="form-control"
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="title">Enter the todo:</label>
            <input
              className="form-control"
              id="title"
              value={this.state.newTodo}
              onChange={this.updateValue}
            />

            <br />

            <label htmlFor="desc">Enter description:</label>
            <input
              type="text"
              id="desc"
              className="form-control"
              value={this.state.newDescription}
              onChange={this.updateDesc}
            />
          </form>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          onClick={this.addTodo}
        >
          + Add Todo's
        </button>

        <div className="container col-12">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>description</th>
                <th>Edit </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <TodoRows
                items={this.state.todoItems}
                deleteTodo={this.deleteTodo}
                editTodo={this.editTodo}
                editval={this.editval}
                editdesc={this.editdesc}
                saveTodo={this.saveTodo}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
