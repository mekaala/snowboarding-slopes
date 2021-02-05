import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

export default class Slopes extends Component {
    state = {
        showCreateForm: false,
        slopes: [],
        newSlope: {
            name: '',
            location: '',
            description: '',
            difficulty: '',
            image: '',
        }
    }

    getSlopes = () => {
        Axios.get('/api/slopes').then((response) => {
            this.setState({
                slopes: response.data,
            })
        })
      }
    componentDidMount() {
        this.getSlopes();
    }

    toggleCreateForm = () => {
        const newShowCreateForm = !this.state.showCreateForm;
        this.setState({
            showCreateForm: newShowCreateForm,
        });
    };

        changeInput = (event) => {
        const updatedNewSlope = { ...this.state.newSlope };
        updatedNewSlope[event.target.name] = event.target.value;
        this.setState({
            newSlope: updatedNewSlope,
        });
    }
    submitCreateForm = (event) => {
        event.preventDefault();
        Axios.post('/api/slopes', this.state.newSlope).then(() => {
            this.getSlopes();
        })
        this.setState({
            showCreateForm: false,
        });
    }
    render() {
        return (
            <div className="slopes">
                <h2>Slopes</h2>
                <div className="index-container">
                    <div className="index-list">
                    {
                        this.state.slopes.map((slope, i) => {
                            const url = "/slopes/" + slope._id;
                            return (
                                <div  key={ i }>
                                    <Link to={ url }>{ slope.name }</Link>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className="index-form">
                        <div><button onClick={ this.toggleCreateForm }>
                                { this.state.showCreateForm
                                    ? 'Cancel'
                                    : 'Create New Slope'
                                }
                            </button></div>
                            { this.state.showCreateForm
                                ? <form onSubmit={ this.submitCreateForm }>
                                    <label>Name: </label><input type="text" name="name" onChange={ this.changeInput } placeholder="Environment Name"/><br/>
                                    <label>Location: </label><input type="text" name="location" onChange={ this.changeInput } placeholder="Location"/><br/>
                                    <label>Description: </label><textarea type="text" name="description" onChange={ this.changeInput } placeholder="Description"/><br/>
                                    <label>Difficulty: </label><input type="text" name="difficulty" onChange={ this.changeInput } placeholder="Difficulty"/><br/>
                                    <label>Image: </label><input type="text" name="image" onChange={ this.changeInput } placeholder="Environment Image (Optional)"/><br/>
                                    <input className="submit" type="submit" value="Create New Environment"/>
                                </form>
                                : null
                            }
                    </div>
                </div>
            </div>
        )
    }
}
