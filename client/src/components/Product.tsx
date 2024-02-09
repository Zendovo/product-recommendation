import * as React from 'react';

export default function ({ product }: { product: any }) {
  return (
    <div className="p-3 flex flex-col justify-items-start text-left bg-black rounded-lg border-2 mt-4">
      <div className="text-xl">{product.name}</div>
      {product.description.map((desc: string) => {
        return (
            <div className="text-lg">- {desc}</div>
        )
      })}
    </div>
  );
}
