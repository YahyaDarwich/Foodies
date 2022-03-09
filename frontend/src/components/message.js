import React, { Component } from "react";
import "./message.css";
import axios from "axios";

export default class Message extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get("/api/contactUs", { crossdomain: true })
      .then((response) => {
        this.setState({ data: response.data.response });
      });
  }

  handleSubmit = (id) => {
    axios
      .delete(`/api/contactUs/${id}`)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })

      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <div className="message-dash container">
          <table>
            <caption>All Message</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Subject</th>
                <th scope="col">Message</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((data) => {
                return (
                  <tr>
                    <td data-label="Name">{data.name}</td>
                    <td data-label="Email">{data.email}</td>
                    <td data-label="Subject">{data.subject}</td>
                    <div className="scroll">
                      <td>
                        <label>Message</label>
                        <p>{data.message}</p>
                      </td>
                    </div>
                    <td data-label="Delete">
                      <button
                        type="button"
                        className="deletebtn"
                        onClick={() => this.handleSubmit(data._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
