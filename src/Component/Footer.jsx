import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import lkwhite from "./lk white.png"

const Footer = () => {
  return (
    <div>
      <footer className="footer-distributed">
        <div className="footer-left">
          <img src={lkwhite} />
          <h3>
            <br />
            About<span>LagiKerja</span>
          </h3>

          <p className="footer-links">
            <a href="#">Home</a> | <a href="#">Blog</a> | <a href="#">About</a>{" "}
            | <a href="#">Contact</a>
          </p>

          <p className="footer-company-name">
            © 2023 LagiKerja Jobseeker Solutions Pvt. Ltd.
          </p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>309 - Mataram Raya, Rya. No. A1, Sektor.3</span>
              Lombok, Nusa Tenggara Barat - 600295
            </p>
          </div>

          <div>
            <FontAwesomeIcon style={{color: "white"}} icon={faPhone} />
            {" "}
            <p>+62 81-7420271894</p>
          </div>
          <div>
            <FontAwesomeIcon style={{color: "white"}} icon={faEnvelope} />
            {" "}
            <p>
              <a href="https://kadek-fe-dev.vercel.app/">
                support@teamlagikerja.com
              </a>
            </p>
          </div>
        </div>
        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            LagiKerja adalah platform dimana para pencari kerja dapat mencari
            perkejaan 2 kali lebih cepat dari biasanya
          </p>
          <div className="footer-icons">
            <a href="#">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
