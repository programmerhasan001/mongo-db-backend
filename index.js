const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
// create schema
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
// create Model
const User = mongoose.model("users", usersSchema);

// CONNECT DATABASE
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/users');
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

app.post("/users", async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        // res.status(201).send({ title, price, description });

        const newUser = new User({ name, email });
        const userData = await newUser.save();
        res.status(201).send(JSON.stringify(userData))
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})