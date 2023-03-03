import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { movieUserLoginAction } from "../Actions/MovieAction";
import { useSelector, useDispatch } from "react-redux";
const FormContainer = styled.div`
  text-align: center;
`;
function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(movieUserLoginAction(userName, password));
    navigate("/");
  };
  return (
    <FormContainer>
      <label>
        UserName:
        <input
          id="username"
          name="username"
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </label>
      <br />
      <label>
        password:{" "}
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </FormContainer>
  );
}

export default LoginPage;
