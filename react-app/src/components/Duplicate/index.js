import { useState } from "react";
import { useModal } from "../../context/Modal";
import CartQtyForm from "../CartQtyForm";

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
        <div>
            <h1>You already added this to your cart</h1>
            <h2>Would you like to change the quantity?</h2>
            <button onClick={handleYes}>Yes</button> <button onClick={handleNo}>No</button>
        </div>
    )
}

export default DuplicateAdd
