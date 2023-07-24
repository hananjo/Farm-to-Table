// Add a product to the cart
const ADD_CART = 'product/ADD_CART'
// Show a list of items in the cart
const LOAD_CART = 'user/LOAD_CART'
// Editing the quantity of items in the cart
const UPDATE_CART = 'user/UPDATE_CART'
// Delete a product from the cart
const DELETE_CART = 'user/DELETE_CART'

const addCartProd = (cartRel) => ({
    type: ADD_CART,
    cartRel
})

const loadCart = (list) => ({
    type: LOAD_CART,
    list
});

const deleteCartProd = (id) => ({
    type: DELETE_CART,
    id
})

const updateCartQty = (cartRel) => ({
    type: UPDATE_CART,
    cartRel
})

const initialState = {};

export const addProdToCart = (cartRel) => async (dispatch) => {
    const {prodId, user, qty} = cartRel

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

        dispatch(loadCart(products))
    }
}

export const updateQty = (cartRel) => async (dispatch) => {
    const {prodId, user, qty} = cartRel

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

        dispatch(updateCartQty(updatedCartRel))
    }
}

export const deleteFromCart = (userId, prodId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/cart/${prodId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const cartRel = await res.json()
        dispatch(deleteCartProd(cartRel.id))
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
        default:
            return state;
    }
}
