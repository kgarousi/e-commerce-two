import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET);

app.use(cors());

app.listen(process.env.PORT, () =>{
    console.log("app listening on Port 5000")
})

app.get("/api/products", async (req, res) => {
    try {
        const response = await stripe.products.list({ expand: ['data.default_price'] }); // Fetch products
        const products = response.data;
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while fetching products' }); // Send a 500 error response
    }
});
