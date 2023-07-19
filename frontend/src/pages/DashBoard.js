import React, { useEffect, useState } from 'react'
import SearchAppBar from '../utils/SearchAppBar'
import { Carousel } from 'antd'
import { GetCarousal } from '../services/Carousal/GetCarousal'
import BestSellerItem from '../Components/UserInterface/BestSellerItem'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCategory } from '../redux/slice/filterSlice'

const DashBoard = () => {
    const [carousal, setCarousal] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const saveCarousal = async () => {
        const response = await GetCarousal()
        console.log(response);
        setCarousal(response?.data)
    }
    console.log(carousal);
    useEffect(() => {
        saveCarousal()
    }, [])
    const handleClick = (value) => {
        console.log(value);
        // dispatch(setCategory(value))
        navigate("/home")
    }
    return (
        <>
            <div id='dashboard' style={{ left: -50 }}>
                <SearchAppBar />
                <div id='bannerdiv' style={{ maxWidth: 1500, width: "100%", margin:"1rem 0" }}>
                    <Carousel autoplay>
                        {carousal.map(data => {
                            return <div onClick={() => handleClick(data?.filter)}>
                                <h3 className='centerimage' style={{ margin: 0, width: "100%", height: "25rem", backgroundSize: "100% 25rem", backgroundImage: `url('${data?.image}')` }} />
                            </div>
                        }
                        )}
                    </Carousel>
                    <br />
                    <BestSellerItem />
                </div>
            </div>
        </>
    )
}

export default DashBoard