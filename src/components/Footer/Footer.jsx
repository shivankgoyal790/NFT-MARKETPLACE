import React from "react";
import { Container, Row, Col} from "reactstrap";
import "./footer.css";

import { Link } from "react-router-dom";

const COMPANY = [
  {
    display: "About",
    url: "#",
  },
  {
    display: "Career",
    url: "#",
  },
  {
    display: "Ranking",
    url: "#",
  },
  {
    display: "Contact Us",
    url: "/contact",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="6" sm="6" className="mb-4">
            <div className="logo">
              <h2 className=" d-flex gap-2 align-items-center ">
                <span>
                  <i className="ri-fire-fill"></i>
                </span>
                NFTs
              </h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate, quod repellat! Quis quos dolorum tenetur fuga?
                Aspernatur rerum quae amet.
              </p>
            </div>
          </Col>

          <Col lg="6" md="3" sm="6" className="mb-4 d-flex justify-content-evenly align-items-center">
              {COMPANY.map((item, index) => (
                <div key={index} className="list__item">
                  <Link to={item.url}> {item.display} </Link>
                </div>
              ))}

          </Col>

          <Col lg="3" md="6" sm="6" className="mb-4">
            <h5>Newsletter</h5>
            <input type="text" className="newsletter" placeholder="Email" />
            <div className="social__links d-flex gap-3 align-items-center ">
              <span>
                <Link to="#">
                  <i className="ri-facebook-line"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="ri-instagram-line"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="ri-twitter-line"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="ri-telegram-line"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="ri-discord-line"></i>
                </Link>
              </span>
            </div>
          </Col>

          <Col lg="12" className=" mt-4 text-center">
            <p className="copyright">
              Copyrights 2022, Developed by Shivank goyal, amar shukla and hardik agarwal.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
