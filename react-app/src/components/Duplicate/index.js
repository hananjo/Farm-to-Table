import { useState } from "react";
import { useModal } from "../../context/Modal";
import CartQtyForm from "../CartQtyForm";
import "./Duplicate.css"

function DuplicateAdd({ prod, fCls }) {
    const { setModalContent, closeModal } = useModal();
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const handleYes = () => {
        setModalContent(<CartQtyForm prod={prod} fCls={"update"} />);
        openModal();
    }

    const handleNo = () => {
        closeModal()
    }

    return (
        <div className="modal-container">
            <div className="modal-title">
                <h1>You already added this to your cart</h1>
            </div>
            <div className="content-container">
                <div className="content">
                    <h2>Would you like to change the quantity?</h2>
                </div>
                <div className="con-buttons">
                    <button className="confirmation" onClick={handleYes}>Yes</button> <button className="confirmation" onClick={handleNo}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DuplicateAdd
