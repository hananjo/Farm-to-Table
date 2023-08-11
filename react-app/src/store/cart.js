// Add a product to the cart
const ADD_CART = 'product/ADD_CART'
// Show a list of items in the cart
const LOAD_CART = 'user/LOAD_CART'
// Editing the quantity of items in the cart
const UPDATE_CART = 'user/UPDATE_CART'
// Delete a product from the cart
const DELETE_CART = 'user/DELETE_CART'
// Gets the total of the cart
const GET_TOTAL = 'user/GET_TOTAL'
// Clears the cart
const CLEAR_CART = 'user/CLEAR_CART'

const addCartProd = (cartRel) => ({
    type: ADD_CART,
    cartRel
})

const loadTotal = (total) => ({
    type: GET_TOTAL,
    total
})

const loadCart = (list, total) => ({
    type: LOAD_CART,
    list,
    total
});

const deleteCartProd = (id) => ({
    type: DELETE_CART,
    id
})

const updateCartQty = (cartRel) => ({
    type: UPDATE_CART,
    cartRel
})

const clearCart = () => ({
    type: CLEAR_CART
})

const initialState = {};

export const addProdToCart = (cartRel) => async (dispatch) => {
    const { prodId, user, qty } = cartRel

    const res = await fetch(`/api/users/${user}/cart/${prodId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            product_id: prodId,
            user_id: user,
            quantity: qty
        })
    })

    if (res.ok) {
        const newCartRel = await res.json()

        dispatch(addCartProd(newCartRel))
    }
}

export const getCart = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/cart`)

    if (res.ok) {
        const products = await res.json()
        console.log(products);

        let total = 0;

        products.forEach((prod) => {
            total = total + (Number(prod.product.price) * prod.quantity)
            // console.log("new cart total is ", total);
        })

        total = total.toFixed(2)

        console.log("final cart total is ", total);

        dispatch(loadCart(products, total))
    }
}

export const getTotal = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/cart`)

    if (res.ok) {
        const products = await res.json()

        let total = 0;

        products.forEach((prod) => {
            total = total + (Number(prod.product.price) * prod.quantity)
        })

        total = total.toFixed(2)

        console.log("cart total is", total);

        dispatch(loadTotal(total))
    }

    console.log("cart total not found");
}

export const updateQty = (cartRel) => async (dispatch) => {
    const { prodId, user, qty } = cartRel

    const res = await fetch(`/api/users/${user}/cart/${prodId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            product_id: prodId,
            user_id: user,
            quantity: qty
        })
    })

    if (res.ok) {
        const updatedCartRel = await res.json()

        dispatch(getTotal(user))

        dispatch(updateCartQty(updatedCartRel))
    }
}

export const deleteFromCart = (userId, prodId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/cart/${prodId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const cartRel = await res.json()

        dispatch(getTotal(userId))

        dispatch(deleteCartProd(cartRel.id))
    }
}

export const checkoutCart = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/cart/checkout`, {
        method: 'DELETE'
    })

    console.log("checkout thunk clicked");

    if (res.ok) {
        const cartRel = await res.json()

        console.log("checkout thunk completed");

        dispatch(clearCart())

    }
}




export default function cartReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_CART:
            newState = { ...state }

            action.list.forEach((cartRel) => {
                newState[cartRel.id] = cartRel;
            });

            newState["total"] = Number(action.total).toFixed(2)

            return { ...newState }
        case ADD_CART:
            newState = { ...state }

            newState[action.cartRel.id] = action.cartRel

            return newState
        case UPDATE_CART:
            newState = { ...state }

            newState[action.cartRel.id] = action.cartRel

            return newState
        case DELETE_CART:
            newState = { ...state }

            delete newState[action.id]

            return newState
        case GET_TOTAL:
            newState = { ...state }

            newState.total = action.total

            return newState
        case CLEAR_CART:
            newState = { ...initialState }

            return newState
        default:
            return state;
    }
}
