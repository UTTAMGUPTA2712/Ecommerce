import React, { useState } from 'react'
import { Avatar, Button, Switch, TableCell } from '@mui/material'
import { useSelector } from 'react-redux'
import { admin } from '../../data/constants'
import { useNavigate } from 'react-router-dom'

export const UserCard = ({ data, changeStatus }) => {
    const navigate = useNavigate()
    const userTitle = useSelector(state => state.user.user?.title)
    const [check, setCheck] = useState(data?.status)
    const handleUpdateStatus = async () => {
        changeStatus({ email: data?.email, status: check })
    }
    return (
        <>
            <TableCell align="left">
                <Avatar sx={{ height: "5rem", width: "5rem", fontSize: "3rem", margin: "1rem" }} src={data?.photo}>{data?.name?.[0]}</Avatar>
            </TableCell>
            <TableCell align="center">
                <span style={{ cursor: "pointer" }} onClick={() => navigate("/userdetail", { state: data })}>
                    <h2>{data?.name}</h2>
                    <h3>{data?.email}</h3>
                </span>
            </TableCell>
            {(data?.title) && <TableCell align="center">
                <h2>{data?.title}</h2>
            </TableCell>}
            <TableCell align="center">
                <p>Address : {data?.address?.[0]?.location}</p>
                <p>Location : {data?.address?.[0]?.city},{data?.address?.[0]?.state}</p>
                <p>Pincode : {data?.address?.[0]?.pincode}</p>
            </TableCell>
            <TableCell align="center">
                <h2>{data?.address?.[0]?.phone}</h2>
            </TableCell>
            <TableCell align="center">
                {(userTitle === admin) && <span>
                    <h3>{data?.status ? "ACTIVE" : "DISABLED"}</h3>
                    <Switch onClick={() => setCheck(!check)} defaultChecked={data?.status} />
                </span>}
                {(data?.status !== check) && <Button onClick={handleUpdateStatus} variant='contained' sx={{ backgroundColor: "red", fontWeight: "600" }} fullWidth>Update</Button>}
            </TableCell>
        </>
    )
}