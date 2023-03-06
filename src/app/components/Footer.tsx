import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">Built by Kristina Sparrow</p>
      <a
        href="https://github.com/kristina-sparrow"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-icon"
      >
        <FaGithub />
      </a>
    </footer>
  );
}
