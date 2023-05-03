import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadReviews } from "../../store/review";

export default function Reviews() {
    const dispatch = useDispatch();
    const reviews = useSelector()

    useEffect(() => {
        dispatch(loadReviews())
    }, [dispatch])

    return (
        <div>Reviews</div>
    )
}
