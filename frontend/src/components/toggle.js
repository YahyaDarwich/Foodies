import React, { Component } from "react";
import "./toggle.css";
import toggle from "../images/unknown.png";

class Toggle extends Component {
  render() {
    return (
      <div>
        <section id="toggle" className="container">
          <div>
            <p>
              Tingle your Tastebuds
              <br/> <span>Grilled Chicken</span>
            </p>
            <p>
              Are you looking for somewhere special to go this weekend? Do you
              want to try something new? Check out one of these new recipe.
              <br />
              Foodies is founded on a simple premise:{" "}
              <b>Home cooks are the best chefs.</b> And we are honored to share
              recipes and cooking inspiration with millions of people on our
              website.
            </p>
          </div>
          <div>
            <img src={toggle} alt="food img" />
          </div>
        </section>
      </div>
    );
  }
}
export default Toggle;
