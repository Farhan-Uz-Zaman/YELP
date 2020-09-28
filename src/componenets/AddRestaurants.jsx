import React, { useState, useContext } from 'react';
import Restaurant_api from "../api/Restaurant_api";
import { RestaurantsContext } from "../context/context";

const AddRestaurants = () => {
    const { addRestaurants } = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("Ratings");

    const handleSubmit = async (e) => {

        try {
            const response = await Restaurant_api.post("/", {
                name,
                location,
                price_range: priceRange,
                review,
                rating
            });

            addRestaurants(response.data.data.restaurant);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Name" />
                    </div>
                    <div className="col">
                        <input value={location}
                            onChange={(e) => setLocation(e.target.value)} type="text" className="form-control" placeholder="Location" />
                    </div>
                    <div className="col">
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
                    <div className="col">
                        <select value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="custom-select my-1 mr-sm-2">
                            <option disabled>Ratings </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit}
                        type="submit" className="btn btn-primary">add</button>
                </div>
            </form>
            <div>
                <input value={review}
                    onChange={(e) => setReview(e.target.value)} type="text" className="form-control" placeholder="Reviews" />
            </div>
        </div>
    )
}

export default AddRestaurants;