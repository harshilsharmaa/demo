import React, { useEffect, useState } from 'react'
import ProductsContainer from './ProductsContainer'
import productsData from "../utils/productsData.json"
import categoryData from "../utils/categoryData.json"
import { useDispatch, useSelector } from 'react-redux'
import { toogleSidebar } from '../utils/slices/appSlice'

const Body = () => {

    const {isOpenSidebar} = useSelector((store)=>store.app);

    const [filteredData, setFilteredData] = useState(null);
    const [category, setCategory] = useState(null);
    const [price, setPrice] = useState(null);
    const [rating, setRating] = useState(null);

    const [showCategories, setShowCategories] = useState(true);

    const dispatch = useDispatch();

    useEffect(()=>{
        setFilteredData(productsData);
    },[])


    const changeCategory = (cat)=>{
        if(cat!="All"){
            const catFilter = productsData.filter((item)=>item.category==cat); 
            setFilteredData(catFilter);
        }
        else if(cat==="All"){
            setFilteredData(productsData);
        } 
        setCategory(cat);
        setPrice(null);
        setRating(null)
    }

    const changePrice = (price) => {
        if (price === 'l') {
            setPrice('l')
          const catFilter = [...filteredData].sort((a, b) => a.discountPrice - b.discountPrice);
          setFilteredData(catFilter);
        }
        if (price === 'h') {
            setPrice('h')
          const catFilter = [...filteredData].sort((a, b) => b.discountPrice - a.discountPrice);
          setFilteredData(catFilter);
        }
    };

    const changeRating = (rating)=>{
        if(rating!=null){
            setRating(rating);
            const ratingFilter = [...filteredData].filter((item)=>item.rating>rating);
            setFilteredData(ratingFilter);
        }
    }

  return (
    <div className='w-full flex'>

        <div className={`h-full w-52 pt-4 absolute top-0 md:relative ${isOpenSidebar?'block':'hidden sm:flex'}`}>
            <button onClick={()=>dispatch(toogleSidebar())} className='block md:hidden absolute top-4 right-4 text-xl font-bold text-red-700'>X</button>
            <div className={`w-full bg-white flex flex-col items-center justify-between border-r`}>
                <div className='w-full border-b-2'>
                    <h3 className='ml-2 font-bold text-lg' onClick={()=>setShowCategories(!showCategories)}>Categories</h3>
                    <ul className='flex flex-col'>
                        <li onClick={()=>changeCategory("All")} className={`${category==="All"?"bg-purple-300":null}  text-center px-3 py-2   border border-transparent cursor-pointer hover:bg-purple-200`}>All</li>
                        {
                            categoryData?.length>0 && categoryData.map((cat)=>{
                                return <li onClick={()=>changeCategory(cat.name)} key={cat.id} className={`${category===cat.name?"bg-purple-300":null} text-center px-3 py-2 cursor-pointer hover:bg-purple-200`}>{cat.text}</li>
                            })
                        }
                    </ul>
                    
                </div>

                <div className='mt-2 w-full border-b-2'>
                    <h3 className='ml-2 font-bold text-lg'>Price</h3>
                    <ul className='flex flex-col'>
                        <li onClick={()=>changePrice('l')} className={`${price=='l'?"bg-purple-300":null} text-center px-3 py-2 cursor-pointer hover:bg-purple-200`}>Low-to-High</li>
                        <li onClick={()=>changePrice('h')} className={`${price=='h'?"bg-purple-300":null} text-center px-3 py-2 cursor-pointer hover:bg-purple-200`}>High-to-Low</li>
                    </ul>
                    
                </div>

                <div className='mt-2 w-full'>
                    <h3 className='ml-2 font-bold text-lg'>Rating</h3>
                    <ul className='flex flex-col'>
                        <li className={`${rating===4?"bg-purple-300":null} text-center px-3 py-2 cursor-pointer hover:bg-purple-200`} onClick={()=>changeRating(4)}>above 4</li>
                        <li className={`${rating===3?"bg-purple-300":null} text-center px-3 py-2 cursor-pointer hover:bg-purple-200`} onClick={()=>changeRating(3)}>above 3</li>
                    </ul>
                    
                </div>

                    

            </div>
        </div>

        <div className='flex flex-col w-full md:w-[90%]'>
        <div className='flex'>
            <img
                onClick={()=>dispatch(toogleSidebar())}
                className="h-12 cursor-pointer md:hidden"
                src="https://static.vecteezy.com/system/resources/previews/002/292/406/original/hamburger-menu-line-icon-free-vector.jpg"
                alt="menu"
            />
            <h4 className='ml-7 mt-3 font-bold text-lg'>{filteredData?.length} results found</h4>
        </div>
            <ProductsContainer data={filteredData}/>
        </div>
        
    </div>
  )
}

export default Body