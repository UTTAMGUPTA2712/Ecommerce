import { useState } from 'react'
import { LoginService } from '../services/Auth/LoginService'
import { useDispatch } from 'react-redux'
import { GoogleAuth } from '../utils/googleAuth'
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { saveUser } from '../redux/slice/authSlice';
import { setMessage } from '../redux/slice/messageSlice';
import { disableUser, logUser, userNotFound, userconst, wrongPassword } from '../data/constants';
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
      } else if (response.data === userNotFound || response.data === wrongPassword) {
        dispatch(setMessage(response.data))
      } else {
        dispatch(setMessage(logUser))
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
      dispatch(setMessage(disableUser))
    } else if (data?.data) {
      dispatch(setMessage(logUser))
      dispatch(saveUser(data.data))
      navigate("/")
    }

  }
  return (
    <>
      <div className='flexcontainer'>
        <div className='contain'>
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
                        
            <TextField id="outlined-basic" style={{backgroundColor:"rgb(187, 182, 255)"}}defaultValue={user} onChange={(e) => setuser(e.target.value)} label="Phone Number/Email" variant="outlined" />
            <TextField id="outlined-basic"style={{backgroundColor:"rgb(187, 182, 255)"}} defaultValue={password} onChange={(e) => setpassword(e.target.value)} label="Password" variant="outlined" />
            <Button color="secondary" style={{backgroundColor:"rgb(187, 182, 255)"}}disabled={!(user && password)} onClick={handleManualLogin} size="large" variant="outlined">Login</Button>
            <Button color="secondary"style={{backgroundColor:"rgb(187, 182, 255)"}} disabled={false} size="large" onClick={googleLogin} variant="outlined">Login With Google</Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login