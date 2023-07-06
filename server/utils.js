function internalServerError(res, err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
}

async function emailExist(res, collection, email) {
    const existingMail = await collection.findOne({ email });
    if (existingMail) {
        return res.status(400).json({ message: 'Email already exists' });
    }
}

async function usernameExist(res, collection, username) {
    const existingUsername = await collection.findOne({ username });
    if (existingUsername) {
        return res.status(400).json({ message: 'Username already exists' });
    }
}

async function insertUser(collection, res, username, email, hash) {
    const result = await collection.insertOne({ username, email, password: hash })
        .then((result) => {
            console.log(result);
            res.status(201).json({ message: 'User created' });
        })
        .catch((err) => {
            return internalServerError(res, err);
        });

    if (result) console.log(result);
}

module.exports = {
    internalServerError,
    emailExist,
    usernameExist,
    insertUser,
}
