import React from 'react'
import { ReviewButton } from './ReviewButton'
import { Rating } from '@mui/material'

export const RatingComponent = ({ data }) => {
    return (
        <div style={{ border: "1px solid grey ",borderRadius:"5px",marginTop:"1rem",backgroundColor:"white" }}>
            <ReviewButton id={data?._id} />
            {
                data?.review?.map(rating => (
                    <>
                        <hr />
                        <div style={{ width: "100%", textAlign: "left",margin:"auto 0.5rem" }}>
                            <Rating size="small" value={rating?.rate} readOnly />
                            <p>{rating?.review}</p>
                        </div>
                    </>
                ))
            }
            <hr />
        </div>
    )
}
