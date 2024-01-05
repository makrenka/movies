import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { ListGroup } from "react-bootstrap";

import { Context } from "..";

export const GenresBar = observer(() => {
  const { movie } = useContext(Context);

  return (
    <ListGroup>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        active={!movie.selectedGenre.id}
        onClick={() => movie.setSelectedGenre({})}
        variant="light"
      >
        All movies
      </ListGroup.Item>
      {movie.genres.map((genre) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={genre.id === movie.selectedGenre.id}
          onClick={() => movie.setSelectedGenre(genre)}
          key={genre.id}
          variant="light"
        >
          {genre.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});
