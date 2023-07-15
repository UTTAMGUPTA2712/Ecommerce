import React, { useState } from 'react'
import { AddressSelector } from './AddresSelector'
import { Box, Button, Switch } from '@mui/material'
import { UpdateUserStatusService } from '../services/UpdateUserStatusService'

export const UserCard = ({ data, changeStatus }) => {
    const [value, setValue] = useState(data?.address?.[0])
    const [check, setCheck] = useState(data?.status)
    const changeValue = (address) => {
        setValue(address)
    }
    const handleUpdateStatus = async () => {
        changeStatus({ email: data?.email, status: check })
    }
    return (
        <>
            <Box width={"60%"} sx={{ border: "2px solid", borderColor: (data?.status === check) ? "black" : "red" }} >
                <Box sx={{ color: (data?.status) ? "black" : "red", display: "flex", justifyContent: "space-between" }}>
                    <img src={data?.photo} />
                    <span>
                        <h1>{data?.name}</h1>
                        <h2>{data?.email}</h2>
                    </span>
                    <span>
                        <h3>{data?.status ? "ACTIVE" : "DISABLED"}</h3>
                        <Switch onClick={() => setCheck(!check)} defaultChecked={data?.status} />
                    </span>
                </Box>
                {(data?.status !== check) && <Button onClick={handleUpdateStatus} variant='contained' sx={{ backgroundColor: "red", fontWeight: "600" }} fullWidth>Update</Button>}
            </Box>
        </>
    )
}
