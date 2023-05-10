import { useState } from "react"
import { addProdToCart, updateQty } from "../../store/cart"
import { useDispatch, useSelector } from "react-redux";
import "./cartForm.css"
import { useModal } from "../../context/Modal";

export default function CartQtyForm({ prod, cls, fCls }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user.id)
    const [qty, setQty] = useState(prod.quantity)
    const [display, setDisplay] = useState(cls)
    const {closeModal} = useModal()
    // console.log(prod.product_id, "product");
    console.log(fCls);
    console.log(qty, "quantity");

    const updateFQty = (e) => {
        console.log(e.target.id);
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
            console.log("dispatching add");
            dispatch(addProdToCart(newCartRel))
        } else if (fCls === "update") {
            console.log("dispatching update");
            dispatch(updateQty(newCartRel))
        }

        closeModal()

        // setDisplay("hidden")
    }

    return (
        <form className={display} onSubmit={handleSubmit}>
            <input id="quantity-input" className={display} type="number" step={1} placeholder={qty} min={1} max={15} value={qty} onChange={updateFQty}></input>
            <button type="submit" className={display}>Save</button>
        </form>
    )
}
