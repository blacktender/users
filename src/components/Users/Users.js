import React, { useState, useEffect } from 'react'

import Error from '../Error'
import Loader from '../Loader'
import Table from '../Table'

import { baseUrl } from '../__data__/api-urls'

const Users = () => {
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => getUserList(), [])

    const getUserList = () => {
        fetch(baseUrl)
            .then(response => response.json())
            .then(json => {
                setList(json)
                setIsLoading(false)
            })
            .catch(err => setIsError(true))
    }

    const deleteUser = (id) => {
        fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        })
            .then(() => getUserList())
            .catch(err => setIsError(true))
    }

    const lastUserId = () => list.slice(-1)[0].id

    const addUser = () => {
        const nextUserId = lastUserId() + 1

        fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: nextUserId
            }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(() => getUserList())
            .catch(err => setIsError(true))
    }

    if (isError) {
        return <Error />
    }

    return (
        <div className="mt-4">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <button type="button" class="btn btn-success mb-2" onClick={addUser}>Add user</button>
                    <Table list={list} onDeleteUser={deleteUser} />
                </>
            )}
        </div>
    )
}

export default Users