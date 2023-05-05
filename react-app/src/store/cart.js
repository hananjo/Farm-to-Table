// Add a product to the cart
const ADD_CART = 'product/ADD_CART'
// Show a list of items in the cart
const LOAD_CART = 'user/LOAD_CART'
// Editing the quantity of items in the cart
// const UPDATE_CART = 'user/UPDATE_CART'
// Delete a product from the cart
// const DELETE_CART = 'user/DELETE_CART'

const addCartProd = (prodId) => ({
    type: ADD_CART,
    prodId
})

const loadCart = (list) => ({
	type: LOAD_CART,
	list
});

const initialState = { cart: null };


export const getCart = (id) => async (dispatch) => {
    const res = await fetch(`users/${id}/cart`)

    if (res.ok) {
        const products = await res.json()

        dispatch(loadCart(products))
    }
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
        case ADD_CART:

            return {cart: state}
		case LOAD_CART:
			return { cart: action.payload }
		default:
			return state;
	}
}
