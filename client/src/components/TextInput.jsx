import React from "react";
import * as style from "../styles/styles";

const TextInput = (props) => {
  return (
    <React.Fragment>
      <style.TextInput onSubmit={props.onMessageSubmit}>
        <input
          type="text"
          name="message"
          id=""
          value={props.message}
          onChange={props.onTextChange}
        />
        <button>Send</button>
      </style.TextInput>
    </React.Fragment>
  );
};

export default TextInput;
