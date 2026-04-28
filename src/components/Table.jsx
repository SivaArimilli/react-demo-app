import React from 'react'

export default function Table({ data, onEdit, onDelete }) {
    return (
        <table className="table table-bordered table-hover">
            <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>Action</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Mail</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d, i) => (
                    <tr key={d.id}>
                        <td>{i + 1}</td>
                        <td>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(d)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => onDelete(d.id)}>Delete</button>
                        </td>
                        <td>{d.id}</td>
                        <td>{d.name}</td>
                        <td>{d.age}</td>
                        <td>{d.phone}</td>
                        <td>{d.mail}</td>
                        <td>{d.address}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
