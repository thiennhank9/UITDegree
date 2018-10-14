import React, { Component } from 'react';
import { refreshFormSubmit } from '../utils/refreshForm';

const notification = {
    success: 'Success to change infomation',
    fail: 'Faile to change infomation',
}

const originalStateObject = {
    password: ''
}

class FormSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.location.state.userdata,
            password: this.props.location.state.password,
            headerTitle: 'Change infomation',
            isNotification: false,
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeManage = this.handleChangeManage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeAge(event) {
        this.setState({ age: event.target.value });
    }

    handleChangeDescription(event) {
        this.setState({ description: event.target.value });
    }

    handleChangeManage(event) {
        this.setState({ is_manage: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const token = this.props.location.state.token;
        const user = {
            ...this.state,
        }
        let responseUserData = await fetch(`http://127.0.0.1:8000/users/${user.username}/`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                },
                body: JSON.stringify(user),
            }
        );
        let dataResponse = await responseUserData.json();
        if (dataResponse) {
            this.setState(refreshFormSubmit({ headerTitle: notification.success, isNotification: true }, originalStateObject));
        } else {
            this.setState(refreshFormSubmit({ headerTitle: notification.fail, isNotification: true }, originalStateObject));
        }
        console.log(dataResponse);
    }

    handleCancel(event) {
        this.props.history.goBack();
    }

    render() {
        return (
            <form className="form--create-degree" onSubmit={this.handleSubmit}>
                <h5 className={this.state.isNotification ? 'is-success' : ''}>{this.state.headerTitle}</h5>
                <div>
                    <label htmlFor="">User name</label>
                    <input type="text" value={this.state.username} onChange={this.handleChangeUsername}/>
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" onChange={this.handleChangePassword} value={this.state.password} />
                </div>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" value={this.state.name} onChange={this.handleChangeName} />
                </div>
                <div>
                    <label htmlFor="">Age</label>
                    <input type="number" onChange={this.handleChangeAge} value={this.state.age} />
                </div>
                <div>
                    <label htmlFor="">Description</label>
                    <input type="text" value={this.state.description} onChange={this.handleChangeDescription} />
                </div>
                <div>
                    <label htmlFor="">Permission</label>
                    <select className="select-permission" onChange={event => this.setState({
                        is_manage: event.target.value === "True",
                    })} value={this.state.is_manage} >
                        <option value="True">Manager</option>
                        <option value="False">User</option>
                    </select>
                </div>
                <div className="button">
                    <input type="button" value="Cancel" onClick={this.handleCancel} />
                    <input type="submit" value="Change" />
                </div>
            </form>
        )
    }
}

export default FormSetting;