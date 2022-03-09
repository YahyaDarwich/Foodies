import React from "react";
import { Link } from "react-router-dom";
import "./FoodBlogs.css";

class FoodBlogs extends React.Component {
  render() {
    return (
      <>
        <Link
          to={{
            pathname: `/food/${this.props.id}`,
          }}
        >
          <div className="blog">
            <img src={`/uploads/${this.props.idImg}`} className="blog__img" alt="food" />
            <h3 className="blog__title">{this.props.title}</h3>
            <div className="blog__info">
              <p className="blog__info__author">
                {this.props.firstName} {this.props.lastName}
              </p>
              <span className="blog__info__time">{this.props.date}</span>
            </div>
          </div>
        </Link>
      </>
    );
  }
}
export default FoodBlogs;
