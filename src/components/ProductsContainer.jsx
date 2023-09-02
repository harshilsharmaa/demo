import React from 'react'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'

const ProductsContainer = ({data}) => {



  return (
    <div className='flex flex-col md:flex-row flex-wrap items-center justify-between  w-full'>
        {
            data?.length>0 && data.map((item)=>{
              const slug = item.name.toLowerCase().split(" ").join("-");
                return <Link to={`/product/${item.id}/${slug}`} key={item.id}>
                  <ProductCard item={item}/>
                </Link>
            })
        }
    </div>
  )
}

export default ProductsContainer