import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/slice/authSlice'
import { ListItemText } from '@mui/material'
import { cleancart } from '../../redux/slice/cartSlice'
import { EditUserProfileService } from '../../services/User/EditUserProfileService'
import { serverError } from '../../data/constants'
import { setMessage } from '../../redux/slice/messageSlice'

export const LogoutUser = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const cart = useSelector(state => state.cart.cart)
  const newData = { ...user, cart: cart }
  const logout = async () => {
    try {
      const response = await EditUserProfileService(newData)
      if (response.data === serverError) {
        dispatch(setMessage(serverError))
      } else {
        dispatch(logoutUser())
        dispatch(cleancart())
      }
    } catch (error) {
      dispatch(setMessage(serverError))
    }
  }
  return (
    <ListItemText onClick={logout} id="logoutButton" primary="LOGOUT" />
  )
}
