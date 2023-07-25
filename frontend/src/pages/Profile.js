import React from 'react'
import { useSelector } from 'react-redux'
import UserProfile from '../Components/UserInterface/UserProfile'
const Profile = () => {
  const user = useSelector(state => state.user.user)
  return (
    <>
      <UserProfile data={user} />
    </>
  )
}

export default Profile