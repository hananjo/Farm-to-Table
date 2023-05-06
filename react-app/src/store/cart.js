// Add a product to the cart
const ADD_CART = 'product/ADD_CART'
// Show a list of items in the cart
const LOAD_CART = 'user/LOAD_CART'
// Editing the quantity of items in the cart
// const UPDATE_CART = 'user/UPDATE_CART'
// Delete a product from the cart
// const DELETE_CART = 'user/DELETE_CART'

const addCartProd = (prod) => ({
    type: ADD_CART,
    prod
})

const loadCart = (list) => ({
	type: LOAD_CART,
	list
});

const initialState = { cart: null };

export const addToCart = (userId, prodId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/cart/${prodId}`, {
        method: 'POST'
    })

    if(res.ok) {
        const newCartProd = await res.json()

        dispatch(addCartProd(newCartProd))
    }
}

export const getCart = () => async (dispatch) => {
    const res = await fetch('/api/users/cart')

    if (res.ok) {
        const products = await res.json()

        dispatch(loadCart(products))
    }
}



export default function reducer(state = initialState, action) {
	switch (action.type) {
        case ADD_CART:
            const newState = {...initialState}

            newState.cart = [...newState.cart, action.prod]

            return newState
		case LOAD_CART:
			return { cart: action.list }
		default:
			return state;
	}
}
