import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { observer } from "mobx-react-lite";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { fetchGenres, fetchOneMovie } from "../http/movieAPI";
import { Context } from "..";
import { addMovie, deleteMovie, fetchList } from "../http/listAPI";
import { fetchUsers } from "../http/userAPI";

import bigStar from "../assets/big-star.png";
import { CreateRating } from "../components/modals/CreateRating";
import { fetchRating } from "../http/ratingAPI";

export const Movie = observer(() => {
  const [movieInfo, setMovieInfo] = useState({ info: [] });
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(null);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(null);

  const { id } = useParams();
  const { movie } = useContext(Context);

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  useEffect(() => {
    fetchOneMovie(id)
      .then((data) => {
        setMovieInfo(data);
        fetchRating(data.id).then((data) => setRating(data));
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetchGenres()
      .then((data) => movie.setGenres(data))
      .finally(() => setLoading(false));
  }, [movie]);

  useEffect(() => {
    token && fetchList(decodedToken.id).then((data) => setList(data));
  }, [token]);

  const addMovieToList = () => {
    const formData = new FormData();
    formData.append("listId", list[0].id);
    formData.append("movieId", movieInfo.id);
    addMovie(formData)
      .then(() => setLoading(true))
      .then(() => fetchList(decodedToken.id).then((data) => setList(data)))
      .finally(() => setLoading(false));
  };

  const deleteMovieFromList = () => {
    const formData = new FormData();
    formData.append("listId", list[0].id);
    formData.append("movieId", movieInfo.id);
    deleteMovie(formData)
      .then(() => setLoading(true))
      .then(() => fetchList(decodedToken.id).then((data) => setList(data)))
      .finally(() => setLoading(false));
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

  const userRating = rating?.rows.filter((i) => i.userId === decodedToken?.id);
  const ratingMovie = (
    rating?.rows.reduce((acc, i) => acc + i.rate, 0) / rating?.count
  ).toFixed(1);

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
                fontSize: 42,
              }}
            >
              {ratingMovie}
            </div>
            {token ? (
              userRating?.length ? (
                <p
                  style={{
                    textAlign: "center",
                    marginBottom: 0,
                    marginTop: 15,
                    fontSize: 22,
                  }}
                >
                  Your rating: {userRating[0].rate}
                </p>
              ) : (
                <Button
                  onClick={() => setRatingModalVisible(true)}
                  style={{ width: 250, marginTop: 15 }}
                >
                  Rate this movie
                </Button>
              )
            ) : null}
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
            {token ? (
              list && list[0].movies.map((i) => i.id).includes(movieInfo.id) ? (
                <Button variant="outline-danger" onClick={deleteMovieFromList}>
                  Delete from your list
                </Button>
              ) : (
                <Button variant="outline-dark" onClick={addMovieToList}>
                  Add to your list
                </Button>
              )
            ) : null}
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <h3>Summary</h3>
        {movieInfo.summary}
      </Row>
      <CreateRating
        show={ratingModalVisible}
        onHide={() => setRatingModalVisible(false)}
        userId={decodedToken?.id}
        movieId={movieInfo.id}
        setRating={setRating}
      />
    </Container>
  );
});
