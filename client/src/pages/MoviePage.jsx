import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import movieImg from "../assets/51GA6V6VE1L._AC_UF1000,1000_QL80_.jpg";
import bigStar from "../assets/big-star.png";

export const Movie = () => {
  const movie = {
    id: 1,
    title: "Gladiator",
    director: "Ridley Scott",
    img: movieImg,
    year: "2000",
    rating: 0,
    genreId: 2,
    summary:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  };
  const genres = [
    { id: 1, name: "action" },
    { id: 2, name: "drama" },
    { id: 3, name: "fantastic" },
    { id: 4, name: "historical" },
    { id: 5, name: "horror" },
  ];

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={movie.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{movie.title}</h2>
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
              {movie.rating}
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
            <h3>
              {genres.filter((genre) => genre.id === movie.genreId)[0].name}
            </h3>
            <Button variant="outline-dark">Add to your list</Button>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">{movie.summary}</Row>
    </Container>
  );
};
