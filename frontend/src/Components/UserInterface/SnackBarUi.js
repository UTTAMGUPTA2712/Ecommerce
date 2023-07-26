import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { cleanMessage } from '../../redux/slice/messageSlice';
import { Alert } from '@mui/material';
const SnackBarUi = () => {
    const curMessage = useSelector(state => state.message.message)
    const [state, setState] = useState({
        open: false,
        message: 'Successfull',
        severity: 'success',
    });
    const { message, severity, open } = state;
    const dispatch = useDispatch()
    useEffect(() => {
        if (curMessage) {
            setState({ ...curMessage, open: true });
            dispatch(cleanMessage())
        }
    }, [curMessage])
    const handleClose = () => {
        setState({ ...state, open: false });
    };
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}>
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
        </>
    );
}

export default SnackBarUi