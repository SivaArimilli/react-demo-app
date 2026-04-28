import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function Login() {
    const nav = useNavigate()
    const [form, setForm] = useState({ username: '', password: '' })

    const login = async () => {
        const user = await api.login(form.username, form.password)
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
            nav('/dashboard')
        } else {
            alert('Invalid credentials')
        }
    }

    return (
        <div className="container d-flex vh-100 justify-content-center align-items-center">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h3 className="text-center mb-3">Login</h3>
                <input className="form-control mb-2" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
                <input type="password" className="form-control mb-3" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
                <button className="btn btn-primary w-100 mb-2" onClick={login}>Login</button>
                <button className="btn btn-outline-secondary w-100" onClick={() => nav('/register')}>Create Account</button>
            </div>
        </div>
    )
}
