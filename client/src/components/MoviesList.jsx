import { useContext } from "react";

import { observer } from "mobx-react-lite";
import Row from "react-bootstrap/Row";

import { Context } from "..";
import { MovieItem } from "./MovieItem";

export const MoviesList = observer(() => {
  const { movie } = useContext(Context);

  return (
    <Row>
      {movie.movies.map((movie) => (
        <MovieItem key={movie.id} movieItem={movie} />
      ))}
    </Row>
  );
});
