import React, { useEffect, useState } from 'react'
import SearchAppBar from '../utils/SearchAppBar'
import { Carousel } from 'antd'
import { GetCarousal } from '../services/Carousal/GetCarousal'

const DashBoard = () => {
    const [carousal, setCarousal] = useState([])
    const saveCarousal=async()=>{
        const response = await GetCarousal()
        console.log(response);
        setCarousal(response?.data)
    }
    console.log(carousal);
    useEffect(() => {
        saveCarousal()
    }, [])
    return (
        <>
            <SearchAppBar />
            <Carousel>
                {carousal.map(data=>
                    {return <div className='centerimage' style={{height:"25rem",width:"100%",backgroundImage:`url('${data?.image}')`}}/>}
                )}
            </Carousel>
            <div className='centerimage' style={{height:"25rem",width:"100%",backgroundImage:`url('${carousal?.[0]?.image}')`}}/>
        </>
    )
}

export default DashBoard