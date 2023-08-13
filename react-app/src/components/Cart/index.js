import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteFromCart, checkoutCart } from "../../store/cart";
import { useEffect, useState } from "react";
import "./cart.css"
import CartQtyForm from "../CartQtyForm/"
import { useModal } from "../../context/Modal";
import { NavLink } from "react-router-dom";
import ClearModal from "../ClearModal";
import CheckoutModal from "../CheckoutModal";

function Cart() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [display, setDisplay] = useState("")
    const [save, setSave] = useState("hidden")
    const [showModal, setShowModal] = useState(false);
    // const [cartTotal, setCartTotal] = useState(0)
    const user = useSelector(state => state.session?.user?.id)
    const sessionUser = useSelector(state => state.session?.user)


    useEffect(() => {
        dispatch(getCart(user));
        setIsLoaded(true)
    }, [dispatch])

    const cart = useSelector(state => state?.cart)

    // console.log(cart && cart, "cart");

    const cartArr = Object.values(cart)

    cartArr.pop()

    const total = cart?.total

    const onDelete = (e) => {
        dispatch(deleteFromCart(user, e.target.id))
    }

    const handleCheckout = () => {
        // dispatch(getCart(user))
        let hasStuff = false

        console.log("the cart arr has ", cartArr.length);

        if (cartArr.length > 0) {
            console.log("the array has stuff");
            hasStuff = true
            dispatch(checkoutCart(user))
        }



        setModalContent(<CheckoutModal isFull={hasStuff} />)
        openModal();
    }

    const handleClear = () => {
        setModalContent(<ClearModal id={user} />)
        openModal();
    }

    const { setModalContent } = useModal();

    const openModal = () => { setShowModal(true) };

    const handleEdit = (prod, save) => {
        setModalContent(<CartQtyForm prod={prod} fCls={"update"} />)
        openModal();
    }

    // useEffect(() => {
    //     dispatch(getCart(user))
    // }, [dispatch, handleCheckout])

    // let cartTotal = 0;

    // const handleTotal = (price) => {
    //     setCartTotal(cartTotal + price)
    // }
    const totalContent = () => {
        if (cartArr.length > 0) {
            return (isLoaded && cartArr && cartArr?.map(prod => {
                let itemTotal = Number(prod?.product?.price) * Number(prod?.quantity)
                console.log("this items price is", prod?.product?.price, prod?.quantity);
                return (
                    <div className="price-info">
                        <p>{prod?.product?.name} x {prod?.quantity}</p>
                        <p>${(itemTotal).toFixed(2)}</p>
                    </div>
                )
            }))
        }
    }

    const cartContent = () => {
        if (cartArr.length > 0) {
            return (isLoaded && cartArr && cartArr?.map(prod => {
                // setCartTotal(cartTotal + prod?.product?.price.toFixed(2))
                // cartTotal = (cartTotal + Number(prod?.product?.price.toFixed(2)))
                // const prodPrice = prod?.product?.price.toFixed(2)
                // handleTotal(prodPrice)

                return (
                    <div className="cart-prod" key={prod?.id}>
                        <div className="product-info">
                            <NavLink
                                key={prod?.id}
                                to={`/products/${prod?.product?.id}`}
                                style={{ textDecoration: "none" }}
                                className="prod-link"
                            >
                                <div className="prod-img">
                                    <img
                                        src={
                                            prod && prod?.product?.images && prod?.product?.images[0]?.image_url
                                        }
                                        style={{ clipPath: "circle(38%)" }}
                                    />
                                </div>
                                <div className="prod-text">
                                    <div className="name">
                                        {prod?.product?.name}
                                    </div>
                                    <div className="price">
                                        $ {prod?.product?.price.toFixed(2)}
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="qty">Qty: {prod?.quantity}</div>
                        <div className="edit-section">
                            <button id={prod.id} className={display + " update-button"} onClick={() => handleEdit(prod, save)}>Edit</button>
                            <button id={prod.product?.id} className="update-button delete" onClick={onDelete}>Delete</button>
                        </div>
                    </div >
                )
            }))
        }

        return (<li>Your shopping cart is empty</li>)
    }

    return (
        <div className="cart-page">
            <div className="top-part">
                <div className="cart-page-banner">

                </div>
                <div className="title-container">
                    <h1>Your Shopping Cart </h1>
                </div>
            </div>
            <div className="bottom-part">
                <div className="empty-space"></div>
                <div className="cart-info-container">
                    {sessionUser && user ? (<div className="cart-container-item-list">
                        {cartContent()}
                    </div>) : (<h1>Please Log in to View Your Cart</h1>)}
                </div>
                <div className="checkout-info-container">
                    {cartArr.length ? (<>
                        <div className="total-content">
                            <div className="cart-total-header">Cart Total</div>
                            {sessionUser && user && (
                                <div>
                                    {totalContent()}
                                </div>
                            )}
                            <p className="total"><strong>Total:</strong> ${cart?.total ? cart?.total : (0).toFixed(2)}</p>
                        </div>
                        <div className="checkout-buttons">
                            <button onClick={handleCheckout} className="checkout">Checkout</button>
                            <button onClick={handleClear} className="clear">Clear</button>
                        </div>
                    </>) : (<br/>)}
                </div>
            </div>
        </div>
    )
}

export default Cart;
