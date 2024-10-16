import { reactive, watch } from "vue";
import { useNuxtApp } from "#app";
import type { Product } from "~/types/ProductType";

const isBrowser = typeof window !== "undefined";

const favorites = reactive<{ items: Product[] }>({
  items:
    isBrowser && localStorage.getItem("favoriteItems")
      ? JSON.parse(localStorage.getItem("favoriteItems") as string)
      : [],
});

export function useFavoriteProduct() {
  const { $toast } = useNuxtApp();

  const addToFavorites = (product: Product) => {
    const existingItem = favorites.items.find((item) => item.id === product.id);

    if (existingItem) {
      $toast.error(`${product.title} is already in your favorites!`, {
        autoClose: 700,
      });
    } else {
      favorites.items.push(product);
      $toast.success(`${product.title} added to favorites!`, {
        autoClose: 700,
      });
    }
  };

  const removeFromFavorites = (product: Product) => {
    const index = favorites.items.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      favorites.items.splice(index, 1);
      $toast.error(`${product.title} removed from favorites!`, {
        autoClose: 700,
      });
    } else {
      $toast.error(`${product.title} is not in your favorites!`, {
        autoClose: 700,
      });
    }
  };

  if (isBrowser) {
    watch(
      () => favorites.items,
      (newItems) => {
        localStorage.setItem("favoriteItems", JSON.stringify(newItems));
      },
      { deep: true }
    );
  }

  return { favorites, addToFavorites, removeFromFavorites };
}
