const express = require("express");
const app = express();
const PORT = 3001;

const mongoose = require('mongoose');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// create schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
// create Model
const Product = mongoose.model("products", productSchema);

// CONNECT DATABASE
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/testProductDb');
        console.log('data base is connected');
    } catch (err) {
        console.log('Not Connected');
        console.log(err.message);
        process.exit(1);
    }
}

// CONNECT DATABASE
// mongoose.connect('mongodb://localhost:27017/testProductDb')
//     .then(() => {
//         console.log(`db is Conncted`);
//     })
//     .catch((err) => {
//         console("Not Connected");
//         console.log(err);
//         process.exit(1);
//     })

app.listen(PORT, async () => {
    console.log(`successfully run at http://localhost:${PORT}`);
    await connectDb();
})


app.get('/', (req, res) => {
    res.send("Welcome to home page");
    res.end();
})

app.post("/products", async (req, res) => {
    try {
        const title = req.body.title;
        const price = req.body.price;
        const description = req.body.description;
        // res.status(201).send({ title, price, description });

        const newProduct = new Product({ title, price, description });
        const productData = await newProduct.save();
        res.status(201).send(JSON.stringify(productData))
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})