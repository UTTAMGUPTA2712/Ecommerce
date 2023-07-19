import React from 'react'
import { admin, disableProduct, draft, enableProduct, outOfStock, published, serverError } from '../../../data/constants'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { SetProductStatusService } from '../../../services/Product/SetProductStatusService'
import { useNavigate } from 'react-router-dom'
import { DeleteProductService } from '../../../services/Product/DeleteProductService'
import { setMessage } from '../../../redux/slice/messageSlice'

export const StatusButton = ({ id, status }) => {
    const user = useSelector(state => state.user.user?.title)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleStatusChange = async (data) => {
        const response = await SetProductStatusService({ id: id, status: data })
        if (response.data === serverError) { dispatch(setMessage(serverError)) } else {

            navigate(-1)
            console.log(response);
        }
    }
    const deleteProduct = async () => {
        const response = await DeleteProductService({ id: id })
        if (response.data === serverError) { dispatch(setMessage(serverError)) } else {

            console.log(response);
            navigate(-1)
        }
    }
    return (<>
        {status === draft && <Button variant="outlined" fullWidth onClick={() => handleStatusChange(enableProduct)}>Send Item for Approval</Button>}
        {status === published && <Button variant="outlined" fullWidth onClick={() => handleStatusChange(outOfStock)}>Set Out Of Stock</Button>}
        {status === enableProduct && (user === admin ? <Button variant="outlined" fullWidth onClick={() => handleStatusChange(published)}>Publish The Product</Button> : <h1>Yet To Be Approved</h1>)}
        {user === admin && <Button variant="outlined" fullWidth onClick={() => handleStatusChange(disableProduct)}>Decline Product Approval</Button>}
        {status === outOfStock && <Button variant="outlined" fullWidth onClick={() => handleStatusChange(published)}>Set Products Being Sold</Button>}
        {status === disableProduct && (user === admin ? <Button variant="outlined" fullWidth onClick={() => handleStatusChange(published)}>Publish The Product</Button> : <><h1>Your Product Has Been Disabled By The Admin</h1><Button variant="outlined" fullWidth onClick={() => handleStatusChange(enableProduct)}>Send Item for Re-Approval</Button></>)}
        <Button variant="outlined" fullWidth sx={{ backgroundColor: "tomato", color: "white" }} onClick={deleteProduct}>Delete The Product</Button>
    </>)
}
