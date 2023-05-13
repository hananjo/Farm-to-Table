import { useModal } from "../../context/Modal";

function OwnerAdd() {
    const { closeModal } = useModal();

    const handleClose = () => {
        closeModal()
    }

    return (
        <div>
            <h1>You are the owner of this product</h1>
            <h2>You can't add a product you own to your cart</h2>
            <button onClick={handleClose}>Close</button>
        </div>
    )
}

export default OwnerAdd
