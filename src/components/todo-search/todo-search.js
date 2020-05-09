import React, {Component} from 'react';

import './todo-search.css';

export default class TodoSearch extends Component {

  state = {
    term: ''
  }

  changeTerm = (e) => {
    this.setState({
      term: e.target.value
    })
    this.props.onChangeTerm(e.target.value);
  }

  render() {
    
    return (
    <input type="text"
              className="form-control search-input"
              placeholder="type to search"
              onChange={this.changeTerm}
              value={this.state.term} />
    );
  }
}
