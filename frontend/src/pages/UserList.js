import React, { useEffect, useState } from 'react'
import { GetUserList } from '../services/User/GetUserList'
import SearchAppBar from '../utils/SearchAppBar'
import { UserCard } from '../Components/Orders/UserCard'
import { Box, Button, Skeleton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, ButtonGroup } from '@mui/material'
import { UpdateUserStatusService } from '../services/User/UpdateUserStatusService'
import { admin, serverError, shipper, userDisabled, userEnabled, userconst, vendor } from '../data/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../redux/slice/messageSlice'

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
    const [userType, setUserType] = useState("ALL")
    const currentUser = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const changeStatus = async (data) => {
        const response = await UpdateUserStatusService(data)
        if (response.data === serverError) { dispatch(setMessage(serverError)) } else {

            dispatch(setMessage(data ? userDisabled : userEnabled))
            getuser()
        }
    }
    const getuser = () => {
        let timeout
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const getusers = async () => {
                const response = await GetUserList()
                if (response.data === serverError) { dispatch(setMessage(serverError)) } else {

                    console.log(response);
                    setUserList(response.data)
                }
            }
            getusers()
        }, 1000);
    }
    useEffect(() => {
        getuser()
    }, [])
    return (
        <>
            <div id='alluserlist'>
                <SearchAppBar />
                <div id='list'>
                    <ButtonGroup width={"100%"}>
                        <Button variant={userType === "ALL" ? "contained" : "outlined"} onClick={() => { setUserType("ALL") }}>ALL</Button>
                        <Button variant={userType === vendor ? "contained" : "outlined"} onClick={() => { setUserType(vendor) }}>VENDOR</Button>
                        <Button variant={userType === userconst ? "contained" : "outlined"} onClick={() => { setUserType(userconst) }}>USER</Button>
                        <Button variant={userType === shipper ? "contained" : "outlined"} onClick={() => { setUserType(shipper) }}>SHIPPER</Button>
                    </ButtonGroup>
                    {
                        (userList).length === 0 ? <>
                            {Array(8).fill().map((_, index) => (
                                <React.Fragment key={index}>
                                    {noData}
                                </React.Fragment>
                            ))}
                        </> :
                            <>
                                <TableContainer component={Paper}>
                                    <Table aria-label="spanning table">
                                        <TableHead >
                                            <TableRow sx={{ backgroundColor: "#0f0f0f" }} >
                                                <TableCell align="left"><Typography variant="h5" sx={{ color: "#f0f0f0" }}>#</Typography></TableCell>
                                                <TableCell align="center"><Typography variant="h5" sx={{ color: "#f0f0f0" }}>USER DETAIL</Typography></TableCell>
                                                <TableCell align="center"><Typography variant="h5" sx={{ color: "#f0f0f0" }}>USER TITLE</Typography></TableCell>
                                                <TableCell align="center"><Typography variant="h5" sx={{ color: "#f0f0f0" }}>ADDRESS</Typography></TableCell>
                                                <TableCell align="center"><Typography variant="h5" sx={{ color: "#f0f0f0" }}>PHONE NUMBER</Typography></TableCell>
                                                {currentUser?.title === admin && <TableCell align="center"><Typography variant="h5" sx={{ color: "#f0f0f0" }}>ACTIVE STATUS</Typography></TableCell>}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {userList.map(user => {
                                                return <TableRow hover selected={!user?.status}>{(userType === "ALL" || user?.title === userType) && (currentUser?.email !== user?.email) &&
                                                    <UserCard changeStatus={changeStatus} data={user} />}
                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>}
                </div>
            </div>
        </>
    )
}
export default UserList