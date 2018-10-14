import React from 'react';
import {getTransactionMetaDataBasestudentID} from '../utils/bdchain';

class InputStudentID extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentID: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(event) {
        var studentID = event.target.value;
        if (studentID.length < 9 && studentID.length !== 0) {
            // get info of correct student from bigchaindb
            let listStudent = await getTransactionMetaDataBasestudentID(studentID);
            let studentInfo = null;
            
            if (listStudent[0]) {
                studentInfo = listStudent[listStudent.length - 1].metadata;
            } else {
                // cannot finding this student
            }
            this.props.onChangeStudent(studentInfo);
        }

        this.setState({ studentID });
    }

    render() {
        return (
            <div className="poster">
                <h5 className="poster__caption">Hệ thống lưu trữ bằng đại học <b>UIT</b></h5>
                <div className="typing--degree">
                    <div className="input-effect">
                        <input className="effect-16" type="text" placeholder="" value={this.state.value} onChange={this.handleChange} />
                        <label>Mã số sinh viên</label>
                        <span className="focus-border"></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default InputStudentID;