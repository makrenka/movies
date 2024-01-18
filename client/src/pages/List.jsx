import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { GenresBar } from "../components/GenresBar";
import { MoviesList } from "../components/MoviesList";
import { Pages } from "../components/Pages";
import { Context } from "..";
import { fetchGenres, fetchMovies } from "../http/movieAPI";
import { fetchUsers } from "../http/userAPI";

export const List = () => {
  const { movie } = useContext(Context);
  const { user } = useContext(Context);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  useEffect(() => {
    fetchUsers()
      .then((data) => user.setUser(data))
      .then((data) => {
        const authUser = user.user.filter((i) => i.id === decodedToken.id);
        return setUserId(authUser[0].id);
      });
  }, []);

  useEffect(() => {
    fetchGenres().then((data) => movie.setGenres(data));
  }, []);

  useEffect(() => {
    fetchMovies(movie.selectedGenre.id, movie.page, 9)
      .then((data) => {
        movie.setMovies(data.rows);
        movie.setTotalCount(data.count);
      })
      .finally(() => setLoading(false));
  }, [movie.selectedGenre.id, movie.page]);

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
    <Container>
      <Row className="mt-4">
        <Col md={3}>
          <GenresBar />
        </Col>
        <Col md={9}>
          {movie.movies.length ? (
            <>
              <MoviesList />
              <Pages />
            </>
          ) : (
            <h3 style={{ textAlign: "center" }}>Here's no movies yet</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
};
