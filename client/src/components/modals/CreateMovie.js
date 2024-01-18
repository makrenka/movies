import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import uuid from "react-uuid";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

import { Context } from "../../index";
import { addGenres, createMovie, fetchGenres } from "../../http/movieAPI";

export const CreateMovie = observer(({ show, onHide }) => {
  const { movie } = useContext(Context);

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [file, setFile] = useState(null);
  const [year, setYear] = useState("");
  const [summary, setSummary] = useState("");
  const [genreId, setGenreId] = useState([]);

  const movieId = uuid();

  useEffect(() => {
    fetchGenres().then((data) => movie.setGenres(data));
  }, []);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addGenresForMovie = (genre) => {
    const formData = new FormData();
    formData.append("movieId", movieId);
    formData.append("genreId", genre);
    addGenres(formData);
  };

  const addMovie = () => {
    const formData = new FormData();
    formData.append("id", movieId);
    formData.append("title", title);
    formData.append("director", director);
    formData.append("img", file);
    formData.append("year", year);
    formData.append("summary", summary);
    createMovie(formData)
      .then((data) => genreId.forEach((i) => addGenresForMovie(i)))
      .then((data) => onHide(""));
  };

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown autoClose="outside">
            <Dropdown.Toggle>Select genre</Dropdown.Toggle>
            <Dropdown.Menu>
              {movie.genres.map((genre) => (
                <Form.Check
                  key={genre.id}
                  type="checkbox"
                  id={genre.name}
                  style={{ marginLeft: 25 }}
                >
                  <Form.Check.Input
                    type="checkbox"
                    style={{ cursor: "pointer" }}
                    onClick={() => setGenreId([...genreId, genre.id])}
                  />
                  <Form.Check.Label style={{ cursor: "pointer" }}>
                    {genre.name}
                  </Form.Check.Label>
                </Form.Check>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-3"
            placeholder="Enter movie title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter director name"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <Form.Control
            className="mt-3"
            placeholder="Enter year"
            type="number"
            min={1900}
            max={2024}
            step={1}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
          <Form.Control
            as="textarea"
            rows={5}
            className="mt-3"
            placeholder="Enter summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addMovie}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
