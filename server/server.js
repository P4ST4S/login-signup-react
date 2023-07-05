const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

app.use(cors());

app.post('/signup', (req, res) => {
    const { username, email, password, passwordConfirmation } = req.body;
    if (password !== passwordConfirmation) {
        res.status(400).json({ message: 'Passwords do not match' });
        return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log('hash', hash);
    res.status(200).json({ message: 'Success' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
