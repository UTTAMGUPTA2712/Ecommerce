import React, { useEffect, useState } from 'react'
import SearchAppBar from '../utils/SearchAppBar'
import { Carousel } from 'antd'
import { GetCarousal } from '../services/Carousal/GetCarousal'
import BestSellerItem from '../Components/UserInterface/BestSellerItem'

const DashBoard = () => {
    const [carousal, setCarousal] = useState([])
    const saveCarousal = async () => {
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
        <div id='dashboard'>
            <SearchAppBar />
            <div id='bannerdiv' style={{maxWidth:1500}}> 
            <Carousel autoplay>
                {carousal.map(data => {
                    return <div>
                        <h3 className='centerimage' style={{ margin: 0, width: "100%", height: "25rem", backgroundSize: "100% 25rem", backgroundImage: `url('${data?.image}')` }} />
                    </div>
                }
                )}
            </Carousel>
            <br/>
            <BestSellerItem />
            </div></div>
        </>
    )
}

export default DashBoard