import React, { useEffect, useState } from 'react'
import { googleIcon } from '../utils/icons'
import Header from './Header'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../utils/firebaseConfig';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Auth = () => {

    const user = useSelector((store)=>store.user);

    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const params = useSearchParams();

    useEffect(()=>{
        if(user.user!==null){
            if(params[0].has("redirect")){
                navigate(`/${params[0].get("redirect")}`)
            }
            else{
                navigate("/");
            }
        }
    },[user])

    const googleLoginHandler = ()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
        });
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!email || !password){
            setError("Please Fill All the feilds")
        }

        if(!isSignIn){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            });
        }
        else{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            });
        }
    }

  return (
    <div className=' w-full h-full'>
        <Header/>
            
            <div className=' w-full m-auto p-3 sm:w-[60%]  flex flex-col justify-center '>
                <div className='p-5 rounded-lg flex flex-col m-auto mt-4 bg-purple-100'>
                    <h2 className='text-4xl font-bold'>{isSignIn?"Sign In":"Sign Up"}</h2>
                    {
                        error && <h3 className='text-red-700'>{error}</h3>
                    }
                    <h4>Sign in to your account</h4>
                    <div className='text-gray-400 mt-5 flex'>
                        <button onClick={()=>googleLoginHandler()} className='bg-white rounded-lg px-2 py-1 text-sm flex items-center'><span className='mr-3'>{googleIcon}</span> Sign in with Google</button>
                    </div>
                    <div className='mt-3 p-5 w-96 flex flex-col bg-white rounded-xl'>
                        <label className='text-gray-700 '>Email Address</label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} className='mt-1 bg-gray-100 px-3 py-2 w-80 rounded-lg m-auto'></input>

                        <label className='text-gray-700 mt-4'>Password</label>
                        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='mt-1 bg-gray-100 px-3 py-2 w-80 rounded-lg m-auto'></input>

                        <a className='text-blue-800 text-sm cursor-pointer font-medium mt-4'>Forgot Password?</a>

                        <button onClick={(e)=>handleSubmit(e)} className='mt-4 bg-black text-white px-8 py-2 rounded-xl w-80 m-auto'>{isSignIn?"Sign In":"Sign Up"}</button>
                    </div>

                    {
                        isSignIn ? <h4 className='text-gray-500 text-center text-base font-medium mt-4'>Don't have an account? <button onClick={()=>setIsSignIn(false)} className='text-blue-800 cursor-pointer'>Register here</button></h4>
                        : <h4 className='text-gray-500 text-center text-base font-medium mt-4'>Already a User? <button onClick={()=>setIsSignIn(true)} className='text-blue-800 cursor-pointer'>Login here</button></h4>
                    }
                    
                </div>
            </div>
        </div>
  )
}

export default Auth