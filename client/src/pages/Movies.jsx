import { useContext, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { observer } from "mobx-react-lite";

import { Context } from "..";
import { GenresBar } from "../components/GenresBar";
import { MoviesList } from "../components/MoviesList";
import { fetchGenres, fetchMovies } from "../http/movieAPI";

export const Movies = observer(() => {
  const { movie } = useContext(Context);

  useEffect(() => {
    fetchGenres().then((data) => movie.setGenres(data));
    fetchMovies().then((data) => movie.setMovies(data.rows));
  }, []);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <GenresBar />
        </Col>
        <Col md={9}>
          <MoviesList />
        </Col>
      </Row>
    </Container>
  );
});
