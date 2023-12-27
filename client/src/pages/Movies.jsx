import { Col, Container, Row } from "react-bootstrap";
import { GenresBar } from "../components/GenresBar";
import { MoviesList } from "../components/MoviesList";

export const Movies = () => {
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
};
