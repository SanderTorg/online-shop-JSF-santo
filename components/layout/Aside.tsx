"use client";

import { useSidebarMenu } from "@/lib/hooks/useSidebarMenu";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { useCartStore } from "@/lib/hooks/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Product } from "@/lib/types/types";

export default function CartAside() {
  const { isOpen, close } = useSidebarMenu();
  const {
    items,
    removeItemFromCart,
    updateItemQuantity,
    clearItemFromCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const handleRemove = (productId: string, title: string) => {
    removeItemFromCart(productId);
    toast.success(`${title} removed from cart`);
  };

  const hasDiscount = (product: Product) => {
    return product.discountedPrice < product.price;
  };

  return (
    <>
      {isOpen && (
        <aside className="fixed right-0 top-0 z-50 hidden h-full w-85 flex-col border-l bg-background shadow-xl md:flex animate-in slide-in-from-right duration-200">
          <div className="flex h-full flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Cart {getTotalItems() > 0 && `(${getTotalItems()} items)`}
              </h2>

              <button
                onClick={close}
                className=" rounded-md p-1 hover:bg-accent"
                aria-label="Close cart sidebar"
              >
                <X className="h-5 w-5 cursor-pointer" />
              </button>
            </div>

            <Separator className="my-2" />

            <>
              <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-start gap-3 rounded-md border bg-background p-3"
                  >
                    <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded bg-muted">
                      <Image
                        src={item.product.image.url}
                        alt={item.product.image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-1 min-w-0">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="truncate text-xs font-semibold hover:underline"
                        onClick={close}
                      >
                        {item.product.title}
                      </Link>

                      {hasDiscount(item.product) ? (
                        <div className="flex items-center gap-1">
                          <p className="text-m font-medium text-red-600">
                            ${item.product.discountedPrice.toFixed(2)}
                          </p>
                          <p className="text-sm font-medium text-muted-foreground line-through">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-muted-foreground">
                          ${item.product.price.toFixed(2)}
                        </p>
                      )}

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateItemQuantity(
                              item.product.id,
                              item.quantity - 1,
                            )
                          }
                          className="flex cursor-pointer h-5 w-5 items-center justify-center rounded border text-xs hover:bg-accent"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateItemQuantity(
                              item.product.id,
                              item.quantity + 1,
                            )
                          }
                          className="flex cursor-pointer h-5 w-5 items-center justify-center rounded border text-xs hover:bg-accent"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-1 ">
                      <button
                        className="text-destructive hover:text-destructive/80 cursor-pointer"
                        aria-label="Remove item"
                        onClick={() =>
                          handleRemove(item.product.id, item.product.title)
                        }
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <span className="text-xs font-bold">
                        $
                        {hasDiscount(item.product)
                          ? (
                              item.product.discountedPrice * item.quantity
                            ).toFixed(2)
                          : (item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="text-base font-bold">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <Button
                className="w-full bg-red-500 cursor-pointer hover:bg-red-600"
                onClick={clearItemFromCart}
              >
                Clear cart
              </Button>
              <Button asChild className="w-full">
                <Link href="/cart" onClick={close}>
                  Checkout
                </Link>
              </Button>
            </>
          </div>
        </aside>
      )}
    </>
  );
}
