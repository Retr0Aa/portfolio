import Page from "../components/Page";

import { CgInstagram } from "react-icons/cg";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default function ContactPage() {
  return (
    <Page>
      <h1>Contact</h1>

      <p>You can contact me through the following platforms:</p>

      <ul className="contact-list">
        <li>
          <a href="https://www.instagram.com/a.buchkov__?igsh=MTk0ODlicHpqZHNxaQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
          <CgInstagram color="#E1306C" size={24} style={{ marginRight: "0.5rem" }} />
            Instagram
          </a>
        </li>
        <li>
          <a href="https://github.com/retr0aa" target="_blank" rel="noopener noreferrer">
            <FaSquareGithub color="#333" size={24} style={{ marginRight: "0.5rem" }} />
            GitHub
          </a>
        </li>
        <li>
          <a href="www.linkedin.com/in/alexander-buchkov-203b33414" target="_blank" rel="noopener noreferrer">
            <FaLinkedin color="#0077B5" size={24} style={{ marginRight: "0.5rem" }} />
            LinkedIn
          </a>
        </li>
        <li>
          <a href="mailto:retr0aalex@icloud.com" target="_blank" rel="noopener noreferrer">
            <IoMdMail color="#007AFF" size={24} style={{ marginRight: "0.5rem" }} />
            Mail
          </a>
        </li>
      </ul>
    </Page>
  );
}
