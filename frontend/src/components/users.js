import React, { Component, Fragment } from 'react';
import "./users.css";
import axios from 'axios';
import UserReadOnly from '../components/userReadOnly';
import UserEditRow from '../components/userEditRows';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            password: '',
            phone: '',
            email: '',
            user: [],
            editContactId: null,
        }
    }

    handlechange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleEditUser = (event, user) => {
        event.preventDefault();
        this.setState({
            editContactId: user._id,
            username: user.username,
            password: user.password,
            phone: user.phone,
            email: user.email
        })
    }

    handleCancel = event => {
        event.preventDefault();
        this.setState({ editContactId: null })
    }
    handleAdd = event => {
        const userInfo = {
            username: this.state.username,
            password: this.state.password,
            phone: this.state.phone,
            email: this.state.email,

        };
        const url = 'http://127.0.0.1:5000/api/users/';
        axios.post(url, userInfo)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    handleEdit = event => {
        const userInfo = {
            username: this.state.username,
            password: this.state.password,
            phone: this.state.phone,
            email: this.state.email,
        };
        const { editContactId } = this.state;
        const url = `http://127.0.0.1:5000/api/users/${editContactId}`;
        axios.put(url, userInfo)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    handledelete = (id) => {
        axios.delete(`http://127.0.0.1:5000/api/users/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/api/users/`)
            .then((res) => {
                let users = res.data;
                this.setState({ user: users })
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div id='userDashboard' className='container'>
                <form>
                    <label>username</label>
                    <input type='text' name='username' onChange={this.handlechange}></input>
                    <label>password</label>
                    <input type='text' name='password' onChange={this.handlechange}></input>
                    <label>phone</label>
                    <input type='text' name='phone' onChange={this.handlechange}></input>
                    <label>Email</label>
                    <input type='text' name='email' onChange={this.handlechange}></input>
                    <button type='submit' onClick={this.handleAdd}>ADD</button>
                </form>
                <form>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>UserName</th>
                            <th>Password</th>
                            <th>phone</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        {this.state.user.map((user, index) =>
                            <Fragment key={index}>
                                {this.state.editContactId === user._id ?
                                    (<UserEditRow data={user} changeData={this.handlechange} saveData={this.handleEdit} cancelBtn={this.handleCancel} />) :
                                    (<UserReadOnly data={user} editclick={this.handleEditUser} deleteBtn={this.handledelete} />)}
                            </Fragment>
                        )}
                    </table>
                </form>
            </div >
        );
    }
}
export default Users;