import React, { Component } from 'react';

class userEditRow extends Component {

    render() {
        let { data, changeData, saveData, cancelBtn } = this.props
        return (
            <tr>
                <td>{data._id}</td>
                <td>
                    <input type='text'
                        name='username'
                       value={data.username}
                        onChange={changeData}
                        required
                    ></input>
                </td>
                <td>
                    <input
                        type='text'
                        name='password'
                        defaultValue={data.password}
                        onChange={changeData}
                        required
                    ></input>
                </td>
                <td>
                    <input type='text'
                        name='phone'
                        defaultValue={data.phone}
                        onChange={changeData}
                        required
                    ></input>
                </td>
                <td>
                    <input type='text'
                        name='email'
                        Value={data.email}
                        onChange={changeData}
                        required
                    ></input>
                </td>
                <td> <button type='submit' onClick={saveData}>Save</button><button type='submit' onClick={cancelBtn} >cancel</button></td>
            </tr>
        );
    }
}

export default userEditRow;