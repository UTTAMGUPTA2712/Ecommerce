import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
const SnackBarUi = () => {
    const curMessage=useSelector(state=>state.message.message)
    const [state, setState] = React.useState({
        open: false,
        message: 'Successfull',
        severity: 'success',
    });
    const { message, severity, open } = state;

    useEffect(()=>{
        setState({ ...curMessage, open: true });
    },[curMessage])

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <>
            <Snackbar
                // anchorOrigin=( 'top', 'center' )
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
                severity={severity}
                // key={vertical + horizontal}
            />
        </>
    );
}

export default SnackBarUi