import React, { useState } from 'react'
import { AddUser } from '../services/Auth/SignupService'
import { GoogleAuth } from '../utils/googleAuth.js'
import userIcon from "../assets/Images/user.png"
import { Button, TextField } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveUser } from '../redux/slice/authSlice'
import { disableUser, invalidEmail, logUser, passwordDoNotMatch, shipper, userAlreadyExist, userconst, vendor } from '../data/constants'
import { setMessage } from '../redux/slice/messageSlice'
const titles = [userconst, vendor, shipper]
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
                    const data = await AddUser({ ...formData, title: titles[choice] })
                    if (data.data === false) {
                        dispatch(setMessage(disableUser))
                    } else if (data.data === userAlreadyExist) {
                        dispatch(setMessage(userAlreadyExist))
                    } else {
                        dispatch(setMessage(logUser))
                        dispatch(saveUser(data.data))
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
        console.log(data);
        if (data.data === false) {
            dispatch(setMessage(disableUser))
        } else {
            dispatch(setMessage(logUser))
            dispatch(saveUser(data.data))
            navigate("/")
        }
    }
    console.log(formData)
    const handlephonenumber = (e) => {
        if (e.target.value.length <= 10) {
            ChangeFormData("phoneNumber", e.target.value)
        }
    }
    return (
        <>
            <div className='flexcontainer'>
                <div className='contain'>
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
                        <img onClick={() => setChoice(0)} className={choice === 0 ? "selected" : ""} src={userIcon} alt="" />
                        <img onClick={() => setChoice(1)} className={choice === 1 ? "selected" : ""} src={userIcon} alt="" />
                        <img onClick={() => setChoice(2)} className={choice === 2 ? "selected" : ""} src={userIcon} alt="" />
                        <h1>{titles[choice].toUpperCase()}</h1>
                    </span>
                    <TextField
                        error={!formData?.name && valid}
                        helperText={(!formData?.name && valid) ? "Name is required" : ""}
                        id="outlined-basic"
                        value={formData?.name}
                        style={{backgroundColor:"rgb(187, 182, 255)"}}

                        onChange={(e) => ChangeFormData("name", e.target.value)}
                        label="Enter Name"
                        variant="outlined"
                    />

                    <TextField
                        error={!formData?.email && valid}
                        helperText={(!formData?.email && valid) ? "Email is required" : ""}
                        id="outlined-basic"
                        value={formData?.email}
                        style={{backgroundColor:"rgb(187, 182, 255)"}}

                        onChange={(e) => ChangeFormData("email", e.target.value)}
                        label="Enter Email"
                        variant="outlined"
                    />

                    <TextField
                        error={!formData?.phoneNumber && valid}
                        helperText={(!formData?.phoneNumber && valid) ? "Phone Number is required" : ""}
                        id="outlined-basic"
                        type='number'
                        style={{backgroundColor:"rgb(187, 182, 255)"}}

                        value={formData?.phoneNumber}
                        onChange={(e) => handlephonenumber(e)}
                        label="Enter Phone Number"
                        variant="outlined"
                    />

                    <TextField
                        error={!formData?.password && valid}
                        helperText={(!formData?.password && valid) ? "Password is required" : ""}
                        id="outlined-basic"
                        style={{backgroundColor:"rgb(187, 182, 255)"}}

                        value={formData?.password}
                        onChange={(e) => ChangeFormData("password", e.target.value)}
                        label="Enter Password"
                        variant="outlined"
                    />

                    <TextField
                        error={(password !== formData?.password) && valid}
                        style={{backgroundColor:"rgb(187, 182, 255)"}}
                        
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
                        style={{backgroundColor:"rgb(187, 182, 255)"}}
                        size="large"
                        variant="outlined"
                    >
                        Signup
                    </Button>

                    <Button
                    
                        color="tertiary"
                        disabled={false}
                        style={{backgroundColor:"rgb(187, 182, 255)"}}
                        size="large"
                        onClick={GoolgeSignup}
                        variant="outlined"
                    >
                        Signup With Google
                    </Button>
                    <p style={{textAlign:"center"}}>please choose the type of user before signing up with google</p>

                </div>
                </div>
            </div>
        </>
    )
}

export default Signup