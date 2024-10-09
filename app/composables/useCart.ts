import { reactive, watch } from "vue";
import { useNuxtApp } from "#app";
import type { Product } from "~/types/ProductType";

interface CartItem extends Product {
  quantity: number;
}

const isBrowser = typeof window !== "undefined";

const cart = reactive<{ items: CartItem[] }>({
  items:
    isBrowser && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") as string)
      : [],
});

export function useCart() {
  const { $toast } = useNuxtApp();

  const addToCart = (product: Product) => {
    const existingItem = cart.items.find((item) => item.id === product.id);

    if (existingItem) {
      $toast.error(`${product.title} is already in the cart!`, {
        autoClose: 700,
      });
    } else {
      cart.items.push({ ...product, quantity: 1 });
      $toast.success(`${product.title} added to the cart!`, {
        autoClose: 700,
      });
    }
  };

  if (isBrowser) {
    watch(
      () => cart.items,
      (newItems) => {
        localStorage.setItem("cartItems", JSON.stringify(newItems));
      },
      { deep: true }
    );
  }

  return { cart, addToCart };
}
