import React from "react";
import Swal from "sweetalert2";

const DeleteAlert = ({ show, name, onConfirm, onCancel, loading }) => {
  React.useEffect(() => {
    if (show) {
      Swal.fire({
        title: 'Delete Starship',
        html: `Are you sure you want to delete <strong>${name}</strong>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: loading ? 'Deleting...' : 'Delete',
        cancelButtonText: 'Cancel',
        allowOutsideClick: !loading,
        showLoaderOnConfirm: loading,
        preConfirm: () => {
          return new Promise((resolve) => {
            onConfirm();
            resolve();
          });
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          onCancel();
        }
      });
    }
  }, [show, name, loading, onConfirm, onCancel]);

  return null;
};

export default DeleteAlert;