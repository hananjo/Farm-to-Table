// ACTION TYPE
const LOAD_REVIEWS = 'review/LOAD_REVIEWS'


// ACTION CREATOR
const load = reviews => ({
    type: LOAD_REVIEWS,
    reviews
})


// THUNK
export const loadReviews = () => async dispatch => {
    let res = await fetch('/api/reviews')
    if(res.ok) {
        res = await res.json()
        dispatch(load(res))
    }
}

// STATE
const initialState = {}
const reviews = (state=initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEWS:
            return {...state, ...action.reviews}
        default:
            return state
    }
}

export default reviews
