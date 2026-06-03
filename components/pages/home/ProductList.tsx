"use client";

import { Product } from "@/lib/types/types";
import ProductListItem from "./ProductListItem";
import SearchBar from "../../SearchBar";
import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const query = searchParams.get("query") || "";

  const handleQuery = useCallback(
    (newQuery: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newQuery.trim()) {
        params.set("query", newQuery);
      } else {
        params.delete("query");
      }
      router.replace(`${pathName}?${params.toString()}`);
    },
    [router, pathName, searchParams],
  );

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter((product) =>
      product.title.toLowerCase().includes(lowerQuery),
    );
  }, [query, products]);

  return (
    <>
      <section className="pb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome to the Online Shop!
        </h1>

        <p className="pt-2 text-muted-foreground">
          Explore our wide range of products and enjoy shopping with us.
        </p>
        <div className="pt-6">
          <SearchBar query={query} onChange={handleQuery} />
        </div>
      </section>

      <section>
        {filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07 } },
            }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.35, ease: "easeOut" },
                  },
                }}
              >
                <ProductListItem product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">
            No products found for &quot;{query}&quot;. Try a different search.
          </p>
        )}
      </section>
    </>
  );
}
