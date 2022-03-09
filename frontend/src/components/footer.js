import React, { Component } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
export default class FoodiesFooter extends Component {
  render() {
    return (
      <>
        <div className="footer">
          <div className="one__footer">
            <div className="one__help">Help us improve your experience</div>
            <Link to="/contact">
              <button className="one__feedback" type="button">
                Feedback
              </button>
            </Link>
          </div>
          <div className="two__footer">
            <div className="two__foodies">
              &#169; foodies Lebanon, Inc All rights reserved
            </div>
            <div className="two__contact">
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
