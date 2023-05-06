import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/cart";
import { useEffect, useState } from "react";

function Cart() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session.user.id)

    useEffect(() => {
        dispatch(getCart(user));
        setIsLoaded(true)
    }, [dispatch, user])

    const cart = useSelector(state => state.cart)
    // console.log("***********", cart && cart);

    const cartArr = Object.values(cart)
    console.log("-----------", cart && cartArr);

    return (
        <div>
            <h1>Your Shopping Cart </h1>
            <ul>
                {/* {cartArr > 0 ? isLoaded && cartArr?.map(prod => {return <li>{prod.id}</li>}) : <li>Shopping Cart is empty</li>} */}
                {isLoaded && cartArr?.map(prod => {
                    return <li>{prod.id}</li>
                })}
            </ul>
        </div>
    )
}

export default Cart;
