import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getProductsByCategory } from "../../store/product";
import "./categories.css";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import CartAddForm from "../CartAddForm";
import { getCart } from "../../store/cart";
import OwnerAdd from "../Owned";
import DuplicateAdd from "../Duplicate";

const Categories = () => {
    const dispatch = useDispatch();
    const { category } = useParams();
    const history = useHistory();
    const user = useSelector(state => state.session?.user?.id)
    const sessionUser = useSelector(state => state?.session?.user)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getProductsByCategory(category));
    }, [dispatch, category]);

    const products = useSelector(state => state?.product)
    const prodArr = products && Object.values(products)

    useEffect(() => {
        dispatch(getCart(user));
        setIsLoaded(true)
    }, [dispatch, user])

    const cart = useSelector(state => state.cart)

    const cartArr = Object.values(cart)

    const { setModalContent } = useModal();
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const handleAddtoCart = (prodId, ownerId) => {
        let isDuplicate = false
        let cartRel = {}


        if (user === ownerId) {
            setModalContent(<OwnerAdd prod={cartRel} fCls={"update"} />);
            openModal();
        } else {
            cartArr.forEach((rel) => {
                if (rel.product_id === prodId && rel.user_id === user) {
                    isDuplicate = true
                    cartRel = rel
                }
            })

            if (isDuplicate) {
                setModalContent(<DuplicateAdd prod={cartRel} fCls={"update"} />);
                openModal();
            } else {
                setModalContent(<CartAddForm id={prodId} fCls={"add"} />);
                openModal();
            }
        }
    };

    const handleClick = (e) => {
        history.push(`/products/${e.target.id}`)
    }

    return (
        <div>
            <div className="category-container">
                <div className="categories-title">
                    <h2>Groceries delivered fresh right to your door!</h2>
                </div>
                <div className="categories-and-names">
                    <div className="fruits-page-container">
                        <NavLink
                            to={`/category/Fruit`}
                            style={{ textDecoration: "none" }}
                        >
                            <div id="Fruit" className="category" onClick={handleClick}>
                                <img
                                    src={
                                        "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683739735/Fruits_xat3pu.jpg"
                                    }
                                    style={{
                                        clipPath: "circle(38%)",
                                        width: "100px",
                                    }}
                                    alt="image1"
                                    className="image-categories"
                                />
                                <div className="category-names">
                                    <p>Fruits</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <NavLink
                        to={`/category/Vegetable`}
                        style={{ textDecoration: "none" }}
                    >
                        <div id="Vegetable" className="category" onClick={handleClick}>
                            <img
                                src={
                                    "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683739735/vegetables_2_qhyckt.jpg"
                                }
                                style={{ clipPath: "circle(38%)" }}
                                alt="image2"
                                className="image-categories"
                            />
                            <div className="category-names">
                                <p>Vegetables</p>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink
                        to={`/category/Meat`}
                        style={{ textDecoration: "none" }}
                    >
                        <div id="Meat" className="category" onClick={handleClick}>
                            <div className="image-meat">
                                <img
                                    src={
                                        "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683739735/meat_products_jfojgq.jpg"
                                    }
                                    style={{ clipPath: "circle(38%)", width: "100px" }}
                                    alt="image3"
                                    className="image-categories"
                                />
                            </div>
                            <div className="category-name-meat">
                                <p>Meat</p>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink
                        to={`/category/Dairy`}
                        style={{ textDecoration: "none" }}
                    >
                        <div id="Dairy" className="category" onClick={handleClick}>
                            <img
                                src={
                                    "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683739735/dairy_g1nr3q.jpg"
                                }
                                style={{ clipPath: "circle(38%)" }}
                                alt="image4"
                                className="image-categories"
                            />
                            <div className="category-names">
                                <p>Dairy</p>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className="product-and-pricing">
                {prodArr?.map((product) => {
                    return (
                        <div>
                            <NavLink
                                key={product.id}
                                to={`/products/${product.id}`}
                                style={{ textDecoration: "none" }}
                            >
                                <div className="product-image-listing">
                                    <img
                                        src={
                                            product && product.images && product?.images[0]?.image_url
                                        }
                                        style={{
                                            marginRight: "30px",
                                            marginBottom: "30px",
                                            marginTop: "30px",
                                        }}
                                        className="product-images"
                                    />
                                </div>
                                <div className="product-pricing-images">
                                    ${product?.price.toFixed(2)}
                                </div>
                                {sessionUser && (
                                    <button className="category-page-add-button"
                                        onClick={() => handleAddtoCart(product.id, product.owner_id)}
                                        style={{ clipPath: "circle(40%)" }}><i class="fa-solid fa-plus"></i></button>
                                )}
                            </NavLink>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Categories;
