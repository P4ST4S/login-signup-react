import React, { useState } from 'react'
import "./SignUp.scss"


function SignUp() {
    const [errUsername, setErrUsername] = useState(false)
    const [errEmail, setErrEmail] = useState(false)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password !== passwordConfirmation) {
            alert('Passwords do not match')
            return
        }

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json()
                alert("Your account has been created successfully")
                setErrUsername(false)
                setErrEmail(false)
                console.log(data)
            } else if (response.status === 400) {
                const error = await response.json()
                if (error.message.includes("Email")) {
                    setErrEmail(true)
                } else if (error.message.includes("Username")) {
                    setErrUsername(true)
                }
                alert(error.message);
            } else {
                const error = await response.json()
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <h1 className="title">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className={`field ${errUsername ? 'has-error' : ''}`}>
                    <label className={`label ${errUsername ? 'error-label' : ''}`}>
                        Username
                    </label>
                    <div className="control">
                        <input
                            className={`input ${errUsername ? 'error-input' : ''}`}
                            type="text"
                            placeholder="Username"
                            value={username}
                            required
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                </div>
                <div className={`field ${errEmail ? 'has-error' : ''}`}>
                    <label className={`label ${errEmail ? 'error-label' : ''}`}>
                        Email
                    </label>
                    <div className="control">
                        <input
                            className={`input ${errEmail ? 'error-input' : ''}`}
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