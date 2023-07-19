import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import "./assets/global.css"
import Signup from './pages/Signup';
import SnackBarUi from './utils/SnackBarUi';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import UserOrder from './pages/UserOrder';
import ProductDetail from './pages/ProductDetail';
import PageNotFound from './pages/PageNotFound';
import UserList from './pages/UserList';
import CheckOut from './pages/Checkout';
import AllOrder from './pages/AllOrder';
import UserProfile from './Components/UserInterface/UserProfile';
import { admin, shipper, vendor } from './data/constants';
import SetWebsiteData from './pages/SetWebsiteData';
import DashBoard from './pages/DashBoard';
import DraftProduct from './pages/DraftProduct';
import VendorProduct from './pages/VendorProduct';

function App() {
  const user = useSelector(state => state.user.user)
  const publicRouter = [
    {
      path: "/*",
      component: <Login />
    },
    {
      path: "/signup",
      component: <Signup />
    }
  ]
  const privateRouter = [
    {
      path: "/home",
      component: <HomePage />
    },
    {
      path: "/",
      component: <DashBoard />
    },
    {
      path: "/cart",
      component: <Cart />
    },
    {
      path: "/checkout",
      component: <CheckOut />
    },
    {
      path: "/profile",
      component: <Profile />
    },
    {
      path: "/productDetail",
      component: <ProductDetail />,
    },
    {
      path: "/userorder",
      component: <UserOrder />
    },
    {
      path: "/userdetail",
      component: <UserProfile />
    },
    {
      path: "/*",
      component: <PageNotFound />
    }
  ]
  const vendorRouter = [
    {
      path: "/order",
      component: ""
    },
    {
      path: "/vendorproduct",
      component: <VendorProduct />,
    },
  ]
  const adminRouter = [
    {
      path: "/allusers",
      component: <UserList />
    },
    {
      path: "/setdata",
      component: <SetWebsiteData />
    },
    {
      path: "/allorder",
      component: <AllOrder />,
    },
    {
      path: "/vendorproduct",
      component: <VendorProduct />,
    },
    {
      path: "/productcontrol",
      component: <DraftProduct />,
    }
  ]
  const shipmentRouter = [

    {
      path: "/allorder",
      component: <AllOrder />,
    },
    {
      path: "/currentParcels",
      component: ""
    },
  ]
  return (
    <>
      <SnackBarUi />
      <BrowserRouter>
        <Routes>
          {!user && publicRouter.map(route => {
            return <Route path={route.path} element={route.component} />;
          })}
          {user && privateRouter.map(route => {
            return <Route path={route.path} element={route.component} />;
          })}
          {user && (user?.title === vendor) && vendorRouter.map(route => {
            return <Route path={route.path} element={route.component} />;
          })}
          {user && (user?.title === shipper) && shipmentRouter.map(route => {
            return <Route path={route.path} element={route.component} />;
          })}
          {user && (user?.title === admin) && adminRouter.map(route => {
            return <Route path={route.path} element={route.component} />;
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
