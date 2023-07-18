import { Done } from '@mui/icons-material'
import { Button, IconButton, Rating, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReviewProductService } from '../../../services/Product/ReviewProductService'
import { setMessage } from '../../../redux/slice/messageSlice'
import { saveReview } from '../../../redux/slice/productSlice'
export const ReviewButton = ({ id }) => {
    const [value, setValue] = useState(0)
    const [review, setReview] = useState("")
    const dispatch = useDispatch()
    const SaveReview = async () => {
        if (value === 0||review==="") {
            dispatch(setMessage({ message: "Please Set A value First", severity: "info" }))
        } else {
            await ReviewProductService({ id: id, rate: value, review: review })
            dispatch(setMessage({ message: "Rated Successfully", severity: "success" }))
            dispatch(saveReview({id: id, rate: value, review: review }))
            setReview("")
            setValue(0)
        }
    }
    return (
        <>
            <div style={{display:'flex',alignItems:"center",justifyContent:"center",margin:"1rem auto",flexDirection:"row",flexWrap:"wrap"}}> 
                <TextField style={{backgroundColor:"#2196f350"}} label="Review" value={review} onChange={e => setReview(e.target.value)} />
                <Rating size="large" onChange={e => setValue(e.target.value)} value={value} />
                <IconButton style={{backgroundColor:"#2196f350"}} onClick={SaveReview}><Done /></IconButton>
            </div>
        </>
    )
}
