import * as React from 'react';
import Product from './components/Product';

export default function () {
  const [query, setQuery] = React.useState<string>();
  const [imageUrl, setImageUrl] = React.useState<string>(
    'https://oaidalleapiprodscus.blob.core.windows.net/private/org-cocwtm6YhDGwmFWb4lGgyipN/user-vl6IDP4MOqzT3HzxS9OFR17g/img-8rTBSRNKNgNqmzkdhFgJViJu.png?st=2024-02-09T21%3A42%3A11Z&se=2024-02-09T23%3A42%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-02-09T21%3A41%3A34Z&ske=2024-02-10T21%3A41%3A34Z&sks=b&skv=2021-08-06&sig=iJVliBLZXqFTCJpShCDQKfjlq3RAdeah52gdOOD5wRE%3D',
  );
  const [products, setProducts] = React.useState<any[]>([
    {
      name: 'MyFitnessPal',
      description: [
        'MyFitnessPal is a popular fitness app that helps users track their daily food intake and exercise routines.',
      ],
    },
    {
      name: 'Nike Training Club',
      description: [
        'Nike Training Club is a fitness app by Nike that offers a variety of workout programs and personalized training plans.',
      ],
    },
    {
      name: 'Fitbit',
      description: [
        'Fitbit is a fitness tracker that also includes a mobile app for tracking activities, exercise, food intake, and sleep patterns.',
      ],
    },
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `${process.env.BASE_URL}/openai?` + new URLSearchParams({ idea: query });
    const response1 = await fetch(url, {
      method: 'GET',
    });

    const json1 = await response1.json();

    console.log(json1.json[0].url);
    setImageUrl(json1.json[0].url);

    const productsUrl = `${process.env.BASE_URL}/openai/products?` + new URLSearchParams({ idea: query });
    const response2 = await fetch(productsUrl, {
      method: 'GET',
    });

    const json2 = await response2.json();

    console.log(json2.data.products);
    setProducts(json2.data.products);
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
