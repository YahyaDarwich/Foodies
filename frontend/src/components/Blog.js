import React from "react";
import "./Blog.css";
import axios from "axios";
class Blog extends React.Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
      id: undefined,
    };
  }
  
  componentDidMount() {
    axios.get(`/api/recipes/`).then((res) => {
      const blogs = res.data;
      //console.log(blogs.response[0].title);
      this.setState({ blogs: blogs.response });
      console.log(this.state.blogs);
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .delete(`/api/recipes/${this.state.id}`)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          const id = document.getElementById("id");
          id.value = "";
          window.location.reload();
        }
      });
  };

  render() {
    return (
      <>
        <div className="foods-dashboard container">
          <div className="food-showAll">
            <h1>All Foods</h1>
            <table className="showAll-column">
              <tr>
                <th>ID</th>
                <th>username</th>
                <th>Title</th>
                <th>Date</th>
              </tr>
              {this.state.blogs.map((blog, index) => {
                return (
                  <tr className="showAll-info" key={index}>
                    <td>{blog._id}</td>
                    <td>
                      {blog.userFirstName} {blog.userLastName}
                    </td>
                    <td>{blog.title}</td>
                    <td>{blog.createdAt}</td>
                  </tr>
                );
              })}
            </table>
          </div>
          {/* <div className="food-delete">
            <h1>Delete Foods</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="delete-info">
                <input
                  type="text"
                  name="id"
                  id="id"
                  placeholder="Enter ID of food"
                  onChange={this.handleChange}
                />
                <button type="submit" className="delete-btn">
                  Delete
                </button>
              </div>
            </form>
          </div> */}
          {/* <div className="food-delete">
            <h1>Update Foods</h1>
            <form>
              <div className="update-info">
                <input type="text" placeholder="Enter food ID" />
                <input
                  type="text"
                  name="update"
                  placeholder="Enter the new change"
                />
                <button type="submit" className="delete-btn">
                  update
                </button>
              </div>
            </form>
          </div> */}
        </div>
      </>
    );
  }
}
export default Blog;
