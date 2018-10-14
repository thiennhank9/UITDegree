import React, { Component } from 'react'
import ReactTable from 'react-table'
import { makeColumns } from '../utils/makeData'
import { Link } from "react-router-dom"
import { getTransaction } from '../utils/bdchain'
import { convertStringToArray } from '../utils/convertStringArray'
import { fetchGet } from '../utils/Fetch';

class ListDegree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    async componentWillMount() {
        let data = []
        let listIdBlock = []
        const { token } = this.props.location.state;
        const header = (method) => {
            return {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                }
            };
        }

        const listBlock = await fetchGet('http://127.0.0.1:8000/blocks/', header('GET'))
        const lastidBlock = listBlock[listBlock.length - 1].block_id

        const blockList = await getTransaction(lastidBlock)
        listIdBlock = convertStringToArray(blockList.metadata.list_block)

        for (let i = 0; i < listIdBlock.length; i++) {
            const degreeBlock = await getTransaction(listIdBlock[i])
            data.push(degreeBlock.metadata)
        }

        console.log(data)
        this.setState({ data })
    }

    render() {
        const [data, columns] = [this.state.data, makeColumns()]
        return (
            <div>
                <div className="head-text-navigation">
                    <Link className="navigation-admin" to="/admin"><i className="fas fa-chevron-circle-left"></i> Back</Link>
                    <h1 className="text-centered spacing">List of Students</h1>
                    <div className="space-empty"></div>
                </div>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={20}
                    className="-striped -highlight"
                    filterable
                    noDataText="Oh Noes!"
                />
            </div>
        )
    }
}

export default ListDegree