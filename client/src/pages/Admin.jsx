import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { CreateGenre } from "../components/modals/CreateGenre";
import { CreateMovie } from "../components/modals/CreateMovie";

export const Admin = () => {
  const [genreModalVisible, setGenreModalVisible] = useState(false);
  const [movieModalVisible, setMovieModalVisible] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant="outline-dark"
        className="mt-4 p-2"
        onClick={() => setMovieModalVisible(true)}
      >
        Add movie
      </Button>
      <Button
        variant="outline-dark"
        className="mt-4 p-2"
        onClick={() => setGenreModalVisible(true)}
      >
        Add genre
      </Button>
      <CreateGenre
        show={genreModalVisible}
        onHide={() => setGenreModalVisible(false)}
      />
      <CreateMovie
        show={movieModalVisible}
        onHide={() => setMovieModalVisible(false)}
      />
    </Container>
  );
};
