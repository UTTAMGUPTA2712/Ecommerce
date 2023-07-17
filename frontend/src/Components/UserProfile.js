import { TextField } from '@material-ui/core'
import { Add, DisabledByDefault } from '@mui/icons-material'
import { Avatar, Button, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveAddress, saveName } from '../redux/slice/authSlice'
import { EditUserProfileService } from '../services/User/EditUserProfileService'
import { admin, vendor } from '../data/constants'
import { useLocation } from 'react-router-dom'
import ItemList from './ItemList'
import SearchAppBar from '../utils/SearchAppBar'

const UserProfile = ({ data }) => {
    const location = useLocation()
    if (!data) {
        data = location.state
    }
    const [edit, setEdit] = useState(true)
    let user = useSelector(state => state.user.user)
    const [address, setaddress] = useState({})
    const dispatch = useDispatch()
    const [username, setName] = useState(data?.name)
    const changeAddress = (title, value) => {
        setaddress(p => ({ ...p, [title]: value }))
    }
    const [dataAddress, setDataAddress] = useState(data?.address)
    const handleAddress = () => {
        setDataAddress(p => [...p, address])
        setaddress({})
    }
    const RemoveExistingAddress = (index) => {
        let arr = [...dataAddress]
        arr.splice(index, 1)
        setDataAddress(arr)
    }
    const changeExistingAddress = (index, title, value) => {
        let arr = [...dataAddress]
        arr[index][title] = value
        setDataAddress(arr ?? [])
    }
    const savedata = async () => {
        dispatch(saveName(username))
        dispatch(saveAddress(dataAddress))
        setEdit(true)
        let sendingData = { ...data }
        sendingData.address = dataAddress
        setTimeout(async () => {
            await EditUserProfileService(sendingData)
        }, 1000)
    }
    return (
        <>
            <div id='profile'>
                <SearchAppBar />
                <div id='profileDetail'>
                <div>
                    <Avatar sx={{ bgcolor: "blue", fontSize: "5rem", height: "6rem", width: "6rem" }} src={data?.photo} >{(data?.name?.[0])?.toUpperCase()}</Avatar>
                    {(edit) ? <h1>{(data?.name).toUpperCase()}</h1> : <><TextField onChange={(e) => setName(e.target.value)} value={username} label="EDIT NAME" variant='outlined' /><br /></>}
                    {(data.email === user?.email || user?.title === admin) && (edit) ? <Button variant='contained' sx={{ bgcolor: "grey" }} onClick={() => setEdit(false)}>ADD/UPDATE DELIVERY ADDRESS</Button> :
                        <Button variant='contained' sx={{ bgcolor: "grey" }} onClick={savedata}>SAVE</Button>}
                </div>
                <div>
                    {dataAddress.map((userAddress, index) => {
                        return <>
                            <div className='address'>
                                <TextField disabled={edit} id="filled-basic" onChange={(e) => changeExistingAddress(index, "phone", e.target.value)} label="PHONE NUMBER" value={userAddress?.phone} variant="filled" />
                                <TextField disabled={edit} id="filled-basic" onChange={(e) => changeExistingAddress(index, "location", e.target.value)} label="ADDRESS" value={userAddress?.location} variant="filled" />
                                <TextField disabled={edit} id="filled-basic" onChange={(e) => changeExistingAddress(index, "city", e.target.value)} label="CITY" value={userAddress?.city} variant="filled" />
                                <TextField disabled={edit} id="filled-basic" type='number' onChange={(e) => changeExistingAddress(index, "pincode", e.target.value)} label="PINCODE" value={userAddress?.pincode} variant="filled" />
                                <TextField disabled={edit} id="filled-basic" onChange={(e) => changeExistingAddress(index, "state", e.target.value)} label="STATE" value={userAddress?.state} variant="filled" />
                                {(!edit) && <IconButton onClick={(e) => { RemoveExistingAddress(index) }}><DisabledByDefault /></IconButton>}
                            </div>
                        </>
                    })}
                    {(!edit) &&
                        <div className='address'>
                            <TextField id="filled-basic" label="ADD A PHONE NUMBER" onChange={(e) => changeAddress("phone", e.target.value)} value={address?.phone ?? ""} variant="filled" />
                            <TextField id="filled-basic" label="ADD NEW ADDRESS" onChange={(e) => changeAddress("location", e.target.value)} value={address?.location ?? ""} variant="filled" />
                            <TextField id="filled-basic" label="ADD CITY" onChange={(e) => changeAddress("city", e.target.value)} value={address?.city ?? ""} variant="filled" />
                            <TextField id="filled-basic" type='number' label="ADD PINCODE" onChange={(e) => changeAddress("pincode", e.target.value)} value={address?.pincode ?? ""} variant="filled" />
                            <TextField id="filled-basic" label="ADD STATE" onChange={(e) => changeAddress("state", e.target.value)} value={address?.state ?? ""} variant="filled" />
                            <IconButton onClick={() => handleAddress()}><Add /></IconButton>
                        </div>
                    }
                </div>
                {data?.title === vendor && <h1>USER ITEMS</h1>}
                <ItemList userdata={data} />
                </div>
            </div>
        </>
    )
}

export default UserProfile