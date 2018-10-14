import React, { Component } from 'react';
import Feature from '../components/Feature';
import './css/Admin.css';
import Footer from '../components/Footer';
import BubbleAnimation from '../components/BubbleAnimation';
import { Route } from 'react-router-dom';
import FormController from '../components/FormController';
import { auth } from '../utils/checkAuth';
import { globalstate } from '../utils/pageState';
import { Link } from "react-router-dom";
import { fetchGet, fetchPost } from '../utils/Fetch';
import { createAssets } from '../utils/bdchain';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: '',
            ...this.props.location.state,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        console.log(this.state.userdata)
        console.log('test global state', globalstate.state)
        if (!globalstate.state.userdata && auth.isAuthenticated) {
            const { username } = this.state;
            const token = this.props.location.state.token;
            const header = (method) => {
                return {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`
                    }
                };
            }
            let userdata = await fetchGet(`http://127.0.0.1:8000/users/${username}/`, header('GET'));
            let blocks = await fetchGet(`http://127.0.0.1:8000/blocks/`, header('GET'));
            console.log('test userdata', userdata)
            console.log('test blocks', blocks)
            if (blocks.length === 0) {
                const transaction = await createAssets({infomation: "nothing"},{list_block: ""}, {publicKey: userdata.public_key, privateKey: userdata.private_key});
                const body = JSON.stringify({
                    block_id: transaction.id,
                    public_key: userdata.public_key,
                    private_key: userdata.private_key
                });
                console.log(transaction)
                await fetchPost('http://127.0.0.1:8000/blocks/', header('POST'), {body: body});
            }
            globalstate.setState({...this.state, userdata})
            console.log('test global state', globalstate.state)
            console.log('admin state', this.state)
            console.log('userdata', userdata)
        }
        this.setState({...globalstate.state});
    }

    handleClick(url_link, message) {
        const transferState = {
            'message': message,
            ...this.state,
        }
        this.props.history.push(`/admin/${url_link}`, transferState);
    }

    renderContent() {
        if (this.props.location.pathname === "/admin")
            return (
                <div className="features">
                    <Feature message="Tạo mới bằng" iconClass="fas fa-plus-circle" url_link="create-degree" onClick={this.handleClick} />
                    <Feature message="Danh sách bằng" iconClass="fas fa-list-ol" url_link="list-degrees" onClick={this.handleClick} />
                    <Feature message="Tạo mới người dùng" iconClass="fas fa-user-circle" url_link="create-user" onClick={this.handleClick} />
                    <Feature message="Cài Đặt" iconClass="fas fa-cog" url_link="setting" onClick={this.handleClick} />
                </div>
            );
        return (
            <Route path="/admin/:link" component={FormController} />
        )
    }

    render() {

        return (
            <div className="admin-wrap">
                <div className="navigation">
                    <Link className="navigation__button--left" to="/" ><i className="far fa-address-card"></i>UIT Degree</Link>
                    <Link className="navigation__button--login" to="/" onClick={() => { auth.signout(); globalstate.clearState() }}>Logout</Link>
                </div>
                <div className="banner">
                    <h3>Trường Đại Học Công Nghệ Thông Tin</h3>
                    <hr />
                    <h3>Hệ thống bằng điện tử</h3>
                    <BubbleAnimation />
                </div>

                {this.renderContent()}

                <Footer />
            </div>
        )
    }
}

export default Admin;