import React, { Component, Fragment } from "react";
import "./categoryDash.css";
import axios from "axios";
import CatReadOnly from '../components/readOnlyCat';
import CatEditRow from '../components/editCateg';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      categories: [],
      editContactId: null
    };
  }


  handlechange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEditCat = (event, categories) => {
    event.preventDefault();
    this.setState({
      editContactId: categories._id,
      name: categories.name,
    })

  }

  handleCancel = event => {
    event.preventDefault();
    this.setState({ editContactId: null })
  }

  handleAdd = event => {
    axios.post('http://localhost:5000/api/categories/', { name: this.state.name })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  handleEdit = event => {
    const userInfo = {
      name: this.state.name,
    };
    const { editContactId } = this.state;
    const url = `http://localhost:5000/api/categories/${editContactId}`;
    axios.put(url, userInfo)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  handledelete = (id) => {
    axios.delete(`http://localhost:5000/api/categories/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/categories/`)
      .then((res) => {
        let categories = res.data;
        this.setState({ categories: categories.response })
      })
      .catch((err) => console.log(err));
  }


  render() {
    return (
      <div id="category-dash-container">
        <form>
          <label>description</label>
          <input type='text' name='name' onChange={this.handlechange}></input>
          <button type='submit' onClick={this.handleAdd} >ADD</button>
        </form>
        <form>
          <table>
            <tr>
              <th>ID</th>
              <th>description</th>
              <th>Action</th>
            </tr>
            {this.state.categories.map((category, index) =>
              <Fragment key={index}>
                {this.state.editContactId === category._id ?
                  (<CatEditRow data={category} changeData={this.handlechange} saveData={this.handleEdit} cancelBtn={this.handleCancel} />) :
                  (<CatReadOnly data={category} editclick={this.handleEditCat} deleteBtn={this.handledelete} />)}
              </Fragment>
            )}
          </table>
        </form>
      </div>
    );
  }
}
export default Category;