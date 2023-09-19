// ACTION TYPES
const LOAD_REVIEWS = 'review/LOAD_REVIEWS'
const ADD_REVIEW = 'review/ADD_REVIEW'
const EDIT_REVIEW = 'review/EDIT_REVIEW'
const REMOVE_REVIEW = 'review/REMOVE_REVIEW'

// ACTION CREATORS

// Load Reviews Action
export const load = reviews => ({
    type: LOAD_REVIEWS,
    reviews
})

// Add Review Action
export const addReview = (review) => ({
    type: ADD_REVIEW,
    review
})

// Edit Review Action
export const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
})

// Remove Review Action
export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})


// THUNKS

// load Reviews thunk
export const loadReviews = (productId) => async dispatch => {
    let res = await fetch(`/api/products/${productId}/reviews`)
    if(res.ok) {
        res = await res.json()
        dispatch(load(res))
    }
}

// add Review thunk
export const createReview = (review, product_id) => async dispatch => {
    let res = await fetch(`/api/products/${product_id}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    });

    if(res.ok) {
        const newReview = await res.json();
        dispatch(addReview(newReview));
        return newReview;
    }
}

// edit Review thunk
export const updateReview = (review) => async dispatch => {
    const res = await fetch(`/api/products/${review.productId}/reviews`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    if(res.ok) {
        const updatedReview = await res.json();
        dispatch(editReview(updatedReview));
        return updatedReview;
    }
}

// delete Review thunk
export const deleteReview = (reviewId) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    });

    if(res.ok) {
        console.log("delete review thunk hit");
        const review = await res.json()
        dispatch(removeReview(review))
    }
}


// STATE
const initialState = {}
const reviews = (state=initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEWS:
            const loadState = {...initialState};
            // console.log("here's what's being set up", action.reviews);
            // action.reviews.forEach((review) => {
            //     // loadState[review.id] = review
            //     console.log("each review", review);
            // })
            // return {...state, ...action.reviews}

            // const loadState = {initialState}

            action.reviews.forEach((review) => {
                loadState[review.id] = review
                // console.log("now each review", review);
            })

            return loadState

        case ADD_REVIEW:
            return {...state, [action.review.id]: action.review}

        case EDIT_REVIEW:
            const updateRev = action.review.updateReview;
            return {...state, [updateRev.id]: updateRev};

        case REMOVE_REVIEW:
            const deleteState = {...state};
            // console.log("current",deleteState);
            // console.log("what we're lookng for", action.reviewId.id);
            // console.log("what is found", deleteState[action.reviewId.id]);
            delete deleteState[action.reviewId.id]
            return deleteState;
        default:
            return state
    }
}

export default reviews
