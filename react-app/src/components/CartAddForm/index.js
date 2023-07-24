import { useState } from "react"
import { addProdToCart, updateQty } from "../../store/cart"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "../CartQtyForm/cartForm.css"

export default function CartAddForm({ id, fCls }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user.id)
    const cart = useSelector(state => state.cart)
    const [qty, setQty] = useState(1)
    const { closeModal } = useModal()

    const cartArr = Object.values(cart)

    const updateFQty = (e) => {
        setQty(e.target.value)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCartRel = {
            prodId: id,
            user,
            qty
        }

        cartArr.forEach((rel) => {
            if (rel.product_id === newCartRel.prodId && rel.user_id === newCartRel.user) {

            }
        })

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
