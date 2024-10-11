import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';
const app = express();

const stripeSecret = process.env.STRIPE_SECRET;
if (!stripeSecret) {
    throw new Error("Stripe secret key is not defined in the environment variables");
}
const stripe = new Stripe(stripeSecret);


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

app.use(express.json()); // Add this line to parse JSON body

app.post("/api/checkout", async (req, res) => {
    const body = req.body;

    if (!body.cartItems || body.cartItems.length === 0) {
        return res.status(400).json({ error: 'No items in cart' }); // Return a 400 error
    }


    try {
        const session = await stripe.checkout.sessions.create({
            success_url: 'https://your-app-url.com/success',
            cancel_url: 'https://your-app-url.com/cancel',
            line_items: body.cartItems, // Make sure this is correctly formatted
            mode: "payment"
        });

        return res.json({ session });
    } catch (err) {
        console.error("Error creating checkout session:", err);
        return res.status(500).json({ error: 'Failed to create checkout session' });
    }
});
