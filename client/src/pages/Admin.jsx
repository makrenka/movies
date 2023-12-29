import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export const Admin = () => {
  return (
    <Container className="d-flex flex-column">
      <Button variant="outline-dark" className="mt-2">
        Add movie
      </Button>
      <Button variant="outline-dark" className="mt-2">
        Add genre
      </Button>
    </Container>
  );
};
