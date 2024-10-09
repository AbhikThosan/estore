import { ref } from "vue";
import type { Product } from "~/types/ProductType";

export const useProducts = () => {
  const products = ref<Product[]>([]);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const data = await $fetch<Product[]>("https://fakestoreapi.com/products");
      products.value = data;
    } catch (err) {
      error.value = "Failed to fetch products.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    error,
    loading,
    fetchProducts,
  };
};
