import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import io from "socket.io-client";
import LandingPage from "./components/LandingPage";
import MainChat from "./components/MainChat";
import PrivateChat from "./components/PrivateChat";

const socket = io.connect("http://localhost:9000");

class App extends Component {
  state = {
    name: "",
    message: "",
    chat: [],
  };

  componentDidMount() {
    socket.on("connection", () => {
      socket.emit("join", this.state.name);
    });
    socket.on("connected", ({ name }) => {
      this.setState(({ chat }) => {
        return { chat: [...chat, { name, message: " has joined" }] };
      });
    });
    socket.on("message", ({ name, message }) => {
      this.setState(({ chat }) => {
        return { chat: [...chat, { name, message }] };
      });
    });
  }
  onUsernameSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const { name } = this.state;
    this.setState({ name: submitEvent.target.value });
    socket.emit("join", { name });
  };
  onMessageSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const { name, message } = this.state;
    socket.emit("send", { name, message });
    this.setState({ message: "" });
  };
  onTextChange = (submitEvent) => {
    this.setState({ [submitEvent.target.name]: submitEvent.target.value });
  };
  render() {
    return (
      <div className="App">
        <Router>
          <LandingPage
            path="/"
            name={this.state.name}
            onUsernameSubmit={this.onUsernameSubmit}
            onTextChange={this.onTextChange}
          />
          <MainChat
            path="/mainchat"
            onMessageSubmit={this.onMessageSubmit}
            onTextChange={this.onTextChange}
            message={this.state.message}
            chat={this.state.chat}
            name={this.state.name}
          />
          <PrivateChat path="/:user" />
        </Router>
      </div>
    );
  }
}

export default App;
