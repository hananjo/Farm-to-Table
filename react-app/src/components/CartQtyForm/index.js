import { useState } from "react"

export default function CartQtyForm({ prod, cls }) {
    const [qty, setQty] = useState(prod.quantity)
    console.log(qty, "4");

    const updateQty = (e) => {
        setQty(e.target.value)
        return 'test'
    }

    return (
        <input id="quantity-input" className={cls} type="number" step={1} placeholder={qty} min={1} max={15} onChange={updateQty}></input>
    )
}
