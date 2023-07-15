import React, { useState } from 'react'
import { AddUser } from '../services/AddUser'
import { GoogleAuth } from '../utils/googleAuth.js'
import userIcon from "../assets/Images/user.png"
import { Button, TextField } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveUser } from '../redux/slice/authSlice'
import { userAlreadyExist } from '../data/constants'
import { setMessage } from '../redux/slice/messageSlice'
const Signup = () => {
    const [password, setPassword] = useState("")
    const [formData, setFormData] = useState({})
    const [choice, setChoice] = useState(1)
    const [valid, setvalid] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ChangeFormData = (title, value) => {
        setFormData(p => ({ ...p, [title]: value }))
    }
    const HandleSignup = async () => {
        if (formData?.name && formData?.email && formData?.phoneNumber && formData?.password) {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email)) {
                if (formData?.password === password) {
                    const data = await AddUser(formData)
                    if (data.data === userAlreadyExist) {
                        dispatch(setMessage({ message: userAlreadyExist, severity: "warning" }))
                    } else {
                        dispatch(setMessage({ message: "Successfully Logged In", severity: "success" }))
                        dispatch(saveUser(data.data))
                        navigate("/")
                    }
                } else {
                    dispatch(setMessage({ message: "Password do not match", severity: "info" }))
                }
            } else {
                dispatch(setMessage({ message: "Invalid Email", severity: "info" }))
            }
        } else {
            setvalid(true)
        }
    }
    const GoolgeSignup = async () => {
        const data = await GoogleAuth()
        dispatch(setMessage({ message: "Successfully Logged In", severity: "success" }))
        dispatch(saveUser(data))
        navigate("/")
    }
    console.log(formData)
    const handlephonenumber = (e) => {
        // console.log("vjvj", formData?.phoneNumber, e);
        if (e.target.value.length <= 10) {
            ChangeFormData("phoneNumber", e.target.value)
        }
    }
    return (
        <>
            <div className='flexcontainer'>
                <div className='formdiv' id='Signup'>
                    <h1>
                        Create new account<span className="blue">.</span>
                    </h1>
                    <h1 level={3}>
                        Already A Member?{" "}
                        <span className="blue" onClick={() => navigate("/")}>
                            Log in
                        </span>
                    </h1>
                    <span>
                        <img onClick={() => setChoice(1)} className={choice === 1 ? "selected" : ""} src={userIcon} alt="" />
                        <img onClick={() => setChoice(2)} className={choice === 2 ? "selected" : ""} src={userIcon} alt="" />
                        <img onClick={() => setChoice(3)} className={choice === 3 ? "selected" : ""} src={userIcon} alt="" />
                        <h1>{choice == 1 ? "User" : (choice == 2 ? "Vendor" : "Shipment")}</h1>
                    </span>
                    <TextField
                        error={!formData?.name && valid}
                        helperText={(!formData?.name && valid) ? "Name is required" : ""}
                        id="outlined-basic"
                        value={formData?.name}
                        onChange={(e) => ChangeFormData("name", e.target.value)}
                        label="Enter Name"
                        variant="outlined"
                    />

                    <TextField
                        error={!formData?.email && valid}
                        helperText={(!formData?.email && valid) ? "Email is required" : ""}
                        id="outlined-basic"
                        value={formData?.email}
                        onChange={(e) => ChangeFormData("email", e.target.value)}
                        label="Enter Email"
                        variant="outlined"
                    />

                    <TextField
                        error={!formData?.phoneNumber && valid}
                        helperText={(!formData?.phoneNumber && valid) ? "Phone Number is required" : ""}
                        id="outlined-basic"
                        type='number'
                        value={formData?.phoneNumber}
                        onChange={(e) => handlephonenumber(e)}
                        label="Enter Phone Number"
                        variant="outlined"
                    />

                    <TextField
                        error={!formData?.password && valid}
                        helperText={(!formData?.password && valid) ? "Password is required" : ""}
                        id="outlined-basic"
                        value={formData?.password}
                        onChange={(e) => ChangeFormData("password", e.target.value)}
                        label="Enter Password"
                        variant="outlined"
                    />

                    <TextField
                        error={(password !== formData?.password) && valid}
                        helperText={(password !== formData?.password) && valid ? "Passwords do not match" : ""}
                        id="outlined-basic"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Re-Enter Password"
                        variant="outlined"
                    />

                    <Button
                        color="tertiary"
                        disabled={false}
                        onClick={HandleSignup}
                        size="large"
                        variant="outlined"
                    >
                        Signup
                    </Button>

                    <Button
                        color="tertiary"
                        disabled={false}
                        size="large"
                        onClick={GoolgeSignup}
                        variant="outlined"
                    >
                        Signup With Google
                    </Button>
                    <p>please choose the type of user before signing up with google</p>

                </div>
            </div>
        </>
    )
}

export default Signup