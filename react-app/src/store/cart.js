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

export const getCart = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/cart`)

    if (res.ok) {
        const products = await res.json()

        dispatch(loadCart(products))
    }
}



export default function cartReducer(state = initialState, action) {
	switch (action.type) {
        case LOAD_CART:
            const loadState = {}

            action.list.forEach((cartRel) => {
                loadState[cartRel.id] = cartRel;
              });

			return {...loadState}
        case ADD_CART:
            const newState = {...state}

            newState.cart = [...newState.cart, action.prod]

            return newState
		default:
			return state;
	}
}
