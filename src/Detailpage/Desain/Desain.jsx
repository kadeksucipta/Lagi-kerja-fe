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
  faCircleDot,
  faDotCircle,
  faEnvelope,
  faLocation,
  faLocationDot,
  faMailBulk,
  faMailForward,
  faMailReply,
  faPen,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Desain.css";
import { setUserData } from "../../App/features/Login/Actions";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Footer from "../../Component/Footer";
import logolk from "../../Component/lk.png";
import { setNotice } from "../../App/features/Notice/Actions";
import { numberWithCommas } from "../../Component/Utils";

const Desain = () => {
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
  const goToNotice = () => {
    navigate("/Notice");
  };

  const [desain, setDesain] = useState([]);
  const [tags, setTags] = useState([]);
  const notice = useSelector((state) => state.notice);

  useEffect(() => {
    fetchDesain();
    fetchNotice();
  }, []);

  const fetchDesain = () => {
    fetch(`https://lagi-kerja-production.up.railway.app/api/desain`)
      .then((res) => res.json())
      .then((data) => {
        setDesain(data.data);
        console.log(data);
      });
  };

  // ADD TO NOTICE
  const addtoNotice = (item) => {
    const token = localStorage.getItem("token");
    let userData = localStorage.getItem("userData");
    let oldNotice = notice.map((item) => ({ ...item.product, qty: item.qty }));
    let existingItemIndex = oldNotice.findIndex(
      (noticeItem) => noticeItem._id === item._id
    );
    let items;
    if (existingItemIndex >= 0) {
      oldNotice[existingItemIndex] = {
        ...oldNotice[existingItemIndex],
        qty: oldNotice[existingItemIndex].qty + 1,
      };
      items = oldNotice;
    } else {
      items = [...oldNotice, { ...item, qty: 1 }];
    }
    console.log("oldNotice :", oldNotice);
    console.log("notice: ", notice);
    console.log("itemsss :", items);

    fetch(`https://lagi-kerja-production.up.railway.app/api/notices`, {
      method: "PUT",
      body: JSON.stringify({
        user: (userData),
        items,
      }),

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log({ response });
      if (response.status === 200) {
        fetchNotice();
        swal({
          title: "Lamara Terkirim",
          text: "Mohon tunggu konfirmasi selanjutnya dari kami.",
          icon: "success",
          button: false,
          timer: 1000,
        });
      }
    });
    console.log(notice);
  };

  const fetchNotice = () => {
    const token = localStorage.getItem("token");
    fetch(`https://lagi-kerja-production.up.railway.app/api/notice`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        dispatch(setNotice(data));
        console.log(data);
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
              <Nav.Link onClick={() => goToNotice()}>
                <FontAwesomeIcon icon={faBell} />
                <Badge pill bg="danger">
                  {notice?.length}
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
      
      {desain.map((item, index) => (
        <div key={index}>
          <img
            className="detail-desainimg"
            src={"https://lagi-kerja-production.up.railway.app/images/" + item.image_url}
          />
          <div style={{ margin: "20px" }}>
            <h1 className="title-desain">{item.name}</h1>
            <h3>{item.jenis}</h3>
            <h6>
              <FontAwesomeIcon icon={faCircleDot} /> {item.category.name}
            </h6>
            <h5>
              {" "}
              <FontAwesomeIcon icon={faLocationDot} /> {item.location}
            </h5>
            <div><hr /></div>
            <h3>Job Description</h3>
            <p>{item.description}</p>
            <div><hr /></div>
            <h3>Minimum Qualifications</h3>
            <p>{item.kualifikasi}</p>
            <h6>Sallary</h6>
            <p>
              <strong>Rp.{numberWithCommas(item.price)}</strong>
            </p>
            <Button
              onClick={() => addtoNotice(item)}
              className="btn-detaildesain"
            >
              Lamar sekarang
            </Button>
          </div>
        </div>
      ))}

      <Footer />
    </React.Fragment>
  );
};

export default Desain;
