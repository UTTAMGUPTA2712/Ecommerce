import React, { useEffect, useState } from 'react'
import { GetUserList } from '../services/GetUserList'
import SearchAppBar from '../Components/SearchAppBar'
import { UserCard } from '../Components/UserCard'
import { Box, Skeleton } from '@mui/material'
import { UpdateUserStatusService } from '../services/UpdateUserStatusService'

const noData = <Box sx={{ height: "10rem", width: "60%", display: "flex" }}>
    <Skeleton variant="circular" width={"8rem"} height={"8rem"} sx={{ marginRight: "1rem" }} />
    <span>
        <Skeleton variant="text" width={"20rem"} sx={{ fontSize: '2rem' }} />
        <Skeleton variant="text" width={"15rem"} sx={{ fontSize: '3rem' }} />
        <Skeleton variant="text" width={"20rem"} sx={{ fontSize: '3rem' }} />
    </span>

</Box>
const UserList = () => {
    const [userList, setUserList] = useState([])
    const changeStatus=async(data)=>{
        await UpdateUserStatusService(data)
    }
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
    }, [changeStatus])
    return (
        <>
            <div>
                <SearchAppBar />
                {
                    (userList).length === 0 ? <>
                        {Array(8).fill().map((_, index) => (
                            <React.Fragment key={index}>
                                {noData}
                            </React.Fragment>
                        ))}
                    </> :
                        userList.map(user => {
                            return <>
                                <UserCard changeStatus={changeStatus} data={user} />
                            </>
                        })
                }
            </div>
        </>
    )
}
export default UserList