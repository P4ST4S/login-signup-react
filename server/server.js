const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

const app = express();

app.use(express.json());
app.use(cors());

const uri = 'mongodb://localhost:27017/users';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    console.log(username, email, password, hash);

    const db = client.db('users');
    const collection = db.collection('users');

    try {
        const existingMail = await collection.findOne({ email });
        if (existingMail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const existingUsername = await collection.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const result = await collection.insertOne({ username, email, password: hash })
            .then((result) => {
                console.log(result);
                res.status(201).json({ message: 'User created' });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });

        console.log(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

Promise.all([client.connect()]).then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => console.log('Server running on port 5000'));
}).catch((err) => {
    console.log(err);
});