import axios from 'axios'
import React from 'react'

export const UpdateUserStatusService = (data) => {
  return axios.post("http://localhost:1000/updateuserstatus",data)
}
