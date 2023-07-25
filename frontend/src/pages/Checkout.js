import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchAppBar from '../utils/SearchAppBar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OrderDetail from '../Components/Orders/OrderDetail';
import { useSelector } from 'react-redux';
import UserDetails from '../Components/Orders/UserDetails';
import PlaceOrderButton from '../Components/Orders/PlaceOrderButton';
import { IconButton } from '@mui/material';
import { Done } from '@mui/icons-material';

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
                return (
                  <Step key={label} >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                <Box sx={{ width: "100%", backgroundColor: "white", height: "25rem", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem" }}>
                  <Typography variant='h1' sx={{ mt: 2, mb: 1 }}>
                    <IconButton sx={{ backgroundColor: "greenyellow" }}>< Done sx={{ fontSize: "4rem" }} /></IconButton> Order Successful
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button sx={{ marginRight: "1rem" }} variant='contained' color='success' onClick={() => navigate("/userorder")}>Check Orders</Button>
                  <Button variant='contained' color='success' onClick={handleReturn}>Return Home</Button>
                </Box>
              </>
            ) : (
              <>
                {component[activeStep - 1]}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    variant='contained'
                    color="secondary"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {activeStep === steps.length - 1 ?
                    <PlaceOrderButton handleNext={handleNext} />
                    :
                    <Button variant='contained' color='success' onClick={handleNext}>
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