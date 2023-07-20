import React, { useState } from 'react'
import { AddUser } from '../services/Auth/SignupService'
import { GoogleAuth } from '../utils/googleAuth.js'
import userIcon from "../assets/Images/user.png"
import vendorIcon from "../assets/Images/vendor.png"
import shipperIcon from "../assets/Images/shipper.png"

import { Button, TextField } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveUser } from '../redux/slice/authSlice'
import { disableUser, invalidEmail, logUser, passwordDoNotMatch, serverError, shipper, userAlreadyExist, userEmailAlreadyExist, userPhonePumberAlreadyExist, userconst, vendor } from '../data/constants'
import { setMessage } from '../redux/slice/messageSlice'
import { setCart } from '../redux/slice/cartSlice'
const titles = [userconst, vendor, shipper]
const Signup = () => {
    const [password, setPassword] = useState("")
    const [formData, setFormData] = useState({})
    const [choice, setChoice] = useState(0)
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
                    const data = await AddUser({ ...formData, title: titles[choice] })
                    if (data.data === false) {
                        dispatch(setMessage(disableUser))
                    } else if (data.data === userEmailAlreadyExist || data.data === userPhonePumberAlreadyExist || data.data === serverError) {
                        dispatch(setMessage(data.data))
                    } else {
                        dispatch(setMessage(logUser))
                        dispatch(saveUser(data.data))
                        dispatch(setCart(data.data?.cart))
                        navigate("/")
                    }
                } else {
                    dispatch(setMessage(passwordDoNotMatch))
                }
            } else {
                dispatch(setMessage(invalidEmail))
            }
        } else {
            setvalid(true)
        }
    }
    const GoolgeSignup = async () => {
        const data = await GoogleAuth(titles[choice])
        if (data.data === serverError) { dispatch(setMessage(serverError)) } else {
            console.log(data);
            if (data.data === false) {
                dispatch(setMessage(disableUser))
            } else {
                dispatch(setMessage(logUser))
                dispatch(saveUser(data.data))
                dispatch(setCart(data.data?.cart))
                navigate("/")
            }
        }
    }
    console.log(formData)
    const handlephonenumber = (e) => {
        if (e.target.value.length <= 10) {
            ChangeFormData("phoneNumber", e.target.value)
        } else {
            dispatch(setMessage({ message: "Phone Number Cannot Be More Than 10 Digit", severity: "info" }))
        }
    }
    return (
        <>
            <div className='flexcontainer'>
                <div className='cssdiv'>
                    <div className='contain'>
                        <div className='formdiv' id='Signup'>
                            <h1>
                                Create new account<span className="blue">.</span>
                            </h1>
                            <h3>
                                Already A Member?{" "}
                                <span className="blue" onClick={() => navigate("/")}>
                                    Log in
                                </span>
                            </h3>
                            <h4>Choose a Role</h4>
                            <span>
                                <img onClick={() => setChoice(0)} className={choice === 0 ? "selected" : "unselected"} src={userIcon} alt="" />
                                <img onClick={() => setChoice(1)} className={choice === 1 ? "selected" : "unselected"} src={vendorIcon} alt="" />
                                <img onClick={() => setChoice(2)} className={choice === 2 ? "selected" : "unselected"} src={shipperIcon} alt="" />
                                <h2>{titles[choice].toUpperCase()}</h2>
                            </span>
                            <TextField
                                error={!formData?.name && valid}
                                helperText={(!formData?.name && valid) ? "Name is required" : ""}
                                id="outlined-basic"
                                value={formData?.name}
                                style={{ backgroundColor: "#323644", color: "white" }}

                                onChange={(e) => ChangeFormData("name", e.target.value)}
                                label="Enter Name"
                                variant="outlined"
                            />

                            <TextField
                                error={!formData?.email && valid}
                                helperText={(!formData?.email && valid) ? "Email is required" : ""}
                                id="outlined-basic"
                                value={formData?.email}
                                style={{ backgroundColor: "#323644", color: "white" }}

                                onChange={(e) => ChangeFormData("email", e.target.value)}
                                label="Enter Email"
                                variant="outlined"
                            />

                            <TextField
                                error={!formData?.phoneNumber && valid}
                                helperText={(!formData?.phoneNumber && valid) ? "Phone Number is required" : ""}
                                id="outlined-basic"
                                type='number'
                                style={{ backgroundColor: "#323644", color: "white" }}

                                value={formData?.phoneNumber}
                                onChange={(e) => handlephonenumber(e)}
                                label="Enter Phone Number"
                                variant="outlined"
                            />

                            <TextField
                                error={!formData?.password && valid}
                                helperText={(!formData?.password && valid) ? "Password is required" : ""}
                                id="outlined-basic"
                                style={{ backgroundColor: "#323644", color: "white" }}

                                value={formData?.password}
                                onChange={(e) => ChangeFormData("password", e.target.value)}
                                label="Enter Password"
                                variant="outlined"
                            />

                            <TextField
                                error={(password !== formData?.password) && valid}
                                style={{ backgroundColor: "#323644", color: "white" }}

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
                                style={{ backgroundColor: "#1e90f5", color: "white" }}
                                size="large"
                                variant="outlined"
                            >
                                Signup
                            </Button>

                            <Button

                                color="tertiary"
                                disabled={false}
                                style={{ backgroundColor: "white", color: "#1e90f5" }}
                                size="large"
                                onClick={GoolgeSignup}
                                variant="outlined"
                            >
                                Signup With Google
                            </Button>
                            <p style={{ textAlign: "center", color: "lightgrey" }}>please choose the type of user before signing up with google</p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup