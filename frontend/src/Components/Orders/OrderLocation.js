import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { cancelOrder, orderCompleted, orderDispatched, orderOutForDelivery, orderPlaced, orderRecieved, serverError } from '../../data/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SetOrderStatusService } from '../../services/Order/SetOrderStatusService';
import { setMessage } from '../../redux/slice/messageSlice';
const graph = {
    [orderPlaced]: 1,
    [orderCompleted]: 2,
    [orderDispatched]: 3,
    [orderOutForDelivery]: 4,
    [orderRecieved]: 5,
    [cancelOrder]: -1
}
const steps = [
    {
        label: orderPlaced,
        description: ""
    },
    {
        label: orderCompleted,
        description: "Order has been sent to the store"
    },
    {
        label: orderDispatched,
        description: "The store has Completed the order"
    },
    {
        label: orderOutForDelivery,
        description: "Order has been dispatched from the store"
    },
    {
        label: orderRecieved,
        description: "Order is out Delivery you will be called soon to recieve it"
    }
];
export default function OrderLocation({ data, id, setStatus }) {
    const [activeStep, setActiveStep] = useState(graph[data]);
    // const userTitle = useSelector(state => state.user.user);
    const dispatch = useDispatch()
    const handleNext = (value) => {
        setStatus({ id: id, status: value })
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleCancel = async () => {
        try {
            const response = await SetOrderStatusService({ id: id, status: cancelOrder })
            if (response.data === serverError) {
                dispatch(setMessage(serverError))
            } else {
                setActiveStep(-1)
                dispatch(setMessage(cancelOrder))
            }
        } catch (error) {
            dispatch(setMessage(serverError))
        }
    }
    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                {(setStatus !== "user") ?
                                    (<Button variant="contained" onClick={() => handleNext(step.label)} sx={{ mt: 1, mr: 1 }}>
                                        {index === steps.length - 1 ? 'Order Received' : 'Set Complete'}
                                    </Button>)
                                    :
                                    <Button variant="contained" onClick={handleCancel} sx={{ mt: 1, mr: 1 }}>
                                        CANCEL ORDER
                                    </Button>
                                }
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {/* {console.log(data)} */}
            {(activeStep === steps.length || activeStep === -1) && (
                <Paper square elevation={0} sx={{ p: 3, bgcolor: "#00000000" }}>
                    {activeStep === -1 ? <Typography>{cancelOrder}</Typography> : <Typography>Order Successfully Recieved</Typography>}
                </Paper>
            )}
        </Box>
    );
}
