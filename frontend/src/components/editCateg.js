import React, { Component } from 'react';

class CatEditRow extends Component {

  render() {
    let { data, changeData, saveData, cancelBtn } = this.props
    return (
      <tr>
        <td>{data._id}</td>
        <td>
          <input type='text'
            name='name'
            defaultValue={data.name}
            onChange={changeData}
            required
          ></input>
        </td>
        <td> <button type='submit' onClick={saveData}>Save</button><button type='submit' onClick={cancelBtn}>cancel</button></td>
      </tr>
    );
  }
}
export default CatEditRow;
