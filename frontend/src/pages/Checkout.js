import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchAppBar from '../utils/SearchAppBar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OrderDetail from '../Components/Orders/User/OrderDetail';
import { useSelector } from 'react-redux';
import UserDetails from '../Components/Orders/UserDetails';
import PlaceOrderButton from '../Components/Orders/PlaceOrderButton';

const steps = ['Confirm Cart Products', 'Confirm User Deatil', 'Confirm Check Out'];

const Checkout = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user.user)
  const cart = useSelector(state => state.cart.cart)
  const [activeStep, setActiveStep] = useState(1);
  const component = [
    <UserDetails data={user} />, <OrderDetail cart={cart} />
  ]
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    if (activeStep === 1) {
      navigate("/cart")
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  const handleReturn = () => {
    navigate("/")
    setActiveStep(0);
  };
  return (
    <>
      <div id='checkout'>
        <SearchAppBar />
        <div id='checkoutbox'>
          <Box>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReturn}>Return Home</Button>
                </Box>
              </>
            ) : (
              <>
                {component[activeStep - 1]}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {activeStep === steps.length - 1 ?
                    <PlaceOrderButton handleNext={handleNext} />
                    :
                    <Button onClick={handleNext}>
                      Next
                    </Button>}
                </Box>
              </>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}
export default Checkout