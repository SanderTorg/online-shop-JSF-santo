"use client";

import { Product } from "@/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { useCartStore } from "@/lib/hooks/useCartStore";
import { toast } from "sonner";
import StarRating from "../../StarRating";

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const addItem = useCartStore((state) => state.addItemToCart);

  const hasDiscount = product.discountedPrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100,
      )
    : 0;

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    addItem(product);
    toast.success(`${product.title} added to cart!`);
  };
  return (
    <Link href={`/product/${product.id}`} className="group">
      <article className="relative flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg">
        {hasDiscount && (
          <Badge className="absolute left-3 top-3 z-10 bg-red-500 text-white hover:bg-red-500">
            - {discountPercentage} %
          </Badge>
        )}
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight">
            {product.title}
          </h3>

          <StarRating rating={product.rating}></StarRating>

          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-red-600">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            size="sm"
            className="mt-auto w-full cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </article>
    </Link>
  );
}
