import React, { Component } from 'react'
import Axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

export default class SingleSlope extends Component {
    state = {
        slope: {},
        editSlope: {},
        showEditForm: false,
        redirect: false,
    }

    getSlope = () => {
        const slopeId = this.props.match.params.slopeId;
        Axios.get('http://localhost:3001/api/slopes/' + slopeId).then(response => {
            this.setState({
                slope: response.data,
                editSlope: response.data,
            });
        });
      }
    componentDidMount() {
        this.getSlope();
    }

    toggleEditForm = () => {
        const newShowEditForm = !this.state.showEditForm;
        this.setState({
            showEditForm: newShowEditForm,
        });
      };
    
    changeInput = (event) => {
        const updatedSlope = { ...this.state.editSlope };
        updatedSlope[event.target.name] = event.target.value;
        this.setState({
            editSlope: updatedSlope,
        });
    }
    submitUpdateForm = (event) => {
        event.preventDefault();
        const slopeId = this.props.match.params.slopeId;
        Axios.put('http://localhost:3001/api/slopes/' + slopeId, this.state.editSlope).then(() => {
            this.getSlope();
        })
        this.setState({
            showEditForm: false,
        });
    }

    clickDelete = () => {
        const slopeId = this.props.match.params.slopeId;
        Axios.delete('http://localhost:3001/api/slopes/' + slopeId).then(() => {
            this.setState({
                redirect: true,
            })
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/slopes"/>
        }

        const { name, description, location, difficulty, image } = this.state.slope;
        return (
            <div className="single-slope">
                <Link to="/slopes">Back to Slope Index</Link>
                <h2>{ name }</h2>
                <h2>{ location }</h2>
                <div className="slope-container">
                    <div className="slope-description">
                        <p>{ description }</p>
                        <p>{ difficulty }</p>
                        <img src={ image } alt={ name }/>
                    </div>
                    <div className="slope-form">
                        <div><button onClick={ this.toggleEditForm }>
                            { this.state.showEditForm
                                ? 'Cancel'
                                : 'Edit Slope'
                            }
                        </button></div>
                        { this.state.showEditForm
                            ? <form onSubmit={ this.submitUpdateForm }>
                                <label>Name: </label><input type="text" name="name" onChange={ this.changeInput } value={ this.state.editSlope.name }/><br/>
                                <label>Location: </label><input type="text" name="location" onChange={ this.changeInput } value={ this.state.editSlope.location }/><br/>
                                <label>Description: </label><textarea type="text" className="description" name="description" onChange={ this.changeInput } value={ this.state.editSlope.description }/><br/>
                                <label>Difficulty: </label><input type="text" name="difficulty" onChange={ this.changeInput } value={ this.state.editSlope.difficulty }/><br/>
                                <label>Image: </label><input type="text" name="image" onChange={ this.changeInput } value={ this.state.editSlope.image }/><br/>
                                <input className="submit" type="submit" value="Update Slope"/>
                            </form>
                            : null
                        }
                        <button onClick={ this.clickDelete }>Delete Slope</button>
                    </div>
                </div>
            </div>
        )
    }
}
