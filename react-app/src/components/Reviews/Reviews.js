import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadReviews } from "../../store/review";

export default function Reviews() {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews)
    const reviewArr = Object.values(reviews)


    useEffect(() => {
        dispatch(loadReviews())
    }, [dispatch])

    return (
        <>
        {reviewArr.map(obj => <div>{obj.review}</div>)}
        </>
    )
}
