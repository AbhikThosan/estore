import { ref } from "vue";
import type { Product } from "~/types/ProductType";

export const useSingleProduct = () => {
  const product = ref<Product | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const fetchSingleProduct = async (productId: number) => {
    loading.value = true;
    try {
      const data = await $fetch<Product>(
        `https://fakestoreapi.com/products/${productId}`
      );
      product.value = data;
    } catch (err) {
      error.value = "Failed to fetch product details.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    product,
    error,
    loading,
    fetchSingleProduct,
  };
};
