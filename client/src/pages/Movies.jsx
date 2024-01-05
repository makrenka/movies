import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { Context } from "..";
import { GenresBar } from "../components/GenresBar";
import { MoviesList } from "../components/MoviesList";
import { fetchGenres, fetchMovies } from "../http/movieAPI";
import { Pages } from "../components/Pages";

export const Movies = observer(() => {
  const { movie } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenres().then((data) => movie.setGenres(data));
  }, []);

  useEffect(() => {
    fetchMovies(movie.selectedGenre.id, movie.page, 4)
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
          <MoviesList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});
