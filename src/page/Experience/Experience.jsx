import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import {
  Badge,
  Button,
  Container,
  Form,
  Modal,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faMailBulk,
  faMailForward,
  faMailReply,
  faPen,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Experience.css";
import { setUserData } from "../../App/features/Login/Actions";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import Footer from "../../Component/Footer";
import logolk from "../../Component/lk.png"

const Experience = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToProfile = () => {
    navigate("/Profilepage");
  };
  const goToContact = () => {
    navigate("/Contactpage");
  };
  const goToHome = () => {
    navigate("/Homepage");
  };
  const goToLogout = () => {
    navigate("/Logoutpage");
  };
  const goToTambahloker = () => {
    navigate("/Tambahloker");
  };

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  const [user, setUser] = useState({
    name: "",
  });

  const [exp, setExp] = useState({
    name: "",
    position: "",
    waktu: "",
    jenis: "",
  });
  const [skill, setSkill] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetch();
  }, []);

  const fetchProfile = (formData) => {
    const token = localStorage.getItem("token");
    fetch(`https://lagi-kerja-production.up.railway.app/auth/me`, {
      method: "GET",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        console.log(data);
      });
  };

  //   const fetchGetSkill = () => {
  //     // const payload = {...user}
  //     // payload.languages = payload.languages.join (",")
  //     console.log(user);
  //     fetch(`https://lagi-kerja-production.up.railway.app/api/skill`, {
  //       method: "GET",
  //       // body: JSON.stringify(payload),
  //       headers: { "Content-Type": "application/json;charset=utf-8" },
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         dispatch(setUserData({ user: data?.user, token: data?.token }));

  //         createItem(data);
  //         setSkill(data);
  //         console.log(data);
  //       });
  //   };

  // masuk database
  const fetchExperience = () => {
    const token = localStorage.getItem("token");
    const payload = { ...user };
    // payload.languages = payload.languages.join (",")
    fetch(`https://lagi-kerja-production.up.railway.app/api/experience`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setUserData({ user: data?.user, token: data?.token }));

        createItem(data);
        console.log(data);
      });
  };

  const createItem = (data) => {
    localStorage.setItem("userData", JSON.stringify(data?.user));
    localStorage.setItem("token", data?.token);
  };

  const onChangeHandler = (event) => {
    console.log(event);
    if (event.target.name === "languages") {
      let copy = { ...user };

      if (event.target.checked) {
        copy.languages.push(event.target.value);
      } else {
        copy.languages = copy.languages.filter(
          (el) => el !== event.target.value
        );
      }

      setUser(copy);
    } else {
      setUser(() => ({
        ...user,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetchExperience();
    // console.log(user);
    swal({
      title: "Informasi sudah ditambahkan",
      text: "Terimakasih",
      icon: "success",
      button: false,
      timer: 2000,
    });
  };

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
                  value="Part time"
                >
                  Part time
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
              </select>
            </Nav>
            <Nav className="d-flex">
              <Nav.Link active>
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
              <Nav.Link onClick={() => goToHome()}>Home</Nav.Link>
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

      {/*---------------------------------------------------------*/}

      <div className="atur-box">
        <Card
          style={{
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            width: "100%",
          }}
          className="card-experienceatas"
        >
          <Card.Header className="header-profile">
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link onClick={() => goToProfile()} href="#first">
                  Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                {/* <Nav.Link
                  style={{ color: "white" }}
                  onClick={() => goToLogout()}
                >
                  Log Out
                </Nav.Link> */}
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body className="card-profilecenter">
            <Form onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="d-grid">
                  <strong>Tambahkan pengalaman kerja</strong>
                  <span className="note-text">*masukan pengalaman kerja</span>
                </Form.Label>
                <Form.Label>Nama Perusahaan</Form.Label>
                <div style={{ display: "flex" }}>
                  <Form.Control
                    onChange={onChangeHandler}
                    value={user.name}
                    type="text"
                    name="name"
                    placeholder="nama perusahaan..."
                  />
                </div>
                <Form.Label>Posisi</Form.Label>
                <div style={{ display: "flex" }}>
                  <Form.Control
                    onChange={onChangeHandler}
                    value={user.position}
                    type="text"
                    name="position"
                    placeholder="posisi..."
                  />
                </div>
                <Form.Label>Jenis</Form.Label>
                <div>
                  <Form.Control
                    onChange={onChangeHandler}
                    value={user.jenis}
                    type="text"
                    name="jenis"
                    placeholder="jenis pekerjaan(ex: full time | intership | hybrid)..."
                  />
                </div>
                <Form.Label>Lama kerja</Form.Label>
                <div>
                  <Form.Control
                    onChange={onChangeHandler}
                    value={user.waktu}
                    type="text"
                    name="waktu"
                    placeholder="lama kerja..."
                  />
                  <br />
                  <Button className="btn-saveexp" type="submit">
                    Simpan
                  </Button>
                </div>
              </Form.Group>
              <Button onClick={() => goToProfile()} className="btn-backprofile">
                Lihat Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/*---------------------------------------------------------*/}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Experience;
