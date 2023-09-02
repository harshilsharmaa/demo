import React from 'react'
import Header from './Header'
import Body from './Body'
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { addUser, removeUser } from "../utils/slices/userSlice";
import {useDispatch} from "react-redux"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Auth from './Auth';
import ProductPage from './ProductPage';
import Cart from './Cart';
import CheckoutPage from './CheckoutPage';
import OrderDone from './OrderDone';

const appRouter = createBrowserRouter([
  {
      path: "/",
      element: <><Header/><Body/></>
  },
  {
      path: "/login",
      element: <Auth/>
  },
  {
    path: "/product/:id/:slug",
    element: <><Header/><ProductPage/></>
  },
  {
    path: "/cart",
    element: <><Header/><Cart/></>
  },
  {
    path: "/checkout",
    element: <><Header/><CheckoutPage/></>
  },
  {
    path: "/orderDone",
    element: <><Header/><OrderDone/></>
  }
])

const Layout = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        const uid = user.uid;
        const userInfo = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
        dispatch(addUser(userInfo));
      } else {
        // User is signed out
        dispatch(removeUser());
      }
    });
  },[])

  return (
    <RouterProvider router={appRouter}/>
  )
}

export default Layout