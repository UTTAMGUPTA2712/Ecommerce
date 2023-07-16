import React from 'react'
import { admin, disableProduct, draft, enableProduct, outOfStock, published } from '../data/constants'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { SetProductStatusService } from '../services/SetProductStatusService'
import { useNavigate } from 'react-router-dom'

export const StatusButton = ({ id, status }) => {
    const user = useSelector(state => state.user.user?.title)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleStatusChange = async (data) => {
        const response = await SetProductStatusService({ id: id, status: data })
        // dispatch(setProductStatus({ id: id, status: data }))
        navigate("/")
        console.log(response);
    }
    return (<>
        {status === draft && <Button onClick={() => handleStatusChange(enableProduct)}>Send Item for Approval</Button>}
        {status === published && <Button onClick={() => handleStatusChange(outOfStock)}>Set Out Of Stock</Button>}
        {status === enableProduct && (user === admin ? <Button onClick={() => handleStatusChange(published)}>Publish The Product</Button> : <h1>Yet To Be Approved</h1>)}
        {user === admin && <Button onClick={() => handleStatusChange(disableProduct)}>Decline The Product</Button>}
        {status === outOfStock && <Button onClick={() => handleStatusChange(published)}>Publish The Product</Button>}
    </>)
}
