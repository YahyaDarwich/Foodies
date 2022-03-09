import React, { Component } from 'react';

class CatReadOnly extends Component {

  render() {
    let { data, editclick, deleteBtn } = this.props
    return (
      <tr>
        <td>{data._id}</td>
        <td>{data.name}</td>
        <td><button type='submit' onClick={(event) => editclick(event, data)} >Edit</button><button type='submit' onClick={() => deleteBtn(data._id)} >delete</button></td>
      </tr>
    );
  }
}
export default CatReadOnly;
