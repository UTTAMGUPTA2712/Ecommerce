import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { setAddress } from '../../redux/slice/authSlice';
import { Typography } from '@mui/material';

function ConfirmationDialogRaw(props) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const radioGroupRef = useRef(null);
    useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };
    const handleCancel = () => {
        onClose();
    };
    const handleOk = () => {
        onClose(value);
    };
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const options = useSelector(state => state.user.user?.address)
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>Select Address</DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    aria-label="ringtone"
                    name="ringtone"
                    value={value ?? ""}
                    onChange={handleChange}
                >
                    {options.map((option, index) => (
                        <FormControlLabel
                            value={index}
                            key={option?.location}
                            control={<Radio />}
                            label={option?.location}
                        />
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
};

export const AddressSelector = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const value = useSelector(state => state.user.address);
    const handleClickListItem = () => {
        setOpen(true);
    };
    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
            dispatch(setAddress(newValue));
        }
    };

    return (
        <List component="div" role="group">
            <ListItem
                divider
                sx={{ backgroundColor: "#f0f0f0", width: "15rem", textAlign: "center" }}
                aria-haspopup="true"
                aria-controls="ringtone-menu"
                aria-label="Address"
                onClick={handleClickListItem}
            >
                <ListItemText sx={{cursor:"pointer"}} primary={<Typography variant='h5'>Choose Address</Typography>} secondary={value?.location} />
            </ListItem>
            <ConfirmationDialogRaw
                id="ringtone-menu"
                keepMounted
                open={open}
                onClose={handleClose}
                value={value?.location}
            />
        </List>
    );
}
