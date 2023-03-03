import React from "react";
import styled from "styled-components";
import Tab from "./Tab";
import { TABS } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { movieSetActiveTabAction } from "../Actions/MovieAction";
import { Link } from "react-router-dom";
const TabsContainer = styled.ul`
  display: flex;
`;

export default function Tabs(props) {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();
  const tabs = Object.values(TABS);

  return (
    <TabsContainer>
      {tabs.map((tab) => {
        const navgate =
          tab === "HOME" ? "/" : tab === "LIKED" ? "/Favorite" : "/Rated";
        return (
          <Link key={tab} to={navgate} style={{ textDecoration: "none" }}>
            <Tab
              key={tab}
              active={movieState.activeTab === tab}
              onClick={() => {
                dispatch(movieSetActiveTabAction(tab));
              }}
            >
              {tab}
            </Tab>
          </Link>
        );
      })}
    </TabsContainer>
  );
}
