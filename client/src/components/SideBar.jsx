import React from "react";
import * as style from "../styles/styles";

const SideBar = ({ name }) => {
  return (
    <style.SideBar>
      <ul>
        <li>Room:</li>
        <li>#northcoders-chat</li>
        <li>Users:</li>
        <li>{name}</li>
      </ul>
    </style.SideBar>
  );
};

export default SideBar;
