import React from 'react';

class VisionDegree extends React.Component {
    render() {
        const student = this.props.student;
        
        return (
            <div className="vision-degree">
                <h5 className="vision-degree__title">Chứng chỉ đại học bạn {student.studentName}</h5>
                <div className="vision-degree__content">
                    <h2>{student.studentName}</h2>
                    <div className="vision-degree__content--info">
                        <p>{student.bornOn}</p>
                        <p>{student.majoy}</p>
                        <p>{student.ranking}</p>
                        <p>{student.modeOfStudy}</p>
                    </div>
                    <div className="vision-degree__content--number">
                        <a id="serial-number" href="https://www.uit.edu.vn/tra-cuu/van-bang" target="_blank" rel="noopener noreferrer">{student.serialNumber}</a>
                        <a id="reference-number">{student.referenceNumber}</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default VisionDegree;