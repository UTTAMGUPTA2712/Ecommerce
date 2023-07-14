import React, { useState } from 'react'
import { AddressSelector } from './AddresSelector'
import { useSelector } from 'react-redux'

const UserDetails = ({ data }) => {
    const value = useSelector(state => state.user.address)
    // const changeValue = (index) => {
    //     setValue(data?.address[index])
    // }
    return (
        <>
            <div style={{display:"flex"}}>
                <img src={data?.photo} />
                <span>
                <h1>{data?.name}</h1>
                <AddressSelector/></span>
            </div>
            <p>Shipping details</p>
            <hr />
            <table>
                <tr>
                    <td>Address</td>
                    <td>{value?.location}</td>
                </tr>
                <tr>
                    <td>City</td>
                    <td>{value?.city}</td>
                </tr>
                <tr>
                    <td>Pincode</td>
                    <td>{value?.pincode}</td>
                </tr>
                <tr>
                    <td>State</td>
                    <td>{value?.state}</td>
                </tr>
            </table>
        </>
    )
}

export default UserDetails