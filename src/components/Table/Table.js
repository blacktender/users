import React from 'react'

const Table = ({ list, onDeleteUser }) => {
    const deleteUser = (id) => onDeleteUser(id)

    return (
        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Usename</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item) => (
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.username}</td>
                        <td>@{item.email}</td>
                        <td>
                            <button type="button" class="btn btn-danger" onClick={deleteUser.bind(null, item.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table