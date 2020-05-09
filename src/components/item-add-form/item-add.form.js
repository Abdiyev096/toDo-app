import React, {Component} from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label: ''
    }

    formChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    addElement = (e) => {
        e.preventDefault();
        this.props.onItemAdd(this.state.label);
        this.setState({
            label: ''
        })
    }

    

    render() {

        return (
        <form className="item-add-form"
                onSubmit={this.addElement} >
            <input type="text" className="form-control" placeholder="type here"
                    onChange={this.formChange}
                    value={this.state.label} />
            <button type="submit">Add item</button>
        </form>
        )
    }
}