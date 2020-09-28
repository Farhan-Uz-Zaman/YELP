import React from 'react'
import AddRestaurant from '../componenets/AddRestaurants';
import Restaurants from '../componenets/Restaurants';

const home = () => {
    return (
        <div>
            <h1 className="font-weight-light display-1 text-center">
                Restaurants Finder
            </h1>
            <AddRestaurant />
            <Restaurants />
        </div>
    )
}

export default home
