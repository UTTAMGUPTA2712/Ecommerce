import React, { useEffect, useState } from 'react'
import SearchAppBar from '../Components/UserInterface/SearchAppBar'
import { Carousel } from 'antd'
import { GetCarousal } from '../services/Carousal/GetCarousal'
import BestSellerItem from '../Components/UserInterface/BestSellerItem'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCategory } from '../redux/slice/filterSlice'
import { serverError } from '../data/constants'
import { setMessage } from '../redux/slice/messageSlice'
import banner from "../assets/Images/banner.png"
const DashBoard = () => {
    const [carousal, setCarousal] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const saveCarousal = async () => {
        try {
            const response = await GetCarousal()
            if (response.data === serverError) { dispatch(setMessage(serverError)) } else {
                // console.log(response);
                setCarousal(response?.data)
            }
        } catch (error) {
            dispatch(setMessage(serverError))
        }
    }
    // console.log(carousal);
    useEffect(() => {
        saveCarousal()
    }, [])
    const handleClick = (value) => {
        // console.log(value);
        dispatch(setCategory(value))
        navigate("/home")
    }

    return (
        <>
            <div id='dashboard' style={{ left: -50 }}>
                <SearchAppBar />
                <div id='bannerdiv' style={{ maxWidth: 1500, width: "97%", margin: "0", padding: "1rem 0", height: "100%", overflowY: "auto" }}>
                    <Carousel style={{cursor:"pointer"}} autoplay>
                        <div onClick={() => handleClick("")}>
                            <h3 className='centerimage' style={{ margin: 0, width: "100%", height: "25rem", backgroundSize: "100% 25rem", backgroundImage: `url('${banner}')` }} > </h3>
                        </div>
                        {carousal.map((data,index) => {
                            return <div key={index} onClick={() => handleClick(data?.filter)}>
                                <h3 className='centerimage' style={{ margin: 0, width: "100%", height: "25rem", backgroundSize: "100% 25rem", backgroundImage: `url('${data?.image}')` }} > </h3>
                            </div>
                        })}
                    </Carousel>
                    <br />
                    <BestSellerItem />
                </div>
            </div>
        </>
    )
}

export default DashBoard