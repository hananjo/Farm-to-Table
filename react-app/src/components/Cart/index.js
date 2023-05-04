import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/cart";
import { useEffect } from "react";

function Cart() {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.id)

    useEffect(() => {
        dispatch(getCart(userId));
    }, [dispatch, userId])

    const cart = useSelector(state => state.cart)
    console.log(cart && cart);

    return(
        <div>
            <h1>Your Shopping Cart </h1>
            <p>
                {cart}
            </p>
        </div>
    )
}

export default Cart;
