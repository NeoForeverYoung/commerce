import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  // Is there any better solution?
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            {/* {`/product/${product.handle}`} is a next.js relative path. */}
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                //  The optional chaining operator (?.) is a feature in JavaScript that allows you to safely access deeply nested properties of an object without having to explicitly check if each level of the object exists. 
                // If any part of the chain is null or undefined, it short-circuits and returns undefined instead of causing an error. 
                // example: const firstNotificationPref = user.preferences?.notifications?.email;
                src={product.featuredImage?.url}
                // In the Next.js <Image> component, the fill attribute is indeed a boolean and can be set without explicitly setting it to true. It's equal to fill={true}.
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
