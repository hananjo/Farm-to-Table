import { useState } from "react"
import { addProdToCart, updateQty } from "../../store/cart"
import { useDispatch, useSelector } from "react-redux";
import "./cartForm.css"
import { useModal } from "../../context/Modal";

export default function CartQtyForm({ prod, fCls }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user.id)
    const [qty, setQty] = useState(prod.quantity)
    const { closeModal } = useModal()

    const updateFQty = (e) => {
        setQty(e.target.value)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCartRel = {
            prodId: prod.product_id,
            user,
            qty
        }

        if (fCls === "add") {
            dispatch(addProdToCart(newCartRel))
        } else if (fCls === "update") {
            dispatch(updateQty(newCartRel))
        }

        closeModal()

    }

    return (
        <div className="cart-form-containter">
            <div className="cart-form-title">
                <h1>How many would you like to buy?</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="qty-input-container">
                    <label for="quantity-input">Qty:</label>
                    <input id="quantity-input" type="number" step={1} placeholder={qty} min={1} max={15} value={qty} onChange={updateFQty}></input>
                    <button className="cart-save-button" type="submit">Save</button>
                </div>
            </form>

        </div>
    )
}
