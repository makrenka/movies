import { useContext } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { GenresBar } from "../components/GenresBar";
import { MoviesList } from "../components/MoviesList";
import { Pages } from "../components/Pages";
import { Context } from "..";

export const List = () => {
  const { movie } = useContext(Context);

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
