import React, { Component } from 'react';

class Feature extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const { url_link, message } = this.props;
        this.props.onClick(url_link, message);
    }

    render() {
        const { message, iconClass } = this.props;

        return (
            <div className="feature" onClick={this.handleClick}>
                <i className={iconClass}></i>
                <p>{message}</p>
            </div>
        )
    }
}

export default Feature;