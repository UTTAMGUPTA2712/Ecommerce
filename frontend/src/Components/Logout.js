import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/slice/authSlice'
import { ListItemText } from '@mui/material'

export const LogoutUser = () => {
    const dispatch=useDispatch()
    const logout=()=>{
        dispatch(logoutUser())
    }
  return (
        <ListItemText onClick={logout} id="logoutButton" primary="LOGOUT" />
  )
}
