import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./components/admin/signin/Signin";
import { DashboardContent } from "./components/admin/dashboard/Dashboard";
// import { DashboardContentTemp } from "./components/admin/dashboard/dashboardTemplate";
import { orders } from "./components/admin/dashboard/currentOrder"
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions/auth.actions';
import { getInitialData } from "./actions/initialdata";
import {useEffect} from "react";
import ProductAdd from './components/admin/dashboard/AddProduct';

import Orders from './components/admin/dashboard/currentOrder'
import ShowProducts from "./components/admin/dashboard/showProducts";
import Home from "./pages/home/Home";
import SingleProduct from "./pages/singleProduct/singleproductpage";

import Cart from "./pages/Cartpage.js/Cart";






function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
    

  }, [auth.authenticate]);


  return (
    <div className="App">
        <Router>
            <Routes>
            <Route exact path="/" element={<Home/>}/>
              <Route exact path="/admin/signin" element={<SignIn/>}/>
              <Route exact path="/admin" element={<DashboardContent/>}/>
              <Route exact path="/admin/addProduct" element={<ProductAdd />} />
              <Route exact path="/admin/order" element={<Orders />} />
              <Route exact path="/admin/product" element={<ShowProducts />} />
              <Route exact path="/product/:id" element={<SingleProduct  />} />
              <Route exact path="/user/cart" element={<Cart/>}/>

            </Routes>
        </Router>
    </div>
  );
}

export default App;
