import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsData from "../utils/productsData.json";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/slices/cartSlice";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const { id } = params;
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((store)=>store.cart);

  const getProductById = () => {
    const getProduct = productsData.find((item) => item.id == id);
    console.log(product);
    if (getProduct) {
      setProduct(getProduct);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  useEffect(()=>{
    const findItem = cart?.items.find((item)=>item.id==id);
    if(findItem){
      setIsAddedToCart(true);
    }
    else{
      setIsAddedToCart(false);
    }
  },[cart]);

  const handleAddToCart = () => {
    dispatch(addItem({ product, quantity: 1 }));
  };

  if (!product) return <h3>Product Not Found</h3>;

  return (
    <div className="p-7 flex flex-col md:flex-row justify-between items-center">
      <div>
        <img src={product.img} alt="product image" />
      </div>
      <div class="md:w-3/6 ml-4">
        <h2 class="text-xl font-semibold mb-2">{product.name}</h2>
        <p class="text-gray-600 text-sm mb-4">{product.description}</p>

        <div class="flex justify-between items-center mb-2">
          <div class="text-green-600 font-semibold text-lg">
            ${product.discountPrice}
          </div>

          <div class="text-gray-400 text-sm line-through">{product.price}</div>

          <div class="text-green-600 font-semibold text-sm">
            ({Math.round((product.discountPrice / product.price) * 100)}% off)
          </div>
        </div>

        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-yellow-500 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 1a.75.75 0 0 1 .664.418l1.93 3.862 4.32.628a.75.75 0 0 1 .416 1.279l-3.12 3.045.737 4.302a.75.75 0 0 1-1.088.791L10 13.347l-3.865 2.03a.75.75 0 0 1-1.088-.79l.737-4.303-3.12-3.044a.75.75 0 0 1 .416-1.28l4.32-.628L9.336 1.418A.75.75 0 0 1 10 1zm0 2.445L8.615 5.903a.75.75 0 0 1-.564.41l-3.658.532 2.66 2.598a.75.75 0 0 1 .216.664l-.627 3.65 3.29-1.73a.75.75 0 0 1 .698 0l3.29 1.73-.626-3.65a.75.75 0 0 1 .216-.664l2.66-2.598-3.658-.532a.75.75 0 0 1-.564-.41L10 3.445z" />
          </svg>
          <span class="text-yellow-500 text-sm">
            {product.rating} (25 reviews)
          </span>
        </div>

        <div class="mt-4">
          <button
            onClick={handleAddToCart}
            class={`${isAddedToCart?"bg-green-400":"bg-purple-500 hover:bg-purple-600"} text-white px-4 py-2 rounded-lg `}
          >
            {
              isAddedToCart ? "Added to Cart": "Add to Cart"
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
