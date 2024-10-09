<script setup lang="ts">
import { onMounted } from "vue";
import { useProducts } from "~/composables/useProducts";

const { products, error, loading, fetchProducts } = useProducts();

onMounted(() => {
  fetchProducts();
});
</script>
<template>
  <Hero />

  <div v-if="loading">Loading products...</div>
  <div class="container mx-auto py-8">
    <ProductsContainer v-if="!loading && !error" :products="products" />
    <div v-if="error" class="text-center text-red-500 text-xl font-semibold">
      Something went wrong.
    </div>
  </div>
</template>
