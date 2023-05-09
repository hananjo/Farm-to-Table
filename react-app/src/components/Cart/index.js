import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteFromCart } from "../../store/cart";
import { useEffect, useState } from "react";

function Cart() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [qty, setQty] = useState()
    const user = useSelector(state => state.session.user.id)

    const updateQty = (e) => setQty(e.target.value);

    useEffect(() => {
        dispatch(getCart(user));
        setIsLoaded(true)
    }, [dispatch, user])

    const cart = useSelector(state => state.cart)
    // console.log("***********", cart && cart);

    const cartArr = Object.values(cart)
    console.log("-----------", cart && cartArr, cart && cartArr.length);

    const onDelete = (e) => {
        console.log('delete', e.target.id);
        dispatch(deleteFromCart(user, e.target.id))
    }

    return (
        <div>
            <h1>Your Shopping Cart </h1>
            <ul>
                {/* {cartArr > 0 ? isLoaded && cartArr?.map(prod => {return <li>{prod.id}</li>}) : <li>Shopping Cart is empty</li>} */}
                {isLoaded && cartArr?.map(prod => { return <li key={prod.id}>{prod.product.name} {prod.quantity} <input id="quantity-input" type="number" step={1} placeholder={qty} min={1} max={15} onChange={updateQty}></input> <button id={prod.product.id} onClick={onDelete}>Delete</button></li> })}
            </ul>
        </div>
    )
}

export default Cart;
