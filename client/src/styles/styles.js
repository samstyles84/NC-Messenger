import styled from "styled-components";

export const WelcomeSection = styled.section`
  display: flex;
  flex-flow: column wrap;
  width: 60vw;
  border-radius: 10px;
  background-color: #457b9d;
`;

export const WelcomeForm = styled.form`
  display: inline-flex;
  flex-flow: column wrap;
  align-self: center;
  justify-items: stretch;
  width: 50%;
  padding: 3rem;
`;

export const WelcomeMain = styled.main`
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  margin-top: 10rem;
`;

export const ChatMain = styled.section`
  background-color: #f1faee;
  margin-left: 20vw;
  top: 0;
  margin-top: 0;
  height: 95vh;
`;

export const SideBar = styled.nav`
  position: fixed;
  background-color: #457b9d;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 20vw;
  height: 100vh;
  text-align: left;
  top: 0;
`;

export const TextInput = styled.form`
  position: fixed;
  background-color: #a8dadc;
  padding: 0;
  margin: 0;
  display: flex;
  margin-left: 20vw;
  width: 80vw;
  height: 5vh;
  bottom: 0;
  flex-wrap: nowrap;
`;
