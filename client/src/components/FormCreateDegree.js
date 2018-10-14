import React, { Component } from 'react';
import { createAssets, transferAssets, getTransaction } from '../utils/bdchain';
import { refreshFormSubmit } from '../utils/refreshForm';
import { convertArrayToString } from '../utils/convertStringArray'
import { fetchPost, fetchGet } from '../utils/Fetch'

const capitalize = (string) => {
    let array = string.split(" ");
    let newArray = array.map(element => element.charAt(0).toUpperCase() + element.slice(1));
    if (newArray.length === 1)
        return newArray[0];
    return newArray.join(" ");
}

const notification = {
    success: 'Success to create new degree',
    fail: 'Faile to create new degree',
}

const originalStateObject = {
    meta: {
        studentID: '',
        studentName: '',
        ranking: 'Very good',
        modeOfStudy: 'Full-time',
        majoy: "Software Engineer",
        bornOn: '',
        serialNumber: '',
        referenceNumber: '',
    },
}

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meta: {
                studentID: '',
                studentName: '',
                ranking: 'Very good',
                modeOfStudy: 'Full-time',
                majoy: "Software Engineer",
                bornOn: '',
                serialNumber: '',
                referenceNumber: '',
            },
            headerTitle: 'Create new degree',
            isNotification: false,
            listIdBlock: [],
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeBorn = this.handleChangeBorn.bind(this);
        this.handleChangeSerialNumber = this.handleChangeSerialNumber.bind(this);
        this.handleChangeReferenceNumber = this.handleChangeReferenceNumber.bind(this);
    }

    async handleCancel() {
        const token = this.props.location.state.token;
        const header = (method) => {
            return {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                }
            };
        };

        if (this.state.listIdBlock.length !== 0) {
            let keypairBaseuser = {publicKey: "", privateKey: ""}
            const blockID = await fetchGet(`http://127.0.0.1:8000/blocks/`, header('GET'))
            const idBlockList = blockID[blockID.length - 1].block_id
            keypairBaseuser.publicKey = blockID[blockID.length - 1].public_key
            keypairBaseuser.privateKey = blockID[blockID.length - 1].private_key

            const prevBlock = await getTransaction(idBlockList);
            const list_id_assets = prevBlock.metadata.list_block;

            let list_block = ""
            if (list_id_assets === "" || list_id_assets === " ") {
                list_block = convertArrayToString(this.state.listIdBlock);
            } else {
                list_block = list_id_assets + ';' + convertArrayToString(this.state.listIdBlock);
            }
            const transaction = await transferAssets(idBlockList, { list_block: list_block }, keypairBaseuser, keypairBaseuser);

            const body = JSON.stringify({
                block_id: transaction.id,
                public_key: keypairBaseuser.publicKey,
                private_key: keypairBaseuser.privateKey
            });

            await fetchPost(`http://127.0.0.1:8000/blocks/`, header('POST'), {body: body});
        }
        this.props.history.goBack();
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { userdata } = this.props.location.state;
        const metadata = this.state.meta;
        const keypair = {
            publicKey:  userdata.public_key,
            privateKey: userdata.private_key,
        }
        const asset = { creator: userdata.name }
        const transaction = await createAssets(asset, metadata, keypair);

        let listIdBlock = this.state.listIdBlock
        if (transaction) {
            listIdBlock.push(transaction.id)
            this.setState(refreshFormSubmit({ headerTitle: notification.success, listIdBlock, isNotification: true }, originalStateObject));
        } else {
            this.setState(refreshFormSubmit({ headerTitle: notification.fail }, originalStateObject));
        }
    }

    handleChangeID(event) {
        this.setState({
            meta: {
                ...this.state.meta,
                studentID: event.target.value,
            },
        })
    }

    handleChangeName(event) {
        this.setState({
            meta: {
                ...this.state.meta,
                studentName: event.target.value.toUpperCase(),
            }
        });
    }

    handleChangeBorn(event) {
        this.setState({
            meta: {
                ...this.state.meta,
                bornOn: capitalize(event.target.value),
            }
        });
    }

    handleChangeSerialNumber(event) {
        this.setState({
            meta: {
                ...this.state.meta,
                serialNumber: event.target.value,
            }
        });
    }

    handleChangeReferenceNumber(event) {
        this.setState({
            meta: {
                ...this.state.meta,
                referenceNumber: event.target.value,
            }
        });
    }

    render() {
        return (
            <form className="form--create-degree" onSubmit={this.handleSubmit}>
                <h5 className={this.state.isNotification ? 'is-success' : ' '}>{this.state.headerTitle}</h5>
                <div>
                    <label htmlFor="">Student ID</label>
                    <input type="number" value={this.state.meta.studentID} onChange={this.handleChangeID} />
                </div>
                <div>
                    <label htmlFor="">Student Name</label>
                    <input type="text" name="student_name" value={this.state.meta.studentName} onChange={this.handleChangeName} />
                </div>
                <div>
                    <label htmlFor="">Born on</label>
                    <input type="text" name="born_on" value={this.state.meta.bornOn} onChange={this.handleChangeBorn} />
                </div>
                <div className="majoy">
                    <label htmlFor="">Ranking</label>
                    <select onChange={event => this.setState({
                        meta: {
                            ...this.state.meta,
                            ranking: event.target.value,
                        }
                    })} defaultValue="Very good">
                        <option value="Excellent">Excellent</option>
                        <option value="Very good">Very good</option>
                        <option value="Good">Good</option>
                        <option value="Average good">Average good</option>
                        <option value="Ordinary">Ordinary</option>
                    </select>
                </div>
                <div className="mode-of-study">
                    <label htmlFor="">Mode of study</label>
                    <select onChange={event => this.setState({
                        meta: {
                            ...this.state.meta,
                            modeOfStudy: event.target.value,
                        }
                    })} defaultValue="Full-time" >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Distance learning">Distance learning</option>
                        <option value="Guided Self-learning">Guided Self-learning</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Serial Number</label>
                    <input type="number" value={this.state.meta.serialNumber} onChange={this.handleChangeSerialNumber} />
                </div>
                <div>
                    <label htmlFor="">Reference Number</label>
                    <input type="number" value={this.state.meta.referenceNumber} onChange={this.handleChangeReferenceNumber} />
                </div>
                <div className="button">
                    <input type="button" value="Cancel" onClick={this.handleCancel} />
                    <input type="submit" value="Create" />
                </div>
            </form>
        )
    }
}

export default Form;