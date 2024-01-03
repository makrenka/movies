import { useContext, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { observer } from "mobx-react-lite";

import { Context } from "..";
import { GenresBar } from "../components/GenresBar";
import { MoviesList } from "../components/MoviesList";
import { fetchGenres, fetchMovies } from "../http/movieAPI";
import { Pages } from "../components/Pages";

export const Movies = observer(() => {
  const { movie } = useContext(Context);

  useEffect(() => {
    fetchGenres().then((data) => movie.setGenres(data));
    // fetchMovies(null, 1, 4).then((data) => {
    //   movie.setMovies(data.rows);
    //   movie.setTotalCount(data.count);
    // });
  }, []);

  useEffect(() => {
    fetchMovies(movie.selectedGenre.id, movie.page, 4).then((data) => {
      movie.setMovies(data.rows);
      movie.setTotalCount(data.count);
    });
  }, [movie.selectedGenre.id, movie.page]);

  return (
    <Container>
      <Row className="mt-2">
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
