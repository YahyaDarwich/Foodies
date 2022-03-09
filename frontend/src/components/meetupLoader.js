import React from "react";
import "./meetupLoader.css";
class meetupLoader extends React.Component {
  render() {
    return (
      <>
        <div class="loader-container">
          <div class="meetup">
            <div style={{background:"#e9503e"}}></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </>
    );
  }
}

export default meetupLoader;