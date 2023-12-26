import { Col, Container, Row } from "react-bootstrap";
import { GenresBar } from "./GenresBar";

export const Movies = () => {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <GenresBar />
        </Col>
        <Col md={9}>Movies</Col>
      </Row>
    </Container>
  );
};
