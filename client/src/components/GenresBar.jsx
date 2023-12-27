import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { ListGroup } from "react-bootstrap";

import { Context } from "..";

export const GenresBar = observer(() => {
  const { movie } = useContext(Context);

  return (
    <ListGroup>
      {movie.genres.map((genre) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={genre.id === movie.selectedGenre.id}
          onClick={() => movie.setSelectedGenre(genre)}
          key={genre.id}
        >
          {genre.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});
