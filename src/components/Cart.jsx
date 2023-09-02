import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { removeItem, decreaseQantity, increaseQuantity } from '../utils/slices/cartSlice';

const Cart = () => {

    const cart = useSelector((store)=>store.cart); 

    const dispatch = useDispatch();

    const incrementQuantity = (id)=>{
        dispatch(increaseQuantity(id));
    }

    const decrementQuantity = (id)=>{
        dispatch(decreaseQantity(id));
    }

    const removeItemhandler = (id)=>{
        dispatch(removeItem(id));
    }

    if(cart.items.length===0){
        return <div className=' text-center'>
            <div>
                <h2 className='font-bold text-3xl'>Your Cart is Empty</h2>

            </div>
            <div className='mt-10'>
            <Link to="/" className='rounded-md px-3 py-2 bg-purple-200 '>Add Now</Link>

            </div>
        </div>
    }

  return (
    <div class="bg-gray-100 min-h-screen">
        <header class=" py-4">
            <div class="container mx-auto">
                <h1 class="text-2xl font-semibold">Your Cart</h1>
            </div>
        </header>

        <div class="container mx-auto mt-6 p-4">
            {
                cart?.items.length>0 && cart.items.map((item)=>{
                    const slug = item.name.toLowerCase().split(" ").join("-");
                    return <div key={item.id} class="bg-white shadow-md p-4  mb-4 flex flex-col md:flex-row items-center justify-between">
                        <Link className='w-full md:w-max' to={`/product/${item.id}/${slug}`}>
                    <div class="flex justify-between items-center w-full">
                        <img src={item.img} alt="Product 1" class="w-24 h-24 object-cover mr-4"/>
                        <div>
                            <h2 class="text-lg font-semibold">{item.name}</h2>
                            <p class="text-gray-600">Price: ${item.discountPrice}</p>
                            <p class="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                    </div>
                    </Link>

                    <div className='flex w-full mt-2 md:mt-0 md:w-1/2 justify-between'>
                        <div class="inline-flex items-center bg-purple-300  px-2 py-1 rounded-md md:ml-2">
                            <button onClick={()=>incrementQuantity(item.id)} class="p-2 text-lg font-bold mr-2 focus:outline-none">+</button>
                            <span class="text-lg bg-white h-full w-8 flex items-center justify-center">{item.quantity}</span>
                            <button onClick={()=>decrementQuantity(item.id)} class="p-2 text-lg font-bold ml-2 focus:outline-none">-</button>
                        </div>

                        <button onClick={()=>removeItemhandler(item.id)} class="text-red-600 hover:text-red-800 font-semibold">Remove</button>
                        </div>
                </div>
                })
            }

            {
                cart?.totalAmount > 0 && <div class="bg-white shadow-md p-4 mt-4">
                    <div class="flex justify-between">
                        <p class="text-lg font-semibold">Total:</p>
                        <p class="text-green-600 font-semibold text-lg mr-2">&#8377; {cart?.totalAmount}</p>
                    </div>

                    <div className='mt-3'>
                        <Link to="/checkout" class="bg-purple-600 text-white font-semibold px-4 py-2 mt-4 hover:bg-purple-800">Checkout</Link>
                    </div>
                </div>
            }

            
        </div>
    </div>
  )
}

export default Cart