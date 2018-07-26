import React, { Component } from 'react';
import './App.css';
import logo from './todoimage.jpg';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [
        { id: Date.now(), text: 'First text', checked: false }
      ],
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  };

  handleChange(e) {
    this.setState({text:e.target.value});
  };
  handleSubmit(e){
    e.preventDefault();
    if(!this.state.text.length)
    {
      return;
    }
  const newTodo = {
    text: this.state.text,
    id :Date.now(),
    checked: false,
    };
     
    this.setState(prevState => ({
      todos: prevState.todos.concat(newTodo),
      text: ''
    }));
  };

    handleLabelClick(id) {
      return (e) => {
        e.preventDefault();
        console.log('todo clicked:', id)
        this.setState(prevState => ({ todos: prevState.todos.map(todo => {
          if (todo.id === id) {
            todo.checked = !todo.checked;
          }
          return todo
        }) }));
      }
    };

    handleDeleteClick(id){
      return(e) => {
        e.preventDefault();
        this.setState({
          todos: this.state.todos.filter(todo => todo.id !== id)
        })
      }
    };


  render() {
    return (
      <div className="App  Outerdiv">
      <div className="Innerdiv">
        <form onSubmit={this.handleSubmit}>
                <h1> Write down your todos </h1>
                <img src={logo} className="App-logo" alt="logo" />
                <hr color="dodgerblue" />
                <p>Write your tasks here.To add a task click the ADD TASK button, To mark any as done simply click on the task itself and to delete any click the delete 
                  button </p>
                 <label htmlFor="todoTask"> Add your to do tasks here </label>
                <p> <input type="text" onChange={this.handleChange} value={this.state.text}/></p>
                 <p>
                 <button htmlFor="todobutton" value="">Add Tasks </button>
                 </p>
            </form>
            <br />
                <TodoAppList handleClick={this.handleLabelClick} todos={this.state.todos} buttonClick={this.handleDeleteClick} />
      </div>
      <br />
      <br/>
      </div>
    );
  }
};

class TodoAppList extends React.Component{
  render() {
    return (
      <div className="App">
        <ul>
          {this.props.todos.map(todo => (
            <li className={todo.checked ? 'listyle': '' } onClick={this.props.handleClick(todo.id)} key={todo.id}>{todo.text} &nbsp; &nbsp;&nbsp;<button onClick={this.props.buttonClick(todo.id)}>Delete</button> </li>
          ))}
          </ul>
        </div>
    );
  }
};

export default App;
