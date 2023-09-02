import React from 'react'

const FilterCard = () => {
  return (
    <div class="min-h-screen absolute ">

        <div class="bg-white shadow-md p-4 mx-auto mt-6 w-80 rounded-lg">
            <h2 class="text-lg font-semibold mb-4">Filters</h2>


            <div class="mb-4">
                <p class="text-gray-600 mb-2">Rating:</p>
                <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-blue-600" checked/>
                    <span class="ml-2">Above 4</span>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-blue-600"/>
                    <span class="ml-2">Above 3</span>
                </label>
            </div>

            <div class="mb-4">
                <p class="text-gray-600 mb-2">Price:</p>
                <label class="flex items-center">
                    <input type="radio" name="price-filter" class="form-radio text-blue-600" checked/>
                    <span class="ml-2">Low to High</span>
                </label>
                <label class="flex items-center">
                    <input type="radio" name="price-filter" class="form-radio text-blue-600"/>
                    <span class="ml-2">High to Low</span>
                </label>
            </div>


            <div>
                <p class="text-gray-600 mb-2">Discount:</p>
                <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-blue-600"/>
                    <span class="ml-2">10%</span>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-blue-600"/>
                    <span class="ml-2">20%</span>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-blue-600"/>
                    <span class="ml-2">30%</span>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-blue-600"/>
                    <span class="ml-2">40%</span>
                </label>
            </div>
        </div>
    </div>
  )
}

export default FilterCard