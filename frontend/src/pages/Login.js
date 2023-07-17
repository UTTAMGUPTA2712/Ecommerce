import { useState } from 'react'
import { LoginService } from '../services/Auth/LoginService'
import { useDispatch } from 'react-redux'
import { GoogleAuth } from '../utils/googleAuth'
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { saveUser } from '../redux/slice/authSlice';
import { setMessage } from '../redux/slice/messageSlice';
import { userNotFound, userconst, wrongPassword } from '../data/constants';
const Login = () => {
  const [user, setuser] = useState("")
  const [password, setpassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleManualLogin = async () => {
    try {
      const response = await LoginService({ user: user, password: password })
      if (response.data === false) {
        dispatch(setMessage({ message: "User Disabled!! Please Contact Customer Care!", severity: "info" }))
      } else if (response.data === userNotFound) {
        dispatch(setMessage({ message: userNotFound, severity: "error" }))
      } else if (response.data === wrongPassword) {
        dispatch(setMessage({ message: wrongPassword, severity: "error" }))
      } else {
        dispatch(setMessage({ message: "Successfully Logged In", severity: "success" }))
        dispatch(saveUser(response.data))
        navigate("/")
      }
    } catch (err) {
      console.log(err)
    }
  }
  const googleLogin = async () => {
    const data = await GoogleAuth(userconst)
    console.log(data);
    if (data.data === false) {
      dispatch(setMessage({ message: "User Disabled Please Contact Customer Care!", severity: "info" }))
    } else if(data?.data) {
      dispatch(setMessage({ message: "Successfully Logged In", severity: "success" }))
      dispatch(saveUser(data.data))
      navigate("/")
    }

  }
  return (
    <>
      <div className='flexcontainer'>
        <div className='formdiv' id='login'>
          <h1>
            Welcome back<span className="blue">!</span>
          </h1>
          <h1 level={3}>
            New Here?{" "}
            <span className="blue" onClick={() => navigate("signup")}>
              Create A New Account
            </span>
          </h1>
          <TextField id="outlined-basic" defaultValue={user} onChange={(e) => setuser(e.target.value)} label="Phone Number/Email" variant="outlined" />
          <TextField id="outlined-basic" defaultValue={password} onChange={(e) => setpassword(e.target.value)} label="Password" variant="outlined" />
          <Button color="secondary" disabled={!(user && password)} onClick={handleManualLogin} size="large" variant="outlined">Login</Button>
          <Button color="secondary" disabled={false} size="large" onClick={googleLogin} variant="outlined">Login With Google</Button>
        </div>
      </div>
    </>
  )
}
export default Login