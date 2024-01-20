import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { observer } from "mobx-react-lite";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { GenresBar } from "../components/GenresBar";
import { Pages } from "../components/Pages";
import { Context } from "..";
import { fetchGenres } from "../http/movieAPI";
import { fetchUsers } from "../http/userAPI";
import { fetchList } from "../http/listAPI";
import { MovieItem } from "../components/MovieItem";

export const List = observer(() => {
  const { movie } = useContext(Context);
  const { user } = useContext(Context);
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  useEffect(() => {
    fetchUsers()
      .then((data) => user.setUser(data))
      .then((data) => {
        const authUser = user.user.filter((i) => i.id === decodedToken.id);
        fetchList(authUser[0].id).then((data) => setList(data));
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchGenres().then((data) => movie.setGenres(data));
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  if (list) {
    const filteredMovies = list[0].movies.filter((i) =>
      i.genres.map((j) => j.name).includes(movie.selectedGenre.name)
    );

    return (
      <Container>
        <Row className="mt-4">
          <Col md={3}>
            <GenresBar />
          </Col>
          <Col md={9}>
            <h3 style={{ marginBottom: 40, textAlign: "center" }}>
              Your movies' list:
            </h3>
            {Boolean(list[0].movies.length) & !movie.selectedGenre.name ? (
              <>
                <Row>
                  {list[0].movies.map((movie) => (
                    <MovieItem key={movie.id} movieItem={movie} />
                  ))}
                </Row>
                <Pages />
              </>
            ) : filteredMovies.length ? (
              <Row>
                {filteredMovies.map((movie) => (
                  <MovieItem key={movie.id} movieItem={movie} />
                ))}
              </Row>
            ) : (
              <h4 style={{ textAlign: "center", color: "red" }}>
                Here's no movies yet
              </h4>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
});
