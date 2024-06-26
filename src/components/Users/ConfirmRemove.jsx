import React, { useState } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import axios from "axios";
import { API_URL_USERS } from "../../index";

const ConfirmRemovalModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal((previousModal) => !previousModal);
  };

  const deleteUser = async (id) => {
    try {
      console.log("Deleting employee with pk:", id);
      await axios.delete(API_URL_USERS + id);
      toggle();
      console.log("Deleting Succesfully");
    } catch (error) {
      console.error("Error deleting Employees:", error);
    }
  };
  return (
    <>
      <Button color="danger" onClick={() => toggle()}>
        Remove
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader isOpen={toggle}>
          Are you sure! You want to delete the Record
        </ModalHeader>
        <ModalFooter>
          <Button type="button" onClick={() => toggle()}>
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => deleteUser(props.id)}
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ConfirmRemovalModal;
