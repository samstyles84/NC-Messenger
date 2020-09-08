import React from "react";
import SideBar from "./SideBar";
import ChatList from "./ChatList";
import TextInput from "./TextInput";

const MainChat = (props) => {
  return (
    <main>
      <SideBar />
      <ChatList chat={props.chat} />
      <TextInput
        onMessageSubmit={props.onMessageSubmit}
        onTextChange={props.onTextChange}
        message={props.message}
      />
    </main>
  );
};

export default MainChat;
