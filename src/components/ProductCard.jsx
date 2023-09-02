import React from 'react'

const ProductCard = ({item}) => {

    const {name, img, discountPrice, price, rating} = item;

  return (
    <div className='w-68 rounded-xl mt-2 cursor-pointer p-1 border border-transparent hover:border-gray-200'>
        <div className='h-44'>
            <img className='w-64 h-full  ' src={img} alt="product image" srcSet="" />
        </div>

        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{name}</h2>

            <div className="flex items-center">
                <p className="text-green-600 font-semibold text-lg mr-2">&#8377; {discountPrice}</p>

                <p className="text-gray-400 text-sm line-through">&#8377; {price}</p>
            </div>

            <p className="text-green-600 font-semibold text-sm">({Math.round(((price-discountPrice)/price)*100)}% off)</p>

            <div className="flex items-center mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1a.75.75 0 0 1 .664.418l1.93 3.862 4.32.628a.75.75 0 0 1 .416 1.279l-3.12 3.045.737 4.302a.75.75 0 0 1-1.088.791L10 13.347l-3.865 2.03a.75.75 0 0 1-1.088-.79l.737-4.303-3.12-3.044a.75.75 0 0 1 .416-1.28l4.32-.628L9.336 1.418A.75.75 0 0 1 10 1zm0 2.445L8.615 5.903a.75.75 0 0 1-.564.41l-3.658.532 2.66 2.598a.75.75 0 0 1 .216.664l-.627 3.65 3.29-1.73a.75.75 0 0 1 .698 0l3.29 1.73-.626-3.65a.75.75 0 0 1 .216-.664l2.66-2.598-3.658-.532a.75.75 0 0 1-.564-.41L10 3.445z"/>
                </svg>
                <span className="text-yellow-500 text-sm">{rating} (25 reviews)</span>
            </div>
        </div>
    </div>
  )
}

export default ProductCard