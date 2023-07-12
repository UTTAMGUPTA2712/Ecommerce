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
      path: "/",
      component: <HomePage />
    },
    {
      path: "/cart",
      component: <Cart/>
    },
    {
      path: "/profile",
      component:<Profile/>
    },
    {
      path:"/productDetail",
      component:<ProductDetail/>,
    },
    {
      path: "/userorder",
      component:<UserOrder/>
    },
    {
      path: "/*",
      component:<PageNotFound/>
    }
  ]
  const vendorRouter = [
    {
      path: "/order",
      component: ""
    }
  ]
  const adminRouter = [
    {
      path: "/vendor",
      component: ""
    },
    {
      path: "/products",
      component: ""
    },
  ]
  const shipmentRouter=[
    {
      path: "/currier",
      component:""
    },
    {
      path: "/currentParcels",
      component:""
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
          {user&&(user?.title==="vendor") && vendorRouter.map(route => {
            return <Route path={route.path} element={route.component} />;
          })}
          {user &&(user?.title==="shipment")&& shipmentRouter.map(route => {
            return <Route path={route.path} element={route.component} />;
          })}
          {user&&(user?.title==="admin") && adminRouter.map(route => {
            return <Route path={route.path} element={route.component} />;
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
