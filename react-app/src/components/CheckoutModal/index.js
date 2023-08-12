import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./CheckoutModal.css";

const CheckoutModal = (isFull) => {
    const { closeModal } = useModal();

    console.log("does this have stuff?", isFull.isFull);

    let comp;

    if (isFull.isFull) {
        comp = (
            <div className="purchase-confirmation">
                <h2 className="complete-h2">Purchase Complete</h2>
                <p className="thank-you-message">
                    Thank you for purchasing!
                </p>

                <div className="close-checkout-buttons">
                    <button className="close-button" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        )
    } else {
        comp = (
            <div className="purchase-confirmation">
                <h2 className="complete-h2">No Items</h2>
                <p className="thank-you-message">
                    You currently have no items in your cart. Add some fresh produce!
                </p>

                <div className="close-checkout-buttons">
                    <button className="close-button" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            {comp}
        </div>
    );
};

export default CheckoutModal;
