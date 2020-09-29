require("dotenv").config()
const express = require("express")
const db = require('./db')
const app = express();
const cors = require("cors")
const morgan = require("morgan");

app.use(cors());
app.use(express.json());

app.get("/api/Restaurants", async (req, res) => {

    try {
        const results = await db.query("select * from restaurants");

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            },
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/Restaurants/:id", async (req, res) => {
    try {
        const restaurant = await db.query('select * from restaurants where id = $1', [req.params.id]);
        const reviews = await db.query('select * from reviews where restaurant_id = $1', [req.params.id]);
        console.log(req.params.id)
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        });
    } catch (error) {
        console.log(error)
    }
});

app.post("/api/Restaurants", async (req, res) => {
    try {
        const results = await db.query("insert into restaurants (name, location, price_range) values($1,$2,$3) returning *", [req.body.name, req.body.location, req.body.price_range])
        const id = await db.query("select id from restaurants where name = $1 and location = $2",[req.body.name,req.body.location])
        const reviews = await db.query("insert into reviews (restaurant_id, name, reviews, rating) values($1,$2,$3) returning *", [id, req.body.username, req.body.reviews, req.body.rating])
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (error) {
        console.log(error);
    }
})

app.put("/api/Restaurants/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body.name);
        const results = await db.query(
            "Update restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, id])

        res.status(200).json({
            status: "success",
            restaurant: results.rows[0],
        });
    } catch (error) {
        console.log(error)
    }
})

app.delete("/api/Restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("delete from restaurants where id =$1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    } catch (error) {
        console.log(error);
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and Thank you!${port}`);
});
