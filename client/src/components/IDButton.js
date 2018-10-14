import React from 'react';

class IDButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.onClick(this.props.value);
    }

    render() {
        return (
            <a onClick={this.handleClick} href=""><span>{this.props.value}</span></a>
        )
    }
}

export default IDButton;