import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteFromCart } from "../../store/cart";
import { useEffect, useState } from "react";
import "./cart.css"
import CartQtyForm from "../CartQtyForm/"

function Cart() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [display, setDisplay] = useState("")
    const [save, setSave] = useState("hidden")
    const user = useSelector(state => state.session.user.id)

    // const handleDeleteReview = async (reviewId) => {
    //     console.log(reviewId, "67")
    //     setModalContent(<DeleteReviewModal id={reviewId} productId={id} />)
    //     openModal();
    // }

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


    const handleEdit = (e) => {
        // setModalContent(<CartQtyForm id={reviewId} productId={id} />)
        // openModal();
        // setDisplay("hidden")
        // setSave("")
    }

    return (
        <div>
            <h1>Your Shopping Cart </h1>
            <ul>
                {/* {cartArr > 0 ? isLoaded && cartArr?.map(prod => {return <li>{prod.id}</li>}) : <li>Shopping Cart is empty</li>} */}
                {isLoaded && cartArr?.map(prod => {
                    return (
                        <li key={prod.id}>{prod.product.name} {prod.quantity}
                            <button className={display} onClick={handleEdit}>Edit</button>
                            <CartQtyForm key={prod.id} prod={prod} cls={save} fCls={"update"} />
                            <button id={prod.product.id} onClick={onDelete}>Delete</button>
                        </li>)
                })}
            </ul>
        </div>
    )
}

export default Cart;
