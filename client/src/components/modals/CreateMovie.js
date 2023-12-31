import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

import { Context } from "../../index";

export const CreateMovie = ({ show, onHide }) => {
  const { movie } = useContext(Context);

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>Select genre</Dropdown.Toggle>
            <Dropdown.Menu>
              {movie.genres.map((genre) => (
                <Dropdown.Item key={genre.id}>{genre.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control className="mt-3" placeholder="Enter movie title" />
          <Form.Control className="mt-3" placeholder="Enter director name" />
          <Form.Control className="mt-3" type="file" />
          <Form.Control
            className="mt-3"
            placeholder="Enter year"
            type="number"
            min={1900}
            max={2024}
            step={1}
          />
          <Form.Control
            as="textarea"
            rows={5}
            className="mt-3"
            placeholder="Enter summary"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={onHide}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
