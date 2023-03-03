import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Tabs from "./Tabs";
import Login from "./Login";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Tabs />
      <Login />
    </HeaderContainer>
  );
}
