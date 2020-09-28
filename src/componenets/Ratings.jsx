import React from 'react';

const Ratings = ({ rating }) => {
    const stars = [];
    for (let j = 1; j <= 5; j++) {
        if (j <= rating) {
            stars.push(<i key={j} className='fas fa-star text-warning'></i>);
        } else if (j === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<i key={j} className='fas fa-star-half-alt text-warning'></i>);
        }
        else {
            stars.push(<i key={j} className='far fa-star text-warning'></i>);
        }
    }

    return (
        <div>
            {stars}
        </div>
    )
}

export default Ratings;