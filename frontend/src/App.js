import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import "./assets/global.css"
import Signup from './pages/Signup';
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
import DraftProduct from './pages/ProductControl';
import VendorProduct from './pages/VendorProduct';
import SnackBarUi from './Components/UserInterface/SnackBarUi';

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
      path: "/allorder",
      component: <AllOrder />,
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
  ]
  return (
    <>
      <SnackBarUi />
      <BrowserRouter>
        <Routes>
          {!user && publicRouter.map((route, index) => {
            return <Route key={index} path={route.path} element={route.component} />;
          })}
          {user && privateRouter.map((route, index) => {
            return <Route key={index} path={route.path} element={route.component} />;
          })}
          {user && (user?.title === vendor) && vendorRouter.map((route, index) => {
            return <Route key={index} path={route.path} element={route.component} />;
          })}
          {user && (user?.title === shipper) && shipmentRouter.map((route, index) => {
            return <Route key={index} path={route.path} element={route.component} />;
          })}
          {user && (user?.title === admin) && adminRouter.map((route, index) => {
            return <Route key={index} path={route.path} element={route.component} />;
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
