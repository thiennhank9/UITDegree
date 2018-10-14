import React, { Component } from 'react';
import './css/Login.css';
import BubbleAnimation from '../components/BubbleAnimation';
import { auth } from '../utils/checkAuth';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            notification: 'Login to Systems',
            isError: false,
        }

        this.onTextUsernameChange = this.onTextUsernameChange.bind(this);
        this.onTextPasswordChange = this.onTextPasswordChange.bind(this);
        this.onButtonLoginClick = this.onButtonLoginClick.bind(this);
    }

    onTextUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onTextPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    async onButtonLoginClick(event) {
        event.preventDefault();
        const { username, password } = this.state;
        let responseToken = await fetch("http://127.0.0.1:8000/api-token-auth/",
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            }
        );
        let tokenObject = await responseToken.json();
        if (tokenObject.token) {
            const transferState = {
                token: tokenObject.token,
                username: this.state.username,
                password: this.state.password,
            }
            auth.authenticate();
            this.props.history.push('admin', transferState);
        } else {
            // tell to user that the username or password is incorrect
            this.setState({ notification: 'username or password is not correct', isError: true });
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <h1 className={this.state.isError ? "notification error" : "notification"}>{this.state.notification}</h1>

                    <form className="form" onSubmit={this.onButtonLoginClick}>
                        <input type="text" placeholder="Username" value={this.state.username} onChange={this.onTextUsernameChange} />
                        <input type="password" placeholder="Password" value={this.state.password} onChange={this.onTextPasswordChange} />
                        <button type="submit" id="login-button" >Login</button>
                    </form>
                </div>

                <BubbleAnimation />
            </div>
        );
    }
}

export default Login;