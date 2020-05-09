import React, {Component} from 'react';

import './app.css';

import TodoHeader from '../todo-header/todo-header';
import ItemStatusFilter from '../todo-item-filter/todo-item-filter';
import TodoSearch from '../todo-search/todo-search';
import TodoList from '../todo-list/todo-list';
import ItemAddForm from '../item-add-form/item-add.form';

export default class App extends Component {

  generateID = 100;

  state = {
    toDoData: [
      this.createToDoItem('Drink Coffee'),
      this.createToDoItem('Learn React'),
      this.createToDoItem('Make projects')
    ],
    term: '',
    filter: 'all'
  };

  createToDoItem(label) {
    return {
      label,
      done: false,
      important: false,
      id: this.generateID++
    }
  }

  toggleProperty(arr, id, prop) {
    const idx = arr.findIndex((el) => el.id === id);
    const obj = arr[idx];
    obj[prop] = !obj[prop]
    return [...arr.slice(0, idx), obj, ...arr.slice(idx + 1)]
  }

  onClickImportant = (id) => {
    this.setState(({toDoData}) => {
      return {
        toDoData: this.toggleProperty(toDoData, id, 'important')
      }
    })
  }

  onClickDone = (id) => {
    this.setState(({toDoData}) => {
      return {
        toDoData: this.toggleProperty(toDoData, id, 'done')
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({toDoData}) => {
      const deleteIndex = toDoData.findIndex((el) => el.id === id);
      const newArr = [...toDoData.slice(0, deleteIndex), ...toDoData.slice(deleteIndex + 1)];

      return {
        toDoData: newArr
      }
    })
  }

  addItem = (text) => {
    if(text !== '') {
      const newItem = this.createToDoItem(text);

    this.setState(({toDoData}) => {
      return {
        toDoData: [...toDoData, newItem]
      }
    })
    }
  }

  searchItems(arr, term) {
    if(term.length > 0) {
      return arr.filter((el) => el.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
    } else {
      return arr;
    }
  }

  changeTerm = (value) => {
    this.setState({
      term: value
    })
  }

  filter(arr, filter) {
    // eslint-disable-next-line default-case
    switch(filter) {
      case 'all':
        return arr;
      case 'active':
        return arr.filter((el) => !el.done);
      case 'done':
        return arr.filter((el) => el.done);
      default:
        return arr;
    }
  }

  changeFilterButton = (filterName) => {
    this.setState({
      filter: filterName
    })
  }

  render() {

    const {toDoData, term, filter} = this.state;

    const visibleItems = this.filter(this.searchItems(toDoData, term), filter);

    const doneCount = toDoData.filter((elem) => elem.done).length;
    const toDoCount = toDoData.length - doneCount;

    return (
      <div className="todo-app">
		    <TodoHeader toDo={toDoCount} done={doneCount} />
		    <div className="top-panel d-flex">
			    <TodoSearch onChangeTerm={this.changeTerm} />
			    <ItemStatusFilter filter={this.state.filter} onChangeFilter={this.changeFilterButton} />  
		    </div>
        <TodoList todos={visibleItems} onDeleted={this.deleteItem} onClickImportant={this.onClickImportant}
                  onClickDone={this.onClickDone} />
        <ItemAddForm onItemAdd={this.addItem} />
    </div>
  )
  }
}
