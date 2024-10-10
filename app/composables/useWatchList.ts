import { reactive, watch } from "vue";
import type { Product } from "~/types/ProductType";

const isBrowser = typeof window !== "undefined";

const watchList = reactive<{ items: Product[] }>({
  items:
    isBrowser && localStorage.getItem("watchList")
      ? JSON.parse(localStorage.getItem("watchList") as string)
      : [],
});

export function useWatchList() {
  const addProductToWatchList = (product: Product) => {
    const existingProduct = watchList.items.find((p) => p.id === product.id);

    if (!existingProduct) {
      watchList.items.push(product);
      localStorage.setItem("watchList", JSON.stringify(watchList.items));
    }
  };
  return { watchList, addProductToWatchList };
}
