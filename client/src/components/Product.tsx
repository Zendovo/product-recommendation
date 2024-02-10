import * as React from 'react';

export default function ({ product }: { product: { name: string, description: string[] } }) {
  return (
    <div className="p-3 flex flex-col justify-items-start text-left rounded-lg border-2 mt-4" style={{ background: "linear-gradient(110.6deg, rgb(156, 116, 129) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(27, 23, 36) 99.1%)" }}>
      <div className="text-xl font-semibold">{product.name}</div>
      {product.description.map((desc: string) => {
        return (
            <div className="text-neutral-300 text-lg mt-2">- {desc}</div>
        )
      })}
    </div>
  );
}
