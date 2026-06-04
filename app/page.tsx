import ProductList from "@/components/pages/home/ProductList";
import { fetchProducts } from "@/lib/services/api";
import { Product } from "@/lib/types/types";

export default async function Home() {
  let products: Product[] = [];
  try {
    products = await fetchProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <ProductList products={products} />
      </div>
    </main>
  );
}
