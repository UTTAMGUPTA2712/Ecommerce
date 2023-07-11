import axios from 'axios'
import React from 'react'

export const GoogleAuthService = (email) => {
  return axios.post("http://localhost:1000/Google",{email:email})
}
