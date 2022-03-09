import React from "react";
import FoodBlogs from "../components/FoodBlogs";
import axios from "axios";
import CategorySearch from "../components/CategorySearch";
import Toggle from "../components/toggle";
import "./Home.css";
import MeetupLoader from "../components/meetupLoader";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
      date: undefined,
      isLoading: true,
    };
    this.setStateOfParent.bind(this);
  }
  componentDidMount() {
    axios.get(`/api/recipes/`).then((res) => {
      const blogs = res.data;
      //console.log(blogs.response[0].title);
      this.setState({ blogs: blogs.response });
      console.log(this.state.blogs);
      this.setState({ isLoading: false });
    });
  }

  setStateOfParent = (newData) => {
    this.setState({ blogs: newData });
  };

  render() {
    return (
      <>
        <Toggle />
        <CategorySearch setStateOfParent={this.setStateOfParent}/>
        {this.state.isLoading ? (
          <MeetupLoader />
        ) : (
          <div className="blogs container">
            {this.state.blogs.map((blog, index) => {
              console.log(blog.image.name)
              return (
                <FoodBlogs
                  key={index}
                  title={blog.title}
                  firstName={blog.userFirstName}
                  lastName={blog.userLastName}
                  date={blog.createdAt}
                  id={blog._id}
                  idImg={blog.image.name}
                />
              );
            })}
          </div>
        )}
      </>
    );
  }
}
export default Home;
