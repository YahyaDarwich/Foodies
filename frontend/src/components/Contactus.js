import React from "react";
import "./Contactus.css";
import ContactImg from "../images/contact us.jpg";
import axios from "axios";
class Contactus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const contact = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message,
    };
    console.log(this.state);
    axios
      .post("/api/contactUs/", contact)
      .then((Response) => {
        console.log(Response);
        if(Response.status === 200){
          const nameContactus = document.getElementById("nameContactus");
          const emailContactus = document.getElementById("emailContactus");
          const subjectContactus = document.getElementById("subjectContactus");
          const messageContactus = document.getElementById("messageContactus");
          nameContactus.value= ""
          emailContactus.value= ""
          subjectContactus.value= ""
          messageContactus.value= ""
          alert("message sent")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div className="contact_us container">
          <div className="image__box">
            <img src={ContactImg} alt="contact us" />
          </div>
          <i className="fas fa-angle-double-right fa-2x go--right"></i>
          <div className="form__box">
            <h3 className="title">Send us a message</h3>
            <form className="form" onSubmit={this.submitHandler}>
              <div className="input-box">
                <input
                  type="text"
                  name="name"
                  id="nameContactus"
                  onChange={this.changeHandler}
                  required
                />
                <label>Name</label>
              </div>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  id="emailContactus"
                  onChange={this.changeHandler}
                  required
                />
                <label>Email</label>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="subject"
                  id="subjectContactus"
                  onChange={this.changeHandler}
                  required
                />
                <label>Subject</label>
              </div>
              <div className="message-box">
                <textarea
                  name="message"
                  id="messageContactus"
                  onChange={this.changeHandler}
                  required
                ></textarea>
                <label>Message</label>
              </div>
              <div className="input-box">
                <input type="submit" value="Send Message" />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Contactus;
