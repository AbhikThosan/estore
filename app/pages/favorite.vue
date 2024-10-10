<script setup lang="ts">
import { useFavoriteProduct } from "~/composables/useFavoriteProduct";
import { useWatchList } from "~/composables/useWatchList";
import ProductCard from "~/components/ProductCard.vue";

const { favorites } = useFavoriteProduct();
const { watchList } = useWatchList();

const isWatched = (productId: number) => {
  return watchList.items.some(
    (watched: { id: number }) => watched.id === productId
  );
};
</script>

<template>
  <div class="container mx-auto mt-[100px] py-8">
    <h1 class="text-2xl font-bold mb-6">Your Favorite Products</h1>

    <div v-if="favorites.items.length === 0" class="text-center">
      <p class="text-lg">No favorite products yet!</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in favorites.items"
        :key="product.id"
        :product="product"
        :favoriteProduct="true"
        :showRemoveButton="true"
        :watchedProduct="isWatched(product.id)"
      />
    </div>
  </div>
</template>
