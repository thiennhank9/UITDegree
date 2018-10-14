import React from 'react';
import IDButton from './IDButton';
import {getTransactionMetaDataBasestudentID} from '../utils/bdchain';

class LastRetrive extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(studentID) {
        let listStudent = await getTransactionMetaDataBasestudentID(studentID);
        let studentInfo = null;
        
        if (listStudent[0]) {
            studentInfo = listStudent[listStudent.length - 1].metadata;
        } else {
            // cannot finding this student
        }
        this.props.onChangeStudent(studentInfo);
    }

    render() {
        return (
            <div className="last-retrive">
                <div className="last-retrive__content">
                    <h6>Hoạt động gần đây</h6>
                    <div className="last-retrive__content__list--students">
                        <IDButton onClick={this.handleClick} value="14520100" />
                    </div>
                </div>
            </div>
        );
    }
}

export default LastRetrive;