import React from "react";
import * as style from "../styles/styles";

const ChatList = (props) => {
  return (
    <style.ChatMain>
      <ul>
        {props.chat.map(({ name, message }, index) => {
          return (
            <li key={index}>
              {name}: {message}
            </li>
          );
        })}
      </ul>
    </style.ChatMain>
  );
};

export default ChatList;
