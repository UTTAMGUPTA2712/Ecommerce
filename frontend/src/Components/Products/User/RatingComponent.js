import { Done } from '@mui/icons-material'
import { IconButton, Rating, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReviewProductService } from '../../../services/Product/ReviewProductService'
import { setMessage } from '../../../redux/slice/messageSlice'
import { saveReview } from '../../../redux/slice/productSlice'
import { serverError } from '../../../data/constants'
export const RatingComponent = ({ data }) => {
    const [value, setValue] = useState(0)
    const [review, setReview] = useState("")
    const dispatch = useDispatch()
    // console.log(+value, data?.rate, data?.review?.length);
    const SaveReview = async () => {
        if (value === 0 || review === "") {
            dispatch(setMessage({ message: "Please Set A value First", severity: "info" }))
        } else {
            const rating = (((+data?.rate) * (+data?.review?.length)) + (+value)) / ((+data?.review?.length) + 1);
            // console.log(value, (+data?.rate), rating, (((+data?.rate) * (+data?.review?.length)) + +value), (+data?.review?.length));
            try {
                await ReviewProductService({ id: data?._id, review: { rate: +value, review: review }, rate: rating })
                dispatch(setMessage({ message: "Rated Successfully", severity: "success" }))
                dispatch(saveReview({ id: data?._id, rate: rating, review: { rate: +value, review: review } }))
                setReview("")
                setValue(0)
            }
            catch (err) {
                dispatch(setMessage(serverError))
            }
        }
    }
    return (
        <div style={{ border: "1px solid grey ", borderRadius: "5px", marginTop: "1rem", backgroundColor: "white" }}>
            <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", margin: "1rem auto", flexDirection: "row", flexWrap: "wrap" }}>
                <TextField style={{ backgroundColor: "#2196f350" }} label="Enter Product Review" value={review} onChange={e => setReview(e.target.value)} />
                <Rating size="large" onChange={e => setValue(e.target.value)} value={+value} />
                <IconButton style={{ backgroundColor: "#2196f350" }} onClick={SaveReview}><Done /></IconButton>
            </div>
            <div style={{ maxHeight: "25rem", overflow: "hidden auto" }}>
                {
                    data?.review?.map((rating, index) => (
                        <React.Fragment key={index}>
                            <hr />
                            <div style={{ width: "100%", textAlign: "left", margin: "auto 0.5rem" }}>
                                <Rating size="small" value={+(rating?.rate)} readOnly />
                                <p>{rating?.review}</p>
                            </div>
                        </React.Fragment>
                    ))
                }
                <hr />
            </div>
        </div>
    )
}
