import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import UserProfile from '../Components/UserProfile'
import SearchAppBar from '../Components/SearchAppBar'

const Profile = () => {
    const user=useSelector(state=>state.user.user)
  return (
    <>
    <SearchAppBar/>
      <UserProfile data={user}/>
    </>
  )
}

export default Profile