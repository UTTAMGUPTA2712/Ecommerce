import React, { useEffect, useState } from 'react'
import { GetUserList } from '../services/GetUserList'
import SearchAppBar from '../Components/SearchAppBar'

const UserList = () => {
    const [userList, setUserList] = useState([])
    useEffect(() => {
        let timeout
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const getusers = async () => {
                const response = await GetUserList()
                console.log(response);
                setUserList(response.data)
            }
            getusers()
        }, 1000);
    }, [])
    return (
        <>
            <div>
                <SearchAppBar />
                {
                    (userList).length === 0 ? <></> :
                        userList.map(user => {
                            return <>
                                <h1>{user.name}</h1>
                            </>
                        })}
            </div>
        </>
    )
}
export default UserList