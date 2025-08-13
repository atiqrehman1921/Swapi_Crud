import React from "react";
import "../styles/Footer.css";
import 'animate.css';

const Footer = () => {
  return (
    <footer className="footer text-white text-center py-2">
      Developed by{" "}
      <span className="text-red-500 font-bold animate__animated animate__bounce animate__infinite">
        Atiq Ur Rehman
      </span>
    </footer>
  );
};

export default Footer;
