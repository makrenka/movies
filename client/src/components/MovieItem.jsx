import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import { MOVIE_PAGE_ROUTE } from "../utils/route-consts";
import { Context } from "..";

import star from "../assets/ant-design_star-outlined.png";

export const MovieItem = ({ movieItem }) => {
  const navigate = useNavigate();

  return (
    <Col
      md={4}
      onClick={() => navigate(MOVIE_PAGE_ROUTE + "/" + movieItem.id)}
      style={{ marginBottom: 30 }}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border="light">
        <Image
          width={220}
          height={326}
          src={process.env.REACT_APP_API_URL + movieItem.img}
        />
        <div className="d-flex flex-column justify-content-between align-items-start mt-2">
          <h6 className="mb-0">{movieItem.title}</h6>
          <p className="mb-0">
            {movieItem.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="mb-0">{movieItem.year} year</p>
          <div className="d-flex align-items-center">
            <p className="mb-0 me-2">{movieItem.rating}</p>
            <Image width={20} height={20} src={star} />
          </div>
        </div>
      </Card>
    </Col>
  );
};
