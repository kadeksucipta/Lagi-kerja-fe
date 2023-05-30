import {
  faBell,
  faLocation,
  faLocationCrosshairs,
  faLocationDot,
  faPlus,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Homepage.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Badge, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Footer from "../../Component/Footer";
import logolk from "../../Component/lk.png"
import bingung from "../../Component/bingung.png"
import Loader from "../../Component/Loader/Loader";
import { numberWithCommas } from "../../Component/Utils";

const Homegpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToTambahloker = () => {
    navigate("/Tambahloker");
  };
  const goToContact = () => {
    navigate("/Contactpage");
  };
  const goToProfile = () => {
    navigate("/Profilepage");
  };

  // GO DETAIL LOKER
  const goToDetaildesain = () => {
    navigate("/Desain");
  };

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [select, setSelect] = useState([]);
  const [tags, setTags] = useState([]);
  const [payload, setPayload] = useState([]);
  const { user } = useSelector((state) => state.login);
  const [loading, setLoading] = useState(false);

  // detail
  const [desain, setDesain] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchTags();
  }, []);

  const fetchProducts = () => {
    fetch(`https://lagi-kerja-production.up.railway.app/api/products?q=${keyword}&skip=0&limit=50`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data);
      });
  };

  const handleClick = (category) => {
    setSelect(category);
    fetch(`https://lagi-kerja-production.up.railway.app/api/products?limit=50&category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data);
      });
  };

  const fetchTags = () => {
    fetch(`https://lagi-kerja-production.up.railway.app/api/tags`)
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
        console.log(data);
      });
  };

  const handleTags = (tags) => {
    fetch(`https://lagi-kerja-production.up.railway.app/api/products?limit=50&tags=${tags}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data);
      });
  };

  const apply = () => {
    // const token = localStorage.getItem("token");
    // fetch(`https://lagi-kerja-production.up.railway.app/delivery-addresses`, {
    //   method: "POST",
    //   body: JSON.stringify(payload),

    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });
    swal({
      title: "Lamaran Anda sudah direspon",
      text: "Mohon tunggu konfirmasi selanjutnya dari HRD.",
      icon: "success",
      button: false,
      timer: 2000,
    });
  };

  const searchHandler = (query) => {
    setKeyword(query);
  };

  const requestButton = () => {
    setLoading(true);
    fetchProducts();
  };

  const handleDesain = () => {
    const token = localStorage.getItem("token");
    fetch(`https://lagi-kerja-production.up.railway.app/api/desain`, {
      method: "POST",
      body: JSON.stringify(payload),

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDesain(data.data);
        console.log(data);
        goToDetaildesain()
      });
  }

  return (
    <React.Fragment>
      <Navbar className="nav-portal" expand="lg">
        <Container>
          <Navbar.Brand href="#">
          <img
              src={logolk}
              width="35"
              height="30"
              alt="React Bootstrap logo"
            />
            Lagi<strong>Kerja</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <select
                style={{
                  borderRadius: "4px",
                  background: "white",
                  color: "black",
                  border: "none",
                  width: "78%"
                }}
                onChange={(e) => {
                  handleClick(e.target.value);
                }}
                title="Category"
                id="navbarScrollingDropdown"
              >
                <option
                  style={{ background: "white", color: "black" }}
                  value="Semua Pekerjaan"
                >
                  Semua Pekerjaan
                </option>
                <NavDropdown.Divider />
                <option
                  style={{ background: "white", color: "black" }}
                  value="WFH"
                >
                  WFH
                </option>
                <NavDropdown.Divider />
                <option
                  style={{ background: "white", color: "black" }}
                  value="Full time"
                >
                  Full time
                </option>
                <NavDropdown.Divider />
                <option
                  style={{ background: "white", color: "black" }}
                  value="Remote"
                >
                  Remote
                </option>
                <NavDropdown.Divider />
                <option
                  style={{ background: "white", color: "black" }}
                  value="Internship"
                >
                  Internship
                </option>
              </select>
            </Nav>
            <Nav className="d-flex">
              <Nav.Link onClick={() => goToProfile()}>
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
              {/* <Nav.Link active>Home</Nav.Link> */}
              <Nav.Link>
                <FontAwesomeIcon icon={faBell} />
                <Badge pill bg="danger">
                  0
                </Badge>
              </Nav.Link>
              {/* <Nav.Link onClick={() => goToTambahloker()}>
                <FontAwesomeIcon icon={faPlus} />
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="box-home">
        <h1 style={{ textAlign: "center" }}>
          <strong>TEMUKAN PEKERJAAN SESUAI FASHIONMU !</strong>
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            onChange={(e) => searchHandler(e.target.value)}
            className="search-home"
            type="search"
            aria-label="Search"
            placeholder="Cari pekerjaan... (awali dengan huruf kapital)"
          />
          <button
            onClick={() => requestButton()}
            style={{ height: "30px", width: "40px", border: "none" }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="tag-job-atas">
          {tags?.map((item, index) => (
            <button
              key={index}
              value={tags}
              className="button-job-atas"
              onClick={() => handleTags(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <Container>
        <div className="container-job">
          <div className="job-card">
            {products.length === 0 && (
              <span
                style={{
                  marginTop: "30px"
                }}
              >
                <img className="bingung" src={bingung} alt="" />
              </span>
            )}
            {loading ? <Loader /> : ""}
            {products?.map((item, index) => (
              <Card
                className="card-job"
                key={index}
                style={{
                  marginBottom: "20px",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                }}
              >
                <Card.Img
                  variant="top"
                  src={"https://lagi-kerja-production.up.railway.app/images/" + item.image_url}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.jenis}</Card.Text>
                  <Card.Text>
                    <FontAwesomeIcon icon={faLocationDot} /> {item.location}
                  </Card.Text>
                  <Card.Text>{item?.category?.name}</Card.Text>
                  <hr />
                  <Card.Title>Description</Card.Title>
                  <Card.Text>{item?.description}</Card.Text>
                  <hr />
                  <Card.Title>Qualifications</Card.Title>
                  <Card.Text>{item?.kualifikasi}</Card.Text>
                  <hr />
                  <Card.Text><strong>Rp.{numberWithCommas(item.price)}</strong></Card.Text>
                  {item?.tags?.map((value, index) => (
                    <Button
                      style={{
                        background: "white",
                        border: "2px solid #A5A6F6",
                        color: "#A5A6F6",
                      }}
                      key={index}
                      className="tag-job"
                    >
                      {value.name}
                    </Button>
                  ))}
                  <Button
                    style={{marginTop: "10px"}}
                    className="detail-btn"
                    onClick={() => apply()}
                  >
                    Lamar sekarang
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      <Footer />
    </React.Fragment>
  );
};

export default Homegpage;
