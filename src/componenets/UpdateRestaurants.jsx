import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { RestaurantsContext } from "../context/context";
import Restaurant_api from "../api/Restaurant_api";


const UpdateRestaurants = (props) => {
    const { id } = useParams();
    let history = useHistory();
    const { restaurants } = useContext(RestaurantsContext);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");


    async function fetchData() {
        try {
            const response = await fetch(`http://localhost:3006/api/Restaurants/${id}`);
            const data = await response.json();
            console.log(data.data);
            setName(data.data.restaurant.name);
            setLocation(data.data.restaurant.location);
            setPriceRange(data.data.restaurant.price_range);

        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await Restaurant_api.put(`/update/${id}`, {
            name,
            location,
            price_range: priceRange,
        });
        history.push("/");

    };

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        className="form-control"
                        type="text"

                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        id="location"
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <select value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="custom-select my-1 mr-sm-2">
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button onClick={handleSubmit}
                    type="submit" className="btn btn-primary">Update</button>

            </form>
        </div>
    )
}

export default UpdateRestaurants;
