import React from 'react'

const makeData = () => {
    const data = [
        {
            studentID: '14520100',
            studentName: 'Minh Cong Tran',
            ranking: 'Excellent',
            modeOfStudy: 'Full-time',
            majoy: "Software Engineer",
            bornOn: 'Nghe An',
            serialNumber: '8888888',
            referenceNumber: '',
        },
        {
            studentID: '14520626',
            studentName: 'Thien Nhan Nguyen',
            ranking: 'Very good',
            modeOfStudy: 'Full-time',
            majoy: "Software Engineer",
            bornOn: 'Vung Tau',
            serialNumber: '888883434',
            referenceNumber: '',
        },
    ]
    return data
}

const makeColumns = () => {
    const columns = [
        {
            Header: 'ID',
            accessor: 'studentID', // String-based value accessors!
            minWidth: 85,
        },
        {
            Header: 'Name',
            accessor: 'studentName',
            minWidth: 130,
        },
        {
            Header: 'Ranking',
            accessor: 'ranking', // Custom value accessors!
            maxWidth: 95,
            filterMethod: (filter, row) => {
                if (filter.value === "all") {
                    return true;
                }
                return row['ranking'] === filter.value;
            },
            Filter: ({ filter, onChange }) =>
                (<select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">All</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Very good">Very good</option>
                    <option value="Good">Good</option>
                    <option value="Average good">Average good</option>
                    <option value="Ordinary">Ordinary</option>
                </select>)
        },
        {
            Header: 'Mode of study', // Custom header components!
            accessor: 'modeOfStudy',
            maxWidth: 95,
            filterMethod: (filter, row) => {
                if (filter.value === "all") {
                    return true;
                }
                return row['modeOfStudy'] === filter.value;
            },
            Filter: ({ filter, onChange }) =>
                (<select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">All</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Distance learning">Distance learning</option>
                    <option value="Guided Self-learning">Guided Self-learning</option>
                </select>)
        },
        {
            Header: 'Majoy',
            accessor: 'majoy',
            minWidth: 130,
        },
        {
            Header: 'Born on',
            accessor: 'bornOn'
        },
        {
            Header: 'Serial Number',
            accessor: 'serialNumber',
            maxWidth: 85,
        },
        {
            Header: 'Reference Number',
            accessor: 'referenceNumber',
            maxWidth: 85,
        }
    ]
    return columns
}

export { makeData, makeColumns };