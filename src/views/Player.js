import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 6px 0;
  width: 450px;
  height: 150px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
  flex-direction: column;
`;

const UserDetails = styled.div`
  font-weight: lighter;
  margin-left: 5px;
`;

/*const Password = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;*/

/*const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;*/

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Player = () => {
  return (
    <Container>
        <UserDetails>ID: {localStorage.getItem("id")}</UserDetails>
        <UserDetails>Token: {localStorage.getItem("token")}</UserDetails>
        <UserDetails>Username: {localStorage.getItem("username")}</UserDetails>
        <UserDetails>Birthdate: {localStorage.getItem("birthdate")}</UserDetails>
        <UserDetails>Creation date: {localStorage.getItem("creationdate")}</UserDetails>
        <UserDetails>Status: {localStorage.getItem("status")}</UserDetails>
    </Container>

  );
};

export default Player;
