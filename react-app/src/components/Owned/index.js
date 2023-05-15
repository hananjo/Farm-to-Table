import { useModal } from "../../context/Modal";
import "../Duplicate/Duplicate.css"

function OwnerAdd() {
    const { closeModal } = useModal();

    const handleClose = () => {
        closeModal()
    }

    return (
        <div className="modal-container">
            <div className="modal-title">
                <h1>You are the owner of this product</h1>
            </div>
            <div className="content-container">
                <div className="content">
                    <h2>You can't add a product you own to your cart</h2>
                </div>
                <div className="con-buttons">
                    <button className="confirmation" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default OwnerAdd
