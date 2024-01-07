import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { fetchGenres, fetchOneMovie } from "../http/movieAPI";
import { Context } from "..";

import bigStar from "../assets/big-star.png";

export const Movie = () => {
  const [movieInfo, setMovieInfo] = useState({ info: [] });
  const { id } = useParams();
  const { movie } = useContext(Context);

  useEffect(() => {
    fetchOneMovie(id).then((data) => setMovieInfo(data));
  }, []);

  useEffect(() => {
    fetchGenres().then((data) => movie.setGenres(data));
  }, []);
  console.log();

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + movieInfo.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{movieInfo.title}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {movieInfo.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>
              {
                movie.genres.filter(
                  (genre) => genre.id === movieInfo.genreId
                )[0].name
              }
            </h3>
            <Button variant="outline-dark">Add to your list</Button>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">{movieInfo.summary}</Row>
    </Container>
  );
};
