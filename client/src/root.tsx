import * as React from 'react';
import Product from './components/Product';

export default function () {
  return (
    <div className="bg-black h-screen text-white">
      <div className="container m-auto flex flex-col justify-center justify-items-center text-center py-32">
        <div className="text-5xl">Product Recommendation App</div>
        <div className="flex justify-around">
          <input
            className="mt-10 rounded-xl px-4 py-4 min-w-[500px] bg-black border-2 glass"
            type="text"
            placeholder="enter an idea..."
          />
        </div>
        <div className="flex justify-around mt-6">
          <div className="flex flex-col glass mt-2 min-w-[500px] py-4 px-6 rounded-xl">
            suggested products:
            <Product />
            <Product />
            <Product />
          </div>
        </div>
      </div>
    </div>
  );
}
