import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./fooddesc.css";
import MeetupLoader from "./meetupLoader";

class Fooddesc extends Component {
  constructor() {
    super();
    this.state = {
      food: [],
      ingredients: [],
      oneCategoryFoods: [],
      category_id: undefined,
      isLoading: true,
      img: undefined,
      reload: false,
    };
  }

  componentDidMount() {
    const id = document.URL.split("/")[4];
    console.log(id);
    axios
      .get(`/api/recipes/${id}`)
      .then((res) => {
        this.setState({ food: res.data.response });
        // console.log(this.state.food);
        this.setState({ ingredients: res.data.response.ingredient });
        this.setState({ img: res.data.response.image.name });
        this.setState({ isLoading: false });
        //console.log(this.state.ingredients);
        this.setState({ category_id: this.state.food.category._id });
        console.log(this.state.category_id);
      })
      .then(() => {
        axios
          .get(
            `/api/recipes/category/${this.state.category_id}`
          )
          .then((res) => {
            // console.log(res.data.response);
            this.setState({ oneCategoryFoods: res.data.response });
            console.log(this.state.oneCategoryFoods);
          })
          .catch(console.log("cannot get the id of category"));
      })
      .catch(console.log("cannot get the id of food"));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const id = document.URL.split("/")[4];
    axios.delete(`/api/recipes/${id}`).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        window.location.href = "/";
      }
    });
  };

  reloadLink = (e) => {
    setInterval(() => {
      window.location.reload();
    }, 500);
    clearTimeout();
  };

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <MeetupLoader />
        ) : (
          <section id="fooddesc" className="container">
            <div>
              <img
                src={`/uploads/${this.state.img}`}
                alt="fodimg"
              ></img>
              <p>{this.state.food.title}</p>
              <p>
                {this.state.food.userFirstName} {this.state.food.userLastName}
              </p>
              <span>{this.state.food.createdAt}</span>
              <ul className="ingredient-list">
                <lh>List of ingredients:</lh>
                {this.state.ingredients.map((el, index) => {
                  if (el.unit === "piece")
                    return (
                      <li key={index}>
                        {el.quantity} {el.name}
                      </li>
                    );
                  return (
                    <li key={index}>
                      {el.quantity} {el.unit} of {el.name}
                    </li>
                  );
                })}
              </ul>
              <form onSubmit={this.handleSubmit}>
                {localStorage.getItem("rememberMe") === "true" ? (
                  <button type="submit" className="delete-btn">
                    Delete
                  </button>
                ) : null}
              </form>
            </div>
            <div className="oneCategry-group">
              <span>Our Best Recipes</span>
              {this.state.oneCategoryFoods
                .slice(-5)
                .reverse()
                .map((el, index) => {
                  return (
                    <Link
                      to={{
                        pathname: `/food/${el._id}`,
                      }}
                      onClick={this.reloadLink}
                    >
                      <div>
                        <img
                          src={`/uploads/${el.image.name}`}
                          alt="food Img"
                        />
                        <p>
                          {el.title}
                          <br />
                          {/* <span>{el.createdAt}</span> */}
                        </p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </section>
        )}
      </>
    );
  }
}
export default Fooddesc;
