import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteFromCart } from "../../store/cart";
import { useEffect, useState } from "react";
import "./cart.css"
import CartQtyForm from "../CartQtyForm/"
import { useModal } from "../../context/Modal";

function Cart() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [display, setDisplay] = useState("")
    const [save, setSave] = useState("hidden")
    const [showModal, setShowModal] = useState(false);
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
        // dispatch(getCart(user));
    }

    const {setModalContent} = useModal();

    const openModal = () => { setShowModal(true) };

    const handleEdit = (prod, save) => {
        setModalContent(<CartQtyForm prod={prod} fCls={"update"} />)
        openModal();
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
                            <button id={prod.id} className={display} onClick={() => handleEdit(prod, save)}>Edit</button>
                            <button id={prod.product.id} onClick={onDelete}>Delete</button>
                        </li>)
                })}
            </ul>
        </div>
    )
}

export default Cart;
