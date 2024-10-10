<script setup lang="ts">
import type { PropType } from "vue";
import { useFavoriteProduct } from "~/composables/useFavoriteProduct";
import { useWatchList } from "~/composables/useWatchList";

const { favorites } = useFavoriteProduct();
const { watchList } = useWatchList();

const props = defineProps({
  products: {
    type: Array as PropType<Array<any>>,
    required: true,
  },
});

const isFavorite = (productId: number) => {
  return favorites.items.some(
    (favorite: { id: number }) => favorite.id === productId
  );
};
const isWatched = (productId: number) => {
  return watchList.items.some(
    (watched: { id: number }) => watched.id === productId
  );
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      :favoriteProduct="isFavorite(product.id)"
      :watchedProduct="isWatched(product.id)"
    />
  </div>
</template>
