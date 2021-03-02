import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

export default class HiddenPaths extends Component {
    state = {
        showCreateForm: false,
        hiddenPaths: [],
        newHiddenPath: {
            name: '',
            location: '',
            description: '',
            difficulty: '',
            image: '',
        }
    }

    getHiddenPaths = () => {
        Axios.get('http://localhost:3001/api/hiddenPaths').then((response) => {
            this.setState({
                hiddenPaths: response.data,
            })
        })
      }
    componentDidMount() {
        this.getHiddenPaths();
    }

    toggleCreateForm = () => {
        const newShowCreateForm = !this.state.showCreateForm;
        this.setState({
            showCreateForm: newShowCreateForm,
        });
    };

        changeInput = (event) => {
        const updatedNewHiddenPath = { ...this.state.newHiddenPath };
        updatedNewHiddenPath[event.target.name] = event.target.value;
        this.setState({
            newHiddenPath: updatedNewHiddenPath,
        });
    }
    submitCreateForm = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:3001/api/hiddenPaths', this.state.newHiddenPath).then(() => {
            this.getHiddenPaths();
        })
        this.setState({
            showCreateForm: false,
        });
    }
    render() {
        return (
            <div className="hidden-paths">
                <h2>Hidden Paths</h2>
                <div className="index-container">
                    <div className="index-list">
                    {
                        this.state.hiddenPaths.map((hiddenPath, i) => {
                            const url = "/hiddenPaths/" + hiddenPath._id;
                            return (
                                <div  key={ i }>
                                    <Link to={ url }>{ hiddenPath.name }</Link>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className="index-form">
                        <div><button onClick={ this.toggleCreateForm }>
                                { this.state.showCreateForm
                                    ? 'Cancel'
                                    : 'Add New Hidden Path'
                                }
                            </button></div>
                            { this.state.showCreateForm
                                ? <form onSubmit={ this.submitCreateForm }>
                                    <label>Name: </label><input type="text" name="name" onChange={ this.changeInput } placeholder="Hidden Path Name"/><br/>
                                    <label>Location: </label><input type="text" name="location" onChange={ this.changeInput } placeholder="Location"/><br/>
                                    <label>Description: </label><textarea type="text" name="description" onChange={ this.changeInput } placeholder="Description"/><br/>
                                    <label>Difficulty: </label><input type="text" name="difficulty" onChange={ this.changeInput } placeholder="Difficulty"/><br/>
                                    <label>Image: </label><input type="text" name="image" onChange={ this.changeInput } placeholder="Environment Image (Optional)"/><br/>
                                    <input className="submit" type="submit" value="Create New Hidden Path"/>
                                </form>
                                : null
                            }
                    </div>
                </div>
            </div>
        )
    }
}
