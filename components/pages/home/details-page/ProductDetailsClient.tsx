"use client";

import { Product } from "@/lib/types/types";
import { Badge } from "../../../ui/badge";
import Image from "next/image";
import StarRating from "../../../StarRating";
import { Separator } from "../../../ui/separator";
import { Button } from "../../../ui/button";
import { useCartStore } from "@/lib/hooks/useCartStore";
import { toast } from "sonner";
import { Star } from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({
  product,
}: ProductDetailsClientProps) {
  const addItem = useCartStore((state) => state.addItemToCart);

  const { price, discountedPrice } = product;

  const hasDiscount = discountedPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          {hasDiscount && (
            <Badge className="absolute left-3 top-3 z-10 bg-red-500 text-white hover:bg-red-500">
              - {discountPercentage}%
            </Badge>
          )}
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {product.title}
          </h1>

          <StarRating rating={product.rating} />

          <div className="flex flex-wrap items-baseline gap-3">
            {hasDiscount ? (
              <>
                <span className="text-3xl font-bold text-red-600">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
                <Badge variant="secondary">
                  Save ${(price - discountedPrice).toFixed(2)}
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">${price.toFixed(2)}</span>
            )}
          </div>

          <Separator />

          <div>
            <h2 className=" text-sm font-semibold uppercase text-muted-foreground">
              Description
            </h2>
            <p className="leading-relaxed text-foreground/80">
              {product.description}
            </p>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button
            size="lg"
            className="mt-4 w-full cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>

        {product.reviews && product.reviews.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-semibold">
              Reviews ({product.reviews.length})
            </h2>
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      {review.username}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
