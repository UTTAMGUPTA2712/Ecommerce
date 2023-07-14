import React, { useState } from 'react'
import { AddressSelector } from './AddresSelector'

export const UserCard = ({ data }) => {
    const [value, setValue] = useState(data?.address[0])
    const changeValue = (address) => {
        setValue(address)
    }
    return (
        <>
            <div>
                <img src={data?.photo} />
                <h1>{data?.name}</h1>
            </div>
        </>
    )
}
