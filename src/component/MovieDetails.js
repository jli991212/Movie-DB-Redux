import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getImgFullUrl } from "../helper";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../constant";
import Select from "react-select";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { movieSetRateAction } from "../Actions/MovieAction";
const MovieDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 16px;
`;

const ImgContainer = styled.div`
  width: 33.33%;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailsContainer = styled.div`
  flex-grow: 1;
  margin-left: 2rem;
`;

const SectionTitle = styled.h3`
  margin: 0.5rem 0;
`;

const Overview = styled.div`
  max-height: 100px;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GenreItem = styled.div`
  padding: 0.5rem 1rem;
  background-color: #90cea1;
  margin-left: 1rem;
  color: white;
  border-radius: 5px;
  &:first-child {
    margin-left: 0;
  }
`;

const ProductionItem = styled.div`
  width: 30px;
  margin-right: 1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export default function MovieDetails() {
  const [details, setDetails] = useState();
  const [voteRating, setVoteRating] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  const MovieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();
  const selectedOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" }
  ];

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${API}`
      )
      .then(
        (response) => {
          console.log("movie details", response);
          setDetails(response.data);
        },
        (error) => {}
      );
  }, []);
  if (!details) {
    return <div>Loading...</div>;
  }
  const handleChange = (vote) => {
    setVoteRating(vote.value);
    console.log("the vote is", vote.value);
  };
  const handleRate = (id) => {
    dispatch(movieSetRateAction(id, MovieState.sessionID, voteRating));
  };
  return (
    <MovieDetailsContainer>
      <ImgContainer>
        <img src={getImgFullUrl(details.poster_path)} alt={details.title} />
      </ImgContainer>
      <DetailsContainer>
        <h2>{details.title}</h2>
        <br />
        <SectionTitle>Overview</SectionTitle>
        <Overview>{details.overview}</Overview>
        <SectionTitle>Genres</SectionTitle>
        <Container>
          {details.genres.map((genre) => {
            return <GenreItem key={genre.id}>{genre.name}</GenreItem>;
          })}
        </Container>
        <SectionTitle>Rating</SectionTitle>
        <p>{details.vote_average}</p>
        <Container>
          <Select onChange={handleChange} options={selectedOptions} />
          <Button
            onClick={() => {
              handleRate(details.id);
            }}
          >
            rate it
          </Button>
        </Container>
        <SectionTitle>Production companies</SectionTitle>
        <Container>
          {details.production_companies.map((company) => {
            return (
              <ProductionItem key={company.id}>
                <img
                  src={getImgFullUrl(company.logo_path)}
                  alt={company.name}
                />
              </ProductionItem>
            );
          })}
        </Container>
        <Container>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            back to home
          </button>
        </Container>
      </DetailsContainer>
    </MovieDetailsContainer>
  );
}
