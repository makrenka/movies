import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { fetchGenres, fetchOneMovie } from "../http/movieAPI";
import { Context } from "..";
import { addMovie, fetchList } from "../http/listAPI";
import { fetchUsers } from "../http/userAPI";

import bigStar from "../assets/big-star.png";

export const Movie = () => {
  const [movieInfo, setMovieInfo] = useState({ info: [] });
  const [loading, setLoading] = useState(true);
  const [listId, setListId] = useState(null);
  const { id } = useParams();
  const { movie } = useContext(Context);
  const { user } = useContext(Context);

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  useEffect(() => {
    fetchOneMovie(id)
      .then((data) => setMovieInfo(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchGenres()
      .then((data) => movie.setGenres(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchUsers()
      .then((data) => user.setUser(data))
      .then((data) => {
        const authUser = user.user.filter((i) => i.id === decodedToken.id);
        const authUserId = authUser[0].id;
        fetchList(authUserId).then((data) => setListId(data[0].id));
      });
  }, [user]);

  const addMovieToList = () => {
    const formData = new FormData();
    formData.append("listId", listId);
    formData.append("movieId", movieInfo.id);
    addMovie(formData);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={220}
            height={326}
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
            <div>
              <h4>Genre:</h4>
              <p style={{ fontSize: 20 }}>
                {movieInfo.genres?.map((genre) => genre.name).join(", ")}
              </p>
            </div>
            <Button variant="outline-dark" onClick={addMovieToList}>
              Add to your list
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <h3>Summary</h3>
        {movieInfo.summary}
      </Row>
    </Container>
  );
};
