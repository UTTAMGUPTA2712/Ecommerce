import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import "./assets/global.css"
import Signup from './pages/Signup';
import SnackBarUi from './utils/SnackBarUi';
import HomePage from './pages/HomePage';

function App() {
  const user=useSelector(state=>state.user.user)
  const publicRouter=[
    {
      path: "/*",
      component:<HomePage/>
    },
    {
      path: "/signup",
      component:<Signup/>
    }
  ]
  const privateRouter=[
    {
      path: "/",
      component:""
    },
    {
      path: "/",
      component:""
    },
    {
      path: "/*",
      component:"404"
    }
  ]
  return (
    <>
    <SnackBarUi/>
    <BrowserRouter>
    <Routes>
    {!user&&publicRouter.map(route=>{
      return <Route path={route.path} element={route.component} />;
    })}
    {user&&privateRouter.map(route=>{
      return <Route path={route.path} element={route.component} />;
    })}
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
