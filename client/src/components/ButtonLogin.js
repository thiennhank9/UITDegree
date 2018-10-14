import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../utils/checkAuth';

class ButtonLogin extends React.Component {
    renderButton() {
        if (auth.isAuthenticated)
            return (
                <Link to="/admin" className="navigation__button--login">
                    Go Dashboard
                </Link>
            )
        else {
            return (
                <Link to="/login" className="navigation__button--login">
                    Login
                </Link>
            )
        }
    }
    render() {
        return this.renderButton();
    }
}

export default ButtonLogin;