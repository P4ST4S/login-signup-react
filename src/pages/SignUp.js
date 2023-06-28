import React, { useState, useEffect } from 'react'
import "./SignUp.scss"

const bcrypt = require('bcryptjs')

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function SignUp() {
    const [hashedPassword, setHashedPassword] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log('username', username)
        console.log('email', email)
        if (password !== passwordConfirmation) {
            alert('Passwords do not match')
            return
        } else {
            const hashed = hashPassword(password)
            setHashedPassword(hashed)
        }
    }

    useEffect(() => {
        if (hashedPassword) {
            console.log('hashedPassword', hashedPassword);
        }
    }, [hashedPassword])

    return (
        <div className="container">
            <h1 className="title">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            required
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="email"
                            placeholder='Email'
                            value={email}
                            required
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className='input'
                            type='password'
                            placeholder='Password'
                            value={password}
                            required
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password Confirmation</label>
                    <div className="control">
                        <input
                            className='input'
                            type='password'
                            placeholder='Password Confirmation'
                            value={passwordConfirmation}
                            required
                            onChange={(event) => setPasswordConfirmation(event.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp