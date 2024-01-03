import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { createGenre } from "../../http/movieAPI";

export const CreateGenre = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  const addGenre = () => {
    createGenre({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add genre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Enter genre"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addGenre}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
