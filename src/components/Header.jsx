import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {signOut } from "firebase/auth";
import { auth } from '../utils/firebaseConfig';
import cartIcon from "../utils/cartIcon.png"

const Header = () => {

    const user = useSelector((store)=>store.user);
    const cart = useSelector((store)=>store.cart);

    const [showProfileModal, setShowProfileModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = ()=>{
        signOut(auth).then(() => {
            navigate("/");
          }).catch((error) => {
            // An error happened.
          });
    }

  return (
    <div className='w-full bg-purple-100 flex justify-between px-3 py-4'>

        <div>
            <h4 className='font-bold text-2xl text-purple-700'><Link to="/">Apni Dukan</Link></h4>
        </div>

        <div className='flex'>
            <ul className='flex items-center px-10'>
                <li className='px-3 cursor-pointer text-lg'><Link to="/cart" className='flex items-center'><img className='w-5 mr-1' src={cartIcon} alt="cart Icon" /> Cart <span className='top-3 text-green-600 font-bold'>{cart.items===null?0:cart.items.length}</span></Link></li>
            </ul>

            <div>
                {
                    user?.user?.photoURL ? <img onClick={()=>setShowProfileModal(!showProfileModal)}  className='w-8 rounded-full cursor-pointer' src={user?.user?.photoURL} alt="Profile icon" />
                    : <img onClick={()=>setShowProfileModal(!showProfileModal)} className='w-8 rounded-full cursor-pointer' src="https://cdn-icons-png.flaticon.com/512/552/552721.png" alt="Profile icon" />
                }
                {
                    showProfileModal && <div className='bg-white absolute right-3 p-4 rounded-md'>
                        {
                            user?.user ? <button onClick={()=>logoutHandler()} className='text-red-500'>Logout</button> : <button onClick={()=>navigate("/login")} className='text-green-500'>Login</button>
                        }
                    </div>
                }
                
            </div>
        </div>
    </div>
  )
}

export default Header