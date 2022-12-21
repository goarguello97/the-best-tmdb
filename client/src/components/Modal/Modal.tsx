import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Login from "../Login-Register/Login-Register";
import "./Modal.css";
import { AiOutlineFullscreenExit } from "react-icons/ai";
const ModalComponent = (props: any) => {
  return (
    <div className="div-modal">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="modal-header-custom">
          <div className="modal-content-custom">
            <div className="close-button" onClick={props.onHide}>
              {" "}
              <h3>
                <AiOutlineFullscreenExit />
              </h3>
            </div>
            <Login/>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComponent;
