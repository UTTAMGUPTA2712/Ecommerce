import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { admin, orderCompleted, orderDispatched, orderOutForDelivery, orderPlaced, orderRecieved, shipper } from '../../../data/constants';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const graph = {
    [orderPlaced]: 1,
    [orderCompleted]: 2,
    [orderDispatched]: 3,
    [orderOutForDelivery]: 4,
    [orderRecieved]: 5,
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
    },
];
export default function OrderLocation({ data, id, setStatus }) {
    const [activeStep, setActiveStep] = useState(graph[data]);
    const userTitle = useSelector(state => state.user.user?.title);
    const handleNext = (value) => {
        setStatus({ id: id, status: value })
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>
                            {step.label}
                        </StepLabel>
                        {(userTitle === shipper || userTitle === admin) && <StepContent>
                            <Typography>{step.description}</Typography>
                            {(setStatus !== "user") && <Box sx={{ mb: 2 }}>
                                <Button variant="contained" onClick={() => handleNext(step.label)} sx={{ mt: 1, mr: 1 }}>
                                    {index === steps.length - 1 ? 'Order Received' : 'Set Complete'}
                                </Button>
                            </Box>}
                        </StepContent>}
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>Order Successfully Recieved</Typography>
                </Paper>
            )}
        </Box>
    );
}
