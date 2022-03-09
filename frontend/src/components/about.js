import React, { Component } from "react";
import "./about.css";
export default class AboutFooter extends Component {
  render() {
    return (
      <>
        <div className="about container">
          <h1>About us</h1>
          <p>
            Foodies is a unique lifestyle network and website that brings
            foodies and chefs together in one place. The network strives to be
            viewers best friend by presenting the food recipes in multiple
            categories.
            <br/><br/>
            Foodies is founded on a simple premise: Home cooks are the best
            chefs. And we are honored to share recipes and cooking inspiration
            with millions of people on our website.
          </p>
        </div>
      </>
    );
  }
}
