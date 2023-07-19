import { TextField } from '@material-ui/core'
import { Add, DisabledByDefault } from '@mui/icons-material'
import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveAddress, saveName } from '../../redux/slice/authSlice'
import { EditUserProfileService } from '../../services/User/EditUserProfileService'
import { admin, vendor } from '../../data/constants'
import { useLocation, useNavigate, useHistory } from 'react-router-dom'
import ItemList from './ItemList'
import SearchAppBar from '../../utils/SearchAppBar'
import { setMessage } from '../../redux/slice/messageSlice'

const UserProfile = ({ data }) => {
    const location = useLocation()
    const navigate = useNavigate()
    if (!data) {
        data = location.state
    }
    const [edit, setEdit] = useState(true)
    let user = useSelector(state => state.user.user)
    const [address, setaddress] = useState({})
    const dispatch = useDispatch()
    const [username, setName] = useState(data?.name)
    const [dataAddress, setDataAddress] = useState(data?.address)
    const [password, setPassword] = useState(data?.password)
    const changeAddress = (title, value) => {
        if (!(title === "phone" && value?.length === 11)) {
            setaddress(p => ({ ...p, [title]: value }))
        } else {
            dispatch(setMessage({ message: "Phone Number Cannot Be More Than 10 Digit", severity: "info" }))
        }
    }
    const handleAddress = () => {
        if (address?.phone && address?.location && address?.city && address?.state && address?.pincode) {
            if (address?.phone?.length < 10) {
                dispatch(setMessage({ message: "Please Enter A Valid Phone Number", severity: "info" }))
            } else {
                setDataAddress(p => [...p, address])
                setaddress({})
            }
        } else {
            dispatch(setMessage({ message: "Please Fill All The Fields Of Address", severity: "info" }))
        }
    }
    const RemoveExistingAddress = (index) => {
        let arr = [...dataAddress]
        arr.splice(index, 1)
        setDataAddress(arr)
        dispatch(setMessage({ message: "Address Removed", severity: "error" }))
    }
    const changeExistingAddress = (index, title, value) => {
        if (!(title === "phone" && value?.length === 11)) {
            let arr = [...dataAddress]
            arr[index][title] = value
            setDataAddress(arr ?? [])
        } else {
            dispatch(setMessage({ message: "Phone Number Cannot Be More Than 10 Digit", severity: "info" }))
        }

    }
    const savedata = async () => {
        dispatch(saveName(username))
        dispatch(saveAddress(dataAddress))
        setEdit(true)
        let sendingData = { ...data, address: dataAddress, name: username, password: password }
        setTimeout(async () => {
            await EditUserProfileService(sendingData)
        }, 1000)
        dispatch(setMessage({ message: "Saved Update", severity: "success" }))
        if (location.state === "goback") {
            navigate("/checkout")
        }
    }
    const handleCancel = () => {
        setEdit(true);
        setName(data?.name)
        setDataAddress(data?.address)
    }
    return (
        <>
            <div id='profile'>
                <SearchAppBar />
                <div id='profileDetail'>
                    <div id='grid'>
                        <div id='detail'>
                            <Avatar sx={{ bgcolor: "#2196f3", fontSize: "10rem", height: "14rem", width: "14rem" }} src={data?.photo} >{(data?.name?.[0])?.toUpperCase()}</Avatar>
                            {(edit) ?
                                <div style={{ fontSize: "2rem" }}>
                                    <h2>{(data?.name).toUpperCase()}</h2>
                                    <h3>Email : {data?.email}</h3>
                                    <h3>Password : {data?.password}</h3>
                                </div>
                                :
                                <>
                                    <TextField fullWidth onChange={(e) => setName(e.target.value)} value={username} label="EDIT NAME" variant='outlined' />
                                    <TextField fullWidth onChange={(e) => setPassword(e.target.value)} value={password} label="EDIT PASSWORD" variant='outlined' />
                                </>}
                            {(data.email === user?.email || user?.title === admin) && (edit) ? <Button fullWidth variant='contained' sx={{ bgcolor: "grey", gridColumn: "1/SPAN 2" }} onClick={() => setEdit(false)}>ADD/UPDATE DELIVERY ADDRESS</Button> :
                                <><Button fullWidth variant='contained' sx={{ bgcolor: "grey" }} onClick={handleCancel}>CANCEL</Button><Button fullWidth variant='contained' sx={{ bgcolor: "grey" }} onClick={savedata}>SAVE</Button></>}
                        </div>
                        <div id='addressdiv'>
                            <h1 style={{
                                textAlign: "center", margin: 0, backgroundColor: "#00b0ff",
                                boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
                            }}>DELIVERY ADDRESS</h1>
                            {dataAddress.map((userAddress, index) => {
                                return <>
                                    <div className='address'>
                                        <TextField style={{ gridColumn: "1/span 2" }} disabled={edit} onChange={(e) => changeExistingAddress(index, "location", e.target.value)} label="ADDRESS" value={userAddress?.location} variant="filled" />
                                        <TextField disabled={edit} type='number' onChange={(e) => changeExistingAddress(index, "phone", e.target.value)} label="PHONE NUMBER" value={userAddress?.phone} variant="filled" />
                                        <TextField disabled={edit} onChange={(e) => changeExistingAddress(index, "city", e.target.value)} label="CITY" value={userAddress?.city} variant="filled" />
                                        <TextField disabled={edit} type='number' onChange={(e) => changeExistingAddress(index, "pincode", e.target.value)} label="PINCODE" value={userAddress?.pincode} variant="filled" />
                                        <TextField disabled={edit} onChange={(e) => changeExistingAddress(index, "state", e.target.value)} label="STATE" value={userAddress?.state} variant="filled" />
                                        {(!edit) && <Button sx={{ backgroundColor: "tomato", color: "white", gridColumn: "1/span 2" }} fullWidth onClick={(e) => { RemoveExistingAddress(index) }}><DisabledByDefault /></Button>}
                                    </div>
                                </>
                            })}
                            {(!edit) &&
                                <div className='address'>
                                    <TextField style={{ gridColumn: "1/span 2" }} label="ADD NEW ADDRESS" onChange={(e) => changeAddress("location", e.target.value)} value={address?.location ?? ""} variant="outlined" />
                                    <TextField label="ADD A PHONE NUMBER" type='number' onChange={(e) => changeAddress("phone", e.target.value)} value={address?.phone ?? ""} variant="outlined" />
                                    <TextField label="ADD CITY" onChange={(e) => changeAddress("city", e.target.value)} value={address?.city ?? ""} variant="outlined" />
                                    <TextField type='number' label="ADD PINCODE" onChange={(e) => changeAddress("pincode", e.target.value)} value={address?.pincode ?? ""} variant="outlined" />
                                    <TextField label="ADD STATE" onChange={(e) => changeAddress("state", e.target.value)} value={address?.state ?? ""} variant="outlined" />
                                    <Button sx={{ backgroundColor: "green", color: "white", gridColumn: "1/span 2" }} fullWidth onClick={() => handleAddress()}><Add /></Button>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        {(data?.title === vendor || data?.title === admin) && <><h1
                            style={{
                                textAlign: "center",
                                backgroundColor: "#00b0ff",
                                boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
                            }}>USER ITEMS</h1></>}
                        <ItemList userdata={data} /></div>
                </div>
            </div>
        </>
    )
}

export default UserProfile