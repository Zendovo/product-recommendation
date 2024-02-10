import * as React from 'react';
import Product from './components/Product';
import { Comment, ThreeDots } from 'react-loader-spinner';

export default function () {
  const [query, setQuery] = React.useState<string>();
  const [imageUrl, setImageUrl] = React.useState<string>();
  const [products, setProducts] = React.useState<{ name: string, description: string[] }[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [initial, setInitial] = React.useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = `REPLACE_BASE_URL/openai?` + new URLSearchParams({ idea: query });
      const response1 = await fetch(url, {
        method: 'GET',
      });

      const json1 = await response1.json();

      setImageUrl(json1.json[0].url);

      const productsUrl = `REPLACE_BASE_URL/openai/products?` + new URLSearchParams({ idea: query });
      const response2 = await fetch(productsUrl, {
        method: 'GET',
      });

      const json2 = await response2.json();

      setProducts(json2.data.products);
      setInitial(false);
      setLoading(false);
    } catch (error) {
      alert('An error ocurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-mono">
      <div className="container m-auto flex flex-col justify-center justify-items-center text-center py-32">
        <div className="text-5xl font-bold">Product Recommendation App</div>
        <div className="flex justify-around">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mt-10 min-w-[350px] sm:min-w-[500px] relative">
              <div className="absolute right-3 top-3" style={{ zIndex: 100 }}>
                {loading ? (
                  <ThreeDots
                    visible={true}
                    height="40"
                    width="40"
                    color="#fff"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : initial ? (
                  ''
                ) : (
                  <img className="rounded-lg border" src={imageUrl} alt="" width={40} />
                )}
              </div>
              <input
                className="rounded-xl px-4 py-4 w-full border-2 border-neutral-400 bg-neutral-800 focus:outline-0"
                type="text"
                placeholder="enter an idea..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="flex justify-around mt-6">
          <div className="flex flex-col glass mt-2 min-w-[350px] sm:min-w-[500px] max-w-[600px] py-4 px-6 rounded-xl">
            suggested products:
            {loading ? (
              <>
                <Comment
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="comment-loading"
                  wrapperStyle={{}}
                  wrapperClass="text-center w-full mt-8"
                  color="#000"
                  backgroundColor="#fff"
                />
                <div className="text-neutral-400">fetching response</div>
              </>
            ) : initial ? 
              (
                <div className="text-neutral-400">press enter to fetch responses</div>
              ) : (
              products.map((product) => {
                return <Product product={product} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
