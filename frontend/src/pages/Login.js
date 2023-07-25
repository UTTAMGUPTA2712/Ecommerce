import { useState } from 'react'
import { LoginService } from '../services/Auth/LoginService'
import { useDispatch } from 'react-redux'
import { GoogleAuth } from '../utils/googleAuth'
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { saveUser } from '../redux/slice/authSlice';
import { setMessage } from '../redux/slice/messageSlice';
import { disableUser, logUser, serverError, userNotFound, userconst, wrongPassword } from '../data/constants';
import { setCart } from '../redux/slice/cartSlice';
const Login = () => {
  const [user, setuser] = useState("")
  const [password, setpassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleManualLogin = async () => {
    try {
      const response = await LoginService({ user: user, password: password })
      if (response.data === false) {
        dispatch(setMessage(disableUser))
      } else if (response.data === userNotFound || response.data === wrongPassword || response.data === serverError) {
        dispatch(setMessage(response.data))
      } else {
        dispatch(setMessage(logUser))
        dispatch(saveUser(response.data))
        dispatch(setCart(response.data?.cart))
        navigate("/")
      }
    } catch (err) {
      console.log(err)
    }
  }
  const googleLogin = async () => {
    const data = await GoogleAuth(userconst)
    if (data.data === serverError) { dispatch(setMessage(serverError)) } else {
      console.log(data);
      if (data.data === false) {
        dispatch(setMessage(disableUser))
      } else if (data?.data) {
        dispatch(setMessage(logUser))
        dispatch(saveUser(data.data))
        dispatch(setCart(data.data?.cart))
        navigate("/")
      }
    }

  }
  return (
    <>
      <div className='flexcontainer'>
        <div className='cssdiv'>
          <div className='contain'>
            <div className='formdiv' id='login'>
              <h1>
                Welcome back<span className="blue">!</span>
              </h1>
              <h4>
                New Here?{" "}
                <span className="blue" onClick={() => navigate("signup")}>
                  Create A New Account
                </span>
              </h4>
              <br />
              <TextField id="outlined-basic" style={{ backgroundColor: "#323644", color: "white" }} defaultValue={user} onChange={(e) => setuser(e.target.value)} label="Phone Number/Email" variant="outlined" />
              <TextField type='password' id="outlined-basic" style={{ backgroundColor: "#323644", color: "white" }} defaultValue={password} onChange={(e) => setpassword(e.target.value)} label="Password" variant="outlined" />
              <Button color="secondary" style={{ backgroundColor: "#1e90f5", color: "white" }} disabled={!(user && password)} onClick={handleManualLogin} size="large" variant="outlined">Login</Button>
              <Button color="secondary" style={{ backgroundColor: "white", color: "#1e90f5" }} disabled={false} size="large" onClick={googleLogin} variant="outlined">Login With Google</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login