import React from "react";
import "./LoginPage.css";
import Login from "../images/login.png";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    let { conf, changeuser, changepass } = this.props;
    return (
      <>
        <div className="login-page container">
          <h1>Login</h1>
          <form className="login_form">
            <div className="form-group">
              <label className="form-label">
                <div className="profile-icon">
                  <i class="far fa-user-circle"></i>
                </div>
                <input
                  required="required"
                  className="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={changeuser}
                />
              </label>
              <label className="form-label">
                <div className="password-icon">
                  <i class="fas fa-lock"></i>
                </div>
                <input
                  type="password"
                  required="required"
                  className="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={changepass}
                />
              </label>
              <button className="btn" onClick={conf}>
                Login
              </button>
            </div>
            <i className="fas fa-angle-double-left fa-2x go--left"></i>
            <img src={Login} alt="Login page" />
          </form>
        </div>
      </>
    );
  }
}

export default LoginPage;
