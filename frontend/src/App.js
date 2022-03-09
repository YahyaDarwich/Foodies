import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import FoodiesFooter from "./components/footer";
import Navbar from "./components/Navbar";
import Login from "./components/LoginPage";
import Fooddesc from "./components/fooddesc";
import About from "./components/about";
import Contact from "./components/Contactus";
import Message from "./components/message";
import Home from "./pages/Home";
import Blog from "./components/Blog";
import User from "./components/users";
import Category from "./components/categoryDash";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pagination
// popup message when sent message or any event in the website (sweet alert 2 library https://sweetalert2.github.io/ )
// http errors when email not match the structure and if it's already taken (pasword, name, ...)
// tastify, swiper js https://swiperjs.com/, email js https://www.emailjs.com/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  logOut = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  handleUsername = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handlepassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = {
      email: this.state.email,
      password: this.state.password,
    };
    const url = "http://127.0.0.1:5000/api/users/admin";
    axios
      .post(url, userInfo)
      .then((res) => {
        console.log(res);
        if (res.data === "done") {
          localStorage.setItem("rememberMe", "true");
          window.location.href = "/";
        } else {
          window.removeItem("rememberMe");
          window.localStorage.clear();
        }
      })
      .catch((err) => console.log(err.data));
  };

  render() {
    return (
      <>
        <Router>
          <Navbar logOut={this.logOut} />
          <Routes>
            <Route exact path="/food/:id" element={<Fooddesc />}></Route>
            <Route
              exact
              path="/admin"
              element={
                <Login
                  conf={this.handleSubmit}
                  changeuser={this.handleUsername}
                  changepass={this.handlepassword}
                />
              }
            ></Route>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/contact" element={<Contact />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            {localStorage.getItem("rememberMe") === "true" ? (
              <>
                <Route exact path="/category" element={<Category />}></Route>
                <Route exact path="/message" element={<Message />}></Route>
                <Route exact path="/foods" element={<Blog />}></Route>
              </>
            ) : null}
            <Route exact path="/admin/users" element={<User />}></Route>
          </Routes>
          <FoodiesFooter />
        </Router>
      </>
    );
  }
}
export default App;
