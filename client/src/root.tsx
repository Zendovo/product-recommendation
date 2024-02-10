import * as React from 'react';
import Product from './components/Product';

export default function () {
  const [query, setQuery] = React.useState<string>();
  const [imageUrl, setImageUrl] = React.useState<string>();
  const [products, setProducts] = React.useState<any[]>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = `${process.env.BASE_URL}/openai?` + new URLSearchParams({ idea: query });
      const response1 = await fetch(url, {
        method: 'GET',
      });

      const json1 = await response1.json();

      setImageUrl(json1.json[0].url);

      const productsUrl = `${process.env.BASE_URL}/openai/products?` + new URLSearchParams({ idea: query });
      const response2 = await fetch(productsUrl, {
        method: 'GET',
      });

      const json2 = await response2.json();

      setProducts(json2.data.products);
    } catch (error) {
      alert('An error ocurred');
    }
  };

  return (
    <div className="bg-black h-screen text-white">
      <div className="container m-auto flex flex-col justify-center justify-items-center text-center py-32">
        <div className="text-5xl">Product Recommendation App</div>
        <div className="flex justify-around">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mt-10 min-w-[500px] relative">
              <div className="absolute right-3 top-3" style={{ zIndex: 100 }}>
                <img className="rounded-lg border" src={imageUrl} alt="" width={40} />
              </div>
              <input
                className="rounded-xl px-4 py-4 w-full bg-black border-2 glass"
                type="text"
                placeholder="enter an idea..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="flex justify-around mt-6">
          <div className="flex flex-col glass mt-2 min-w-[500px] py-4 px-6 rounded-xl">
            suggested products:
            {products.map((product) => {
              return <Product product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
