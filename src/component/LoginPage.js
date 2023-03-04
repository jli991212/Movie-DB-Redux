import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { movieUserLoginAction } from "../Actions/MovieAction";
import { useSelector, useDispatch } from "react-redux";
const FormContainer = styled.div`
  text-align: center;
`;
const ErrorMessage=styled.div`
color: red `;
function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hasClicked, setHasClicked] = useState(false);
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();
  const handleLogin = () => {
    setHasClicked(true);
    dispatch(movieUserLoginAction(userName, password));
  };
  const handleLoginFailed = () => {
    if (movieState.sessionID !== "") {
      navigate("/");
    } else {
      return movieState.loading ? "" : <div>login failed</div>;
    }
  };
  const handleRequiredUserName=(userName)=>{
    if(userName===''){
      return <ErrorMessage>please input userName before sumbit</ErrorMessage>
    }
  }
  const handleRequiredPassword=(password)=>{
    if(password==='' ){
      return <ErrorMessage>please input password before sumbit</ErrorMessage>
    }
  }
  return (
    <FormContainer>
      {hasClicked && handleLoginFailed()}
      <label>
        UserName:
        <input
          id="username"
          name="username"
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          } }
         required />
      </label>
      {handleRequiredUserName(userName)}
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
          required/>
      </label>
      {handleRequiredPassword(password)}
      <br />
      <button onClick={handleLogin}>Submit</button>
    </FormContainer>
  );
}

export default LoginPage;