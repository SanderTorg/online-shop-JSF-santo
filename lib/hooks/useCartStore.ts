import { create } from "zustand";
import { Product } from "../types/types";
import { persist } from "zustand/middleware";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface State {
  items: CartItem[];
}

interface Actions {
  addItemToCart: (product: Product) => void;
  removeItemFromCart: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearItemFromCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      items: [],

      addItemToCart: (product: Product) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id,
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            items: [...items, { product, quantity: 1 }],
          });
        }
      },

      removeItemFromCart: (productId: string) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.product.id !== productId),
        });
      },

      clearItemFromCart: () => {
        set({ items: [] });
      },

      updateItemQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItemFromCart(productId);
          return;
        }
        const { items } = get();
        set({
          items: items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
        });
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.product.discountedPrice * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
