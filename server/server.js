const { emailExist, usernameExist, insertUser, internalServerError } = require('./utils.js');

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
        const emailExistVal = await emailExist(res, collection, email);
        if (emailExistVal) return;

        const userExistVal = await usernameExist(res, collection, username);
        if (userExistVal) return;

        await insertUser(collection, res, username, email, hash);
    } catch (err) {
        return internalServerError(res, err);
    }
});

Promise.all([client.connect()]).then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => console.log('Server running on port 5000'));
}).catch((err) => {
    console.log(err);
});