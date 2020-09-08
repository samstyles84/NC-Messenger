import React from "react";
import { Link } from "@reach/router";
import * as style from "../styles/styles";

const LandingPage = (props) => {
  return (
    <style.WelcomeMain>
      <style.WelcomeSection>
        <h1>Welcome to Northcoders Chatroom</h1>
        <style.WelcomeForm onSubmit={props.onUsernameSubmit}>
          <label htmlFor="userName">Username: </label>
          <input
            type="text"
            name="name"
            id="userName"
            value={props.name}
            onChange={props.onTextChange}
          />
          <label htmlFor="joinChat">Join Chat</label>
          <Link to="/mainchat">
            <button>#northcoders-chat</button>
          </Link>
        </style.WelcomeForm>
      </style.WelcomeSection>
    </style.WelcomeMain>
  );
};

export default LandingPage;
