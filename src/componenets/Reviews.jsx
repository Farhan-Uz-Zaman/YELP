import React from 'react'
import Ratings from "./Ratings";

function Reviews({ reviews }) {
    return (
        <div className="row row-cols-3 mb-2">
            {reviews && reviews.map((review) => {
                return (
                    <div
                        key={review.id}
                        className="card text-white bg-primary mb-3 mr-4"
                        style={{ maxWidth: "30%" }}
                    >
                        <div className="card-header d-flex justify-content-between">
                            <span>{review.name}</span>
                            <span>
                                <Ratings rating={review.rating} />
                            </span>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{review.reviews}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Reviews
