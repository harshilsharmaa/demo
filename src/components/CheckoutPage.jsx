import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from "react-router-dom"
import { orderPlaced } from '../utils/slices/cartSlice';

const CheckoutPage = () => {

    const user = useSelector((store)=>store.user);
    const cart = useSelector((store)=>store.cart); 
    const [isPaymentOnline, setIsPaymentOnline] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const placeOrder = ()=>{
        dispatch(orderPlaced());
        navigate("/orderDone");
    }

    useEffect(()=>{
        if(!user.user){
            navigate("/login?redirect=checkout")
        }
        if(user?.user){
            setName(user?.user?.displayName);
            setEmail(user?.user?.email);
        }
    },[user])

    useEffect(()=>{
        if(cart?.items.length===0) {
            navigate("/cart");
        }
    },[cart])

  return (
    <div className='p-2 flex flex-col items-center'>
        <h3 className='text-center text-3xl'>Checkout</h3>
        <div className='w-4/6 flex flex-col-reverse md:flex-row justify-evenly px-4 py-7'>
            <div>
                <h3 className='text-xl'>Fill Details</h3>
                <div>
                    <div className='flex flex-col md:flex-row'>
                        <input className='rounded-md outline-none border-2 border-gray-400 px-4 py-2 text-lg' type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} />
                        <input className='ml-0 mt-2 md:ml-3 md:mt-0 rounded-md outline-none border-2 border-gray-400 px-4 py-2 text-lg' type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className='mt-3'>
                        <input className=' rounded-md outline-none border-2 border-gray-400 px-4 py-2 text-lg' type="number" placeholder='Phone no.' required/>
                    </div>
                    <div className='mt-3'>
                        <input className='md:w-96 rounded-md outline-none border-2 border-gray-400 px-4 py-2 text-lg' type="text" placeholder='Address' required/>
                    </div>
                </div>
                
                <h3 className='mt-3 text-xl'>Payment Method</h3>
                <div>
                    <div className='flex mt-2'>
                        <button onClick={()=>setIsPaymentOnline(true)} className={` ${isPaymentOnline?"bg-gray-300":null} rounded-md outline-none border-2 border-gray-400 px-4 py-2 text-lg`} type="text" >Online </button>
                        <button onClick={()=>setIsPaymentOnline(false)} className={`ml-3 ${!isPaymentOnline?"bg-gray-300":null} rounded-md outline-none border-2 border-gray-400 px-4 py-2 text-lg`} type="text" >By Cash</button>
                    </div>
                    {
                        isPaymentOnline && <div className='mt-2'>
                                <h4 className='text-lg'>Enter Card Details</h4>
                                <div className='flex'>
                                    <input className='w-96 rounded-md outline-none border-2 border-gray-400 px-4 py-2 text-lg' type="number" placeholder='Enter card number'/>
                                </div>
                                <div className='mt-3'>
                                    <input maxLength="3" className='w-24 rounded-md outline-none border-2 border-gray-400 px-4 py-2 text-lg' type="number" placeholder='cvv' />
                                    <input min="2023-10-01" type="date" name="expiryDate" placeholder='expiry Date' id="" />
                                </div>
                        </div>
                    }
                </div>
            </div>


            <div className='border rounded-md p-3 w-64'>
                <div className='flex justify-between '>
                    <h3 className='text-lg font-bold'>Your Order</h3>
                    <Link to="/cart" className='underline'>Edit</Link>
                </div>

                <div className='h-36 overflow-y-auto'>
                    <ul>
                    {
                        cart?.items.length>0 && cart.items.map((item)=>{
                            return <li key={item.id} className='mt-1 flex justify-between'>
                                <h4 className='text-sm font-bold'>{item.name}</h4>
                                <h4 className=''>{item.discountPrice}</h4>
                            </li>
                        })
                    }
                    </ul>
                </div>

                <div className='h-36 overflow-y-auto'>
                    <ul>
                        <li className='mt-1 flex justify-between'>
                            <h4 className='text-sm font-bold'>Subtotal</h4>
                            <h4 className=''>{cart.totalAmount}</h4>
                        </li>
                        <li className='mt-1 flex justify-between'>
                            <h4 className='text-sm font-bold'>GST</h4>
                            <h4 className=''>20</h4>
                        </li>
                        <li className='mt-2 flex justify-between'>
                            <h4 className='font-bold'>Total</h4>
                            <h4 className=''>{cart.totalAmount+20}</h4>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className='mx-auto'>
            <button onClick={()=>placeOrder()} className=' w-96 bg-green-400 rounded-md outline-none px-3 py-2 text-lg hover:bg-green-300'>Confirm and place order</button>
        </div>
    </div>
  )
}

export default CheckoutPage