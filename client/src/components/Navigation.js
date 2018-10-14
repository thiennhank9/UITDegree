import React from 'react';
import ButtonLogin from './ButtonLogin';
import { Link } from "react-router-dom";

class Navigation extends React.Component {
    render() {
        return (
            <div className="navigation">
                <Link className="navigation__button--left" to="/"><i className="far fa-address-card"></i>UIT Degree</Link>
                <ButtonLogin />
            </div>
        );
    }
}

export default Navigation;