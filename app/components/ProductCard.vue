<script setup lang="ts">
import { useFavoriteProduct } from "~/composables/useFavoriteProduct";
import { useCart } from "~/composables/useCart";
import type { Product } from "~/types/ProductType";

defineProps<{
  product: Product;
  favoriteProduct: boolean;
  showRemoveButton?: boolean;
  watchedProduct: boolean;
}>();

const { addToFavorites, removeFromFavorites } = useFavoriteProduct();
const { addToCart } = useCart();
</script>

<template>
  <div
    class="flex flex-col justify-evenly gap-3 p-4 border rounded-lg shadow-lg bg-white relative"
  >
    <button
      v-if="showRemoveButton"
      @click="removeFromFavorites(product)"
      class="absolute top-1 right-1 text-white px-2 py-1 text-xl"
    >
      <Icon name="mdi:remove" style="color: #e61919" />
    </button>
    <NuxtLink :to="`/productdetails/${product.id}`">
      <div>
        <img
          :src="product.image"
          alt="Product Image"
          class="h-40 object-content rounded-md mb-2 block m-auto"
        />
      </div>
    </NuxtLink>

    <div class="flex items-center justify-between my-4">
      <p
        class="px-4 py-2 bg-blue-200 rounded-md text-xs text-blue-700 font-semibold"
      >
        Up to 35% off
      </p>
      <div class="flex gap-6 mr-8 text-slate-500 mt-auto">
        <Icon
          name="mdi:eye-outline"
          :style="{ color: watchedProduct ? '#1e90ff' : 'inherit' }"
        />

        <button
          @click="addToFavorites(product)"
          :disabled="favoriteProduct"
          class="disabled:cursor-not-allowed"
        >
          <Icon
            name="material-symbols:favorite-outline"
            :style="{ color: favoriteProduct ? '#1e90ff' : 'inherit' }"
          />
        </button>
      </div>
    </div>

    <NuxtLink
      :to="`/productdetails/${product.id}`"
      class="text-slate-900 hover:text-blue-600"
    >
      <h2 class="text-lg font-bold mb-1">{{ product.title }}</h2>
    </NuxtLink>

    <div class="flex gap-2">
      <div>
        <Icon
          name="ic:baseline-star-rate"
          style="color: #f9f106"
          v-for="n in Math.floor(product.rating.rate)"
          :key="'full-' + n"
        />

        <Icon
          v-if="product.rating.rate % 1 >= 0.5"
          name="ic:outline-star-half"
          style="color: #f9f106"
          :key="'half'"
        />

        <Icon
          name="ic:outline-star-rate"
          style="color: #f9f106"
          v-for="n in 5 - Math.ceil(product.rating.rate)"
          :key="'outline-' + n"
        />
      </div>
      <p class="text-sm text-slate-900">{{ product.rating.rate }}</p>
      <p class="text-sm text-slate-400">({{ product.rating.count }})</p>
    </div>

    <div class="flex items-center gap-8 text-slate-400">
      <div class="flex items-center gap-1">
        <Icon name="iconoir:delivery-truck" />
        <span>Fast Delivery</span>
      </div>
      <div class="flex items-center">
        <Icon name="mdi:discount-box-outline" />
        <span>Best Price</span>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <p class="text-2xl font-black text-slate-900 mb-1">
        ${{ product.price }}
      </p>
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        @click="addToCart(product)"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>
