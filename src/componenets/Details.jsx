import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Restaurant_api from '../api/Restaurant_api'

import Reviews from "./Reviews";

const Details = () => {
    const { id } = useParams();
    const [selectedRestaurant, setSelectedRestaurant] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3006/api/Restaurants/${id}`);
                const data = await response.json();
                console.log(data.data.restaurant);
                console.log(data.data.reviews);
                setSelectedRestaurant(data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <h1 className="text-center display-1">{selectedRestaurant && selectedRestaurant.name}</h1>
            <div className='mt-3'><Reviews reviews={selectedRestaurant.reviews} /></div>
        </div>
    );
};
export default Details;