import React, { Component } from 'react'
import Axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

export default class SingleSlope extends Component {
    state = {
        hiddenPath: {},
        editHiddenPath: {},
        showEditForm: false,
        redirect: false,
    }

    getHiddenPath = () => {
        const hiddenPathId = this.props.match.params.hiddenPathId;
        Axios.get('http://localhost:3001/api/hiddenPaths/' + hiddenPathId).then(response => {
            this.setState({
                hiddenPath: response.data,
                editHiddenPath: response.data,
            });
        });
      }
    componentDidMount() {
        this.getHiddenPath();
    }

    toggleEditForm = () => {
        const newShowEditForm = !this.state.showEditForm;
        this.setState({
            showEditForm: newShowEditForm,
        });
      };
    
    changeInput = (event) => {
        const updatedHiddenPath = { ...this.state.editHiddenPath };
        updatedHiddenPath[event.target.name] = event.target.value;
        this.setState({
            editHiddenPath: updatedHiddenPath,
        });
    }
    submitUpdateForm = (event) => {
        event.preventDefault();
        const hiddenPathId = this.props.match.params.hiddenPathId;
        Axios.put('http://localhost:3001/api/hiddenPath/' + hiddenPathId, this.state.editHiddenPath).then(() => {
            this.getHiddenPath();
        })
        this.setState({
            showEditForm: false,
        });
    }

    clickDelete = () => {
        const hiddenPathId = this.props.match.params.hiddenPathId;
        Axios.delete('http://localhost:3001/api/hiddenPath/' + hiddenPathId).then(() => {
            this.setState({
                redirect: true,
            })
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/hiddenPaths"/>
        }

        const { name, description, location, difficulty, image } = this.state.hiddenPath;
        return (
            <div className="single-hidden-path">
                <Link to="/slopes">Back to Hidden Path Index</Link>
                <h2>{ name }</h2>
                <h2>{ location }</h2>
                <div className="hidden-path-container">
                    <div className="hidden-path-description">
                        <p>{ description }</p>
                        <p>{ difficulty }</p>
                        <img src={ image } alt={ name }/>
                    </div>
                    <div className="slope-form">
                        <div><button onClick={ this.toggleEditForm }>
                            { this.state.showEditForm
                                ? 'Cancel'
                                : 'Edit Hidden Path'
                            }
                        </button></div>
                        { this.state.showEditForm
                            ? <form onSubmit={ this.submitUpdateForm }>
                                <label>Name: </label><input type="text" name="name" onChange={ this.changeInput } value={ this.state.editHiddenPath.name }/><br/>
                                <label>Location: </label><input type="text" name="location" onChange={ this.changeInput } value={ this.state.editHiddenPath.location }/><br/>
                                <label>Description: </label><textarea type="text" className="description" name="description" onChange={ this.changeInput } value={ this.state.editHiddenPath.description }/><br/>
                                <label>Difficulty: </label><input type="text" name="difficulty" onChange={ this.changeInput } value={ this.state.editHiddenPath.difficulty }/><br/>
                                <label>Image: </label><input type="text" name="image" onChange={ this.changeInput } value={ this.state.editHiddenPath.image }/><br/>
                                <input className="submit" type="submit" value="Update Hidden Path"/>
                            </form>
                            : null
                        }
                        <button onClick={ this.clickDelete }>Delete Hidden Path</button>
                    </div>
                </div>
            </div>
        )
    }
}
