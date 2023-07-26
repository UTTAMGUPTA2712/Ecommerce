import { AddressSelector } from './AddresSelector'
import { useSelector } from 'react-redux'
import { Avatar, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const UserDetails = ({ data }) => {
    const value = useSelector(state => state.user.address)
    const navigate = useNavigate()
    return (
        <>
            <div style={{ width: "96%", margin: "2%" }}>
                <div id='checkoutuserform'>
                    {/* <img style={{height:}} src={data?.photo} alt='' /> */}
                    {/* <div className='centerimage' style={{ margin: "1rem", height: "10rem", width: "10rem", backgroundImage: `url('${data?.photo}')` }} /> */}
                    <Avatar sx={{ bgcolor: "#00b0ff",cursor:"pointer", margin: "1rem", height: "10rem", width: "10rem",fontSize:"8rem" }} onClick={() => navigate("/Profile")} src={data?.image}>{(data?.name?.[0]).toUpperCase()}</Avatar>
                    <h1>{data?.name}</h1>
                    <div style={{ textAlign: "center" }}>
                        <AddressSelector />
                        <Button variant='contained' color='secondary' onClick={() => navigate("/profile", { state: "goback" })}>ADD ADDRESS</Button>
                    </div>
                </div>
            </div>
            <h1 style={{ backgroundColor: "white", padding: "1rem", border: "2px solid grey", textAlign: "center", borderStyle: "solid none solid none" }}>Shipping details</h1>
            <div id='addressdetail' style={{ width: "96%", margin: "2%", textAlign: "center", display: "flex", justifyContent: "center" }}>
                <table>
                    <thead>
                        <tr>
                            <td>Address</td>
                            <td>{value?.location}</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{value?.city}</td>
                        </tr>
                        <tr>
                            <td>Pincode</td>
                            <td>{value?.pincode}</td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>{value?.state}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    )
}

export default UserDetails