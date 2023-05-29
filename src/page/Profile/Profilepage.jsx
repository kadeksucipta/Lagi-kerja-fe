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
  faBucket,
  faDumpster,
  faEnvelope,
  faMailBulk,
  faMailForward,
  faMailReply,
  faPen,
  faPlus,
  faRemove,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Profilepage.css";
import { setUserData } from "../../App/features/Login/Actions";
import { useDispatch } from "react-redux";
import foto from "./user.png";
import Table from "react-bootstrap/Table";
import { faBitbucket } from "@fortawesome/free-brands-svg-icons";
import Footer from "../../Component/Footer";
import logolk from "../../Component/lk.png"
import Pdf from "../../Component/Pdfview/Pdf";
import swal from "sweetalert";

const Profilepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToProfile = () => {
    navigate("/Profile");
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
  const goToTambahskill = () => {
    navigate("/Tambahskill");
  };
  const goToTambahriwayat = () => {
    navigate("/Tambahriwayat");
  };
  const goToBasicinfo = () => {
    navigate("/Basicinfo");
  };
  const goToExperience = () => {
    navigate("/Experience");
  };
  const goToEducation = () => {
    navigate("/Education");
  };

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  const [user, setUser] = useState({
    name: "",
  });
  const [skill, setSkill] = useState([]);
  const [about, setAbout] = useState([]);
  const [info, setInfo] = useState([]);
  const [exp, setExp] = useState([]);
  const [edu, setEdu] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    fetchProfile();
    fetchGetSkill();
    fetchGetAbout();
    fetchGetInfo();
    fetchGetExp();
    fetchGetEdu();
  }, []);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert(URL.createObjectURL(selectedImage));
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const fetchProfile = (formData) => {
    const token = localStorage.getItem("token");
    fetch(`https://lagi-kerja-production.up.railway.app/auth/me`, {
      method: "GET",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        console.log(data);
      });
  };

  // PANGGIL DATA SKILL
  const fetchGetSkill = () => {
    // const payload = {...user}
    // payload.languages = payload.languages.join (",")
    console.log(user);
    fetch(`https://lagi-kerja-production.up.railway.app/api/skill`, {
      method: "GET",
      // body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setUserData({ user: data?.user, token: data?.token }));

        createItem(data);
        setSkill(data);
        console.log(data);
      });
  };

  // PANGGIL DATA ABOUT ME
  const fetchGetAbout = () => {
    // const payload = {...user}
    // payload.languages = payload.languages.join (",")
    console.log(user);
    fetch(`https://lagi-kerja-production.up.railway.app/api/about`, {
      method: "GET",
      // body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setUserData({ user: data?.user, token: data?.token }));

        createItem(data);
        setAbout(data);
        console.log(data);
      });
  };

  // PANGGIL DATA BASIC INFO
  const fetchGetInfo = () => {
    // const payload = {...user}
    // payload.languages = payload.languages.join (",")
    console.log(user);
    fetch(`https://lagi-kerja-production.up.railway.app/api/info`, {
      method: "GET",
      // body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setUserData({ user: data?.user, token: data?.token }));

        createItem(data);
        setInfo(data);
        console.log(data);
      });
  };

  // PANGGIL DATA EXPERIENCE
  const fetchGetExp = () => {
    // const payload = {...user}
    // payload.languages = payload.languages.join (",")
    console.log(user);
    fetch(`https://lagi-kerja-production.up.railway.app/api/experience`, {
      method: "GET",
      // body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setUserData({ user: data?.user, token: data?.token }));

        createItem(data);
        setExp(data);
        console.log(data);
      });
  };

  // PANGGIL DATA EDUCATION
  const fetchGetEdu = () => {
    // const payload = {...user}
    // payload.languages = payload.languages.join (",")
    console.log(user);
    fetch(`https://lagi-kerja-production.up.railway.app/api/education`, {
      method: "GET",
      // body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setUserData({ user: data?.user, token: data?.token }));

        createItem(data);
        setEdu(data);
        console.log(data);
      });
  };

  // masuk database
  const fetchSkill = () => {
    const token = localStorage.getItem("token");
    const payload = { ...user };
    // payload.languages = payload.languages.join (",")
    fetch(`https://lagi-kerja-production.up.railway.app/api/skill`, {
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
    fetchSkill();
    // console.log(user);
  };

  const handleSave = () => {
    swal({
      title: "Profile disimpan",
      text: "Terimakasih.",
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
              <Nav.Link onClick={() => goToTambahloker()}>
                <FontAwesomeIcon icon={faPlus} />
              </Nav.Link>
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
          }}
          className="card-profileatas"
        >
          <Card.Header className="header-profile">
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link onClick={() => goToProfile()} href="#first">
                  Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  style={{ color: "white" }}
                  onClick={() => goToLogout()}
                >
                  Log Out
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body className="card-profilecenter">
            <div className="box-1">
            <div style={{ display: "flex", justifyContent: "center" }}>
              {selectedImage && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    style={{
                      maxWidth: "100%",
                      borderRadius: "50%",
                      justifyContent: "center",
                      maxHeight: "180px",
                    }}
                    alt="Thumb"
                  />
                </div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={removeSelectedImage}
                style={{
                  justifyContent: "center",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon style={{ fontSize: "18px" }} icon={faRemove} />
              </button>
            </div>
            <div className="parent-imgprofile">
              <form onSubmit={onSubmit} className="form-inline">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    type="file"
                    style={{
                      color: "transparent",
                      maxWidth: "100%",
                      marginLeft: "33%",
                      marginTop: "10px",
                    }}
                    onChange={imageChange}
                    accept="image/*"
                  />
                </div>
                <span
                  style={{
                    fontStyle: "italic",
                    color: "red",
                    fontSize: "12px",
                    marginLeft: "20%",
                  }}
                >
                  *masukan foto dengan ukuran 1:1
                </span>
              </form>
            </div>

            <Card.Text className="isi">{profile.full_name}</Card.Text>
            <Card.Text className="isi">{profile.email}</Card.Text>
            <Form.Label>
              <strong>About me</strong>
              <FontAwesomeIcon
                onClick={() => goToTambahriwayat()}
                style={{ marginLeft: "10px", cursor: "pointer" }}
                icon={faPen}
              />
            </Form.Label>
            {about.map((item, index) => (
              <div key={index}>
                <Card.Text className="isi">{item.name}</Card.Text>
              </div>
            ))}
            <Form onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  <strong>Skill</strong>
                  <FontAwesomeIcon
                    onClick={() => goToTambahskill()}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    icon={faPen}
                  />
                </Form.Label>
              </Form.Group>
              <div className="skill">
                {skill?.map((item, index) => (
                  <div key={index}>
                    <Button className="btn-skill" type="reset">
                      {item.name}
                    </Button>
                  </div>
                ))}
              </div>
            </Form>

            <Button onClick={() => handleSave()} type="submit" className="btn-save">
              Simpan
            </Button>
            </div>
          </Card.Body>
        </Card>

        {/*---------------------------------------------------------*/}

        {/* <div className="child-card"> */}
        <Card
          style={{
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
          className="card-bio"
        >
          <Card.Body className="card-profilecenter">
            <Card.Title>
              <strong>Data Pribadi</strong>
              <FontAwesomeIcon
                onClick={() => goToBasicinfo()}
                style={{ marginLeft: "10px", cursor: "pointer" }}
                icon={faPen}
              />
            </Card.Title>
              {info.map((item, index) => (
                 <div key={index}>
                 <Card.Text>USIA : {item.usia}</Card.Text>
                 <Card.Text>PHONE : {item.hp}</Card.Text>
                 <Card.Text>EMAIL : {item.email}</Card.Text>
               </div>
              ))}
              {/* <hr /> */}
            {/* <Pdf /> */}
            <hr />
            <Card.Title>
              <strong>Work Experience</strong>
              <FontAwesomeIcon
                onClick={() => goToExperience()}
                style={{ marginLeft: "10px", cursor: "pointer" }}
                icon={faPen}
              />
            </Card.Title>
            {exp.map((item, index) => (
              <div key={index}>
                <Card.Text>Nama perusahaan : {item.name}</Card.Text>
                <Card.Text>Posisi : {item.position}</Card.Text>
                <Card.Text>Jenis : {item.jenis}</Card.Text>
                <Card.Text>Waktu : {item.waktu}</Card.Text>
              </div>
            ))}
            <hr />
            <Card.Title>
              <strong>Education</strong>
              <FontAwesomeIcon
                onClick={() => goToEducation()}
                style={{ marginLeft: "10px", cursor: "pointer" }}
                icon={faPen}
              />
            </Card.Title>
            {edu.map((item, index) => (
              <div>
                <Form.Label>Nama sekolah : {item.name}</Form.Label>
                <Card.Text>Jurusan : {item.jurusan}</Card.Text>
                <Card.Text>Waktu : {item.waktu}</Card.Text>
              </div>
            ))}
          </Card.Body>
          <Card.Footer className="footer-profile">Hello User !</Card.Footer>

        </Card>
      </div>
      {/* </div> */}

      <Footer />
    </React.Fragment>
  );
};

export default Profilepage;
