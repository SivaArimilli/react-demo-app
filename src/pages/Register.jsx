import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm'
import { api } from '../services/api'

export default function Register() {
    const nav = useNavigate()

    const submit = async (data) => {
        await api.addUser(data)
        nav('/login')
    }

    return (
        <div className="container mt-5">
            <h3>Register</h3>
            <button className="btn btn-secondary mb-3" onClick={() => nav('/login')}>Back</button>
            <UserForm onSubmit={submit} />
        </div>
    )
}
