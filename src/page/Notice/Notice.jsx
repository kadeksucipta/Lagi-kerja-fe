import React from "react";
import "./Notice.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import {
  Badge,
  Col,
  Container,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Table,
} from "react-bootstrap";
import { setNotice } from "../../App/features/Notice/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";

const Notice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const goToHome = () => {
    navigate("/Homepage");
  };

  const notice = useSelector((state) => state.notice);

  // pnggil notice
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

    fetch(`https://lagi-kerja-production.up.railway.app/api/notice`, {
      method: "PUT",
      body: JSON.stringify({
        user: userData ? JSON.parse(userData) : null,
        items,
      }),

      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZmMjg3MGJlMGJhNTNiYzFhOTU1MDciLCJmdWxsX25hbWUiOiJrYWRlayBheWhhIiwiZW1haWwiOiJrYWRlazQ1QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImN1c3RvbWVyX2lkIjoxLCJpYXQiOjE2ODUwMDY5MTV9.WwuuCSjCCdRD40zzLFXko7ccaOsjPoyBVkFNmURHdGI`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log({ response });
      if (response.status === 200) {
        fetchNotice();
        swal({
          title: "Pesanan Diterima",
          text: "Terimakasi Sudah Berbelanja :)",
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

    fetch(`https://jungle-green-hermit-crab-fez.cyclic.app/api/carts`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZmMjg3MGJlMGJhNTNiYzFhOTU1MDciLCJmdWxsX25hbWUiOiJrYWRlayBheWhhIiwiZW1haWwiOiJrYWRlazQ1QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImN1c3RvbWVyX2lkIjoxLCJpYXQiOjE2ODUwMDY5MTV9.WwuuCSjCCdRD40zzLFXko7ccaOsjPoyBVkFNmURHdGI`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setNotice(data));
        console.log(data);
      });
  };
  return (
    <div>
      <Container>
        <Card className="mt-5">
          <Card.Header style={{ color: "white" }} className="header-notice">
            Notice
          </Card.Header>
          <Card.Body>
            <h5>
              <strong>Sub Total : Rp.1.00</strong>
            </h5>
            <Table responsive className="table-alamat" striped bordered hover>
              <thead style={{ maxWidth: "100%" }}>
                <tr style={{ maxWidth: "100%" }}>
                  <th>Nama Perusahaan</th>
                  <th>Pekerjaan</th>
                  <th>Jenis</th>
                  <th>Status</th>
                </tr>
              </thead>
              {notice.map((item, index) => (
              <tbody key={index} style={{ maxWidth: "100%" }}>
                <tr style={{ maxWidth: "100%" }}>
                  <td>
                    <img
                      style={{
                        width: "150px",
                        height: "100px",
                        borderRadius: "5px",
                        maxWidth: "100%",
                      }}
                      variant="top"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                  <td>
                      {item.jenis}
                  </td>
                  <td>Menunggu konfirmasi HRD</td>
                </tr>
              </tbody>
               ))}
            </Table>
          </Card.Body>
          <Container>
            <Button className="btn-gocheckout" onClick={() => goToHome()}>Halaman Utama</Button>
          </Container>
        </Card>
      </Container>
    </div>
  );
};

export default Notice;
