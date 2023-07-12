import React from 'react'
import SearchAppBar from '../Components/SearchAppBar'
import { IconButton } from '@material-ui/core'
import { ArrowBack, Home } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const PageNotFound = () => {
    const navigate = useNavigate()
    return (<>
        <div style={{height:"100vh",display:"grid",gridTemplateRows:"auto 1fr"}}>
            <SearchAppBar />
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"2rem"}}>
                <span style={{border:"1px solid grey",textAlign:"center",padding:"2rem 6rem",}}>
                <h1>404</h1>
                <h2>No Page Found</h2>
                <Button variant='outlined' onClick={() => navigate("/")}><ArrowBack /><Home /></Button>
                </span>
            </div>
        </div>
    </>
    )
}
export default PageNotFound