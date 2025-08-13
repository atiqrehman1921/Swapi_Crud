import React from "react";
import Swal from "sweetalert2";

const Alert = ({ type = "success", title, message, timer = 4000, onClose }) => {
  React.useEffect(() => {
    Swal.fire({
      icon: type,
      title: title,
      text: message,
      timer: timer,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      if (onClose) onClose();
    });
  }, [type, title, message, timer, onClose]);

  return null;
};

export default Alert;
