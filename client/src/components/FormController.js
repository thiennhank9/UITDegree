import React, { Component } from 'react';
import FormCreateDegree from './FormCreateDegree';
import FormCreateUser from './FormCreateUser';
import FormSetting from './FormSetting';
import ListDegree from './ListDegree';

class FormController extends Component {
    renderCorrectForm() {
        const linkForm = this.props.match.params.link;
        if (linkForm === "create-degree") {
            return (
                <div className="features">
                    <FormCreateDegree {...this.props} />
                </div>
            )
        } else if (linkForm === "list-degrees") {
            return (
                <div className="features list" >
                    <ListDegree {...this.props}/>
                </div>
            )
        } else if (linkForm === "create-user") {
            return (
                <div className="features">
                    <FormCreateUser {...this.props} />
                </div>
            )
        } else if (linkForm === "setting") {
            return (
                <div className="features">
                    <FormSetting {...this.props} />
                </div>
            )
        }
    }

    render() {
        return this.renderCorrectForm();
    }
}

export default FormController;