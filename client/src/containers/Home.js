import React, { Component } from 'react';
import './css/Home.css';
import Navigation from '../components/Navigation';
import InputStudentID from '../components/InputStudentID';
import VisionDegree from '../components/VisionDegree';
import LastRetrive from '../components/LastRetrive';
import Footer from '../components/Footer';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            listLastRetrive: null,
        };
        this.onChangeStudent = this.onChangeStudent.bind(this);
    }

    onChangeStudent(student) {
        this.setState({ student });
    }

    renderUniversityDegree() {
        if (this.state.student) 
            return <VisionDegree student={this.state.student} />
        return null;
    }

    render() {
        return (
            <div>
                <Navigation />
                <InputStudentID onChangeStudent={this.onChangeStudent} />
                {this.renderUniversityDegree()}
                <LastRetrive onChangeStudent={this.onChangeStudent} />
                <Footer />
            </div>
        );
    }
}

export default Home;