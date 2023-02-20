import React, { Component } from "react";

export default class TodoRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    this.setState({ todos: this.props.items });
  }

  componentWillReceiveProps(props) {
    this.setState({ todos: props.items });
  }

  render() {
    return (
      <>
        {this.props.items.map((todo) => (
          <tr>
            <td>
              {todo.isEditStarted === true ? (
                <input
                  onChange={(event) => this.props.editval(event, todo._id)}
                  value={todo.title}
                />
              ) : (
                todo.title
              )}
            </td>
            <td>
              {todo.isEditStarted === true ? (
                <input
                  onChange={(event) => this.props.editdesc(event, todo._id)}
                  value={todo.description}
                />
              ) : (
                todo.description
              )}
            </td>
            <td>
              {todo.isEditStarted === true ? (
                <button
                  className="btn btn-primary"
                  onClick={() => this.props.saveTodo(todo)}
                >
                  save
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => this.props.editTodo(todo._id)}
                >
                  edit
                </button>
              )}
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => this.props.deleteTodo(todo._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  }
}
