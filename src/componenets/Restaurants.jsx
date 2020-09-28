import React, { useEffect, Fragment, useState, useContext } from 'react';
import Restaurant_api from "../api/Restaurant_api";
import { RestaurantsContext } from "../context/context";
import { useHistory } from "react-router-dom";



const Restaurants = () => {

    const [restaurants, setRestaurants] = useState([]);
    let history = useHistory();

    async function fetchData() {
        try {
            const response = await fetch("http://localhost:3006/api/Restaurants");
            const data = await response.json();
            setRestaurants(data.data.restaurants);

        } catch (err) { }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await Restaurant_api.delete(`/${id}`);
            setRestaurants(
                restaurants.filter((restaurant) => {
                    return restaurant.id !== id;
                })
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`);
    };

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`);
    };

    return (
        <Fragment>
            {" "}

            <div className="list-group">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="bg-primary">
                            <th scope="col">Restaurant</th>
                            <th scope="col">Location</th>
                            <th scope="col">Price Range</th>
                            <th scope="col">Ratings</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants && restaurants.map(restaurant => (

                            <tr onClick={() => handleRestaurantSelect(restaurant.id)}
                            key={restaurant.id}>
                                <td >{restaurant.name}
                                </td>
                                <td >{restaurant.location}</td>
                                <td >{"$".repeat(restaurant.price_range)}</td>

                                <td>
                                    <button
                                        onClick={(e) => handleUpdate(e, restaurant.id)}
                                        className="btn btn-warning"
                                    >
                                        Update
                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={(e) => handleDelete(e, restaurant.id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                      </button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};
export default Restaurants;
