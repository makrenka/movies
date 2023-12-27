import { useNavigate } from "react-router-dom";

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import { MOVIE_PAGE_ROUTE } from "../utils/route-consts";

import star from "../assets/ant-design_star-outlined.png";

export const MovieItem = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => navigate(MOVIE_PAGE_ROUTE + "/" + movie.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border="light">
        <Image width={150} height={150} src={movie.img} />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div>Gladiator...</div>
          <div className="d-flex align-items-center">
            <div>{movie.rating}</div>
            <Image width={20} height={20} src={star} />
          </div>
        </div>
      </Card>
    </Col>
  );
};
