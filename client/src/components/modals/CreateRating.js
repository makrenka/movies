import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { createRating, fetchRating } from "../../http/ratingAPI";

export const CreateRating = ({ show, onHide, userId, movieId, setRating }) => {
  const [value, setValue] = useState(0);

  const addRating = () => {
    createRating({ rate: value, userId, movieId })
      .then(() => fetchRating(movieId).then((data) => setRating(data)))
      .finally(() => {
        setValue(0);
        onHide();
      });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rate this movie</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Range
            min="0"
            max="5"
            step="0.5"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            list="movierange"
          />
          <datalist
            id="movierange"
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              marginTop: -5,
              paddingLeft: 3,
              paddingRight: 3,
            }}
          >
            <option value="0" label="0"></option>
            <option value="0,5" label="0,5"></option>
            <option value="1" label="1"></option>
            <option value="1,5" label="1,5"></option>
            <option value="2" label="2"></option>
            <option value="2,5" label="2,5"></option>
            <option value="3" label="3"></option>
            <option value="3,5" label="3,5"></option>
            <option value="4" label="4"></option>
            <option value="4,5" label="4,5"></option>
            <option value="5" label="5"></option>
          </datalist>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={addRating}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
