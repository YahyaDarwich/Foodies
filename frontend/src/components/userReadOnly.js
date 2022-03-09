import React, { Component } from 'react';

class userReadOnly extends Component {

    render() {
        let { data, editclick ,deleteBtn} = this.props
        return (
                <tr>
                    <td>{data._id}</td>
                    <td>{data.username}</td>
                    <td>{data.password}</td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td><button type='submit' onClick={(event) => editclick(event, data)}>Edit</button><button type='submit' onClick={() => deleteBtn(data._id)}>delete</button></td>
                </tr>
        );
    }
}
export default userReadOnly;