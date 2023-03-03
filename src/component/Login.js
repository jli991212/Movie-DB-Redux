import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./Button";
import { movieUserSignoutAction } from "../Actions/MovieAction";
const LoginContainer = styled.div`
  display: flex;
`;

export default function Login() {
  const [hasLogin, setHasLogin] = useState(false);
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(movieUserSignoutAction());
  };
  const handleHover = () => {
    setHasLogin(true);
  };
  const handleMouseOut = () => {
    setHasLogin(false);
  };
  const renderLogin = () => {
    if (movieState.userName === "") {
      return <Link to="/loginPage">Login</Link>;
    } else {
      return (
        <span onMouseLeave={handleMouseOut} onMouseEnter={handleHover}>
          <Button>{movieState.userName}</Button>
          {hasLogin && <Button onClick={handleSignOut}>SignOut</Button>}
        </span>
      );
    }
  };
  return (
    <>
      <LoginContainer>
        {/* <Link to="/loginPage">{text}</Link> */}
        {renderLogin()}
      </LoginContainer>
    </>
  );
}
