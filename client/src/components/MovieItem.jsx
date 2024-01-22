import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

import { MOVIE_PAGE_ROUTE } from "../utils/route-consts";
import { fetchUsers } from "../http/userAPI";
import { fetchList } from "../http/listAPI";
import { Context } from "..";

import star from "../assets/ant-design_star-outlined.png";

export const MovieItem = ({ movieItem }) => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const location = useLocation();

  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  useEffect(() => {
    token &&
      fetchUsers()
        .then((data) => user.setUser(data))
        .then((data) => {
          const authUser = user.user.filter((i) => i.id === decodedToken.id);
          fetchList(authUser[0].id).then((data) => setList(data));
        });
    setLoading(false);
  }, [token, user, decodedToken.id]);

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

  return (
    <Col
      md={4}
      onClick={() => navigate(MOVIE_PAGE_ROUTE + "/" + movieItem.id)}
      style={{ marginBottom: 30 }}
    >
      <Card
        style={{ width: 220, cursor: "pointer", position: "relative" }}
        border="light"
      >
        <Image
          width={220}
          height={326}
          src={process.env.REACT_APP_API_URL + movieItem.img}
        />
        {list &&
        list[0].movies.map((i) => i.id).includes(movieItem.id) &
          !location.pathname.includes("list") ? (
          <div
            style={{
              position: "absolute",
              background: "white",
              color: "red",
              top: 190,
              left: 65,
              width: 100,
              height: 40,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ marginBottom: 0 }}>In your list</p>
          </div>
        ) : null}

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
