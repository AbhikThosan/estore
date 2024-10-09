<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSingleProduct } from "~/composables/useSingleProducts";
import { useCart } from "~/composables/useCart";
import { useFavoriteProduct } from "~/composables/useFavoriteProduct";

const route = useRoute();
const productId = parseInt(route.params.id ? String(route.params.id) : "0", 10);

const { product, loading, error, fetchSingleProduct } = useSingleProduct();
const { addToCart } = useCart();
const { addToFavorites } = useFavoriteProduct();

onMounted(() => {
  fetchSingleProduct(productId);
});
</script>

<template>
  <div class="container mx-auto py-8 mt-[100px] px-4 sm:px-6 lg:px-8">
    <div v-if="loading" class="text-center text-xl font-semibold">
      Loading product details...
    </div>

    <div v-if="error" class="text-center text-red-500 text-xl font-semibold">
      {{ error }}
    </div>

    <div v-if="product" class="flex flex-col md:flex-row gap-6">
      <div class="flex-1">
        <img
          :src="product.image"
          :alt="product.title"
          class="object-content h-64 sm:h-80 md:h-[400px] lg:h-[500px] block m-auto"
        />
      </div>

      <div class="flex-1 flex flex-col gap-4 justify-between">
        <h1 class="text-lg sm:text-xl lg:text-2xl font-bold">
          {{ product.title }}
        </h1>

        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <p class="text-xl sm:text-2xl font-bold">
            Price: ${{ product.price }}
          </p>
          <div class="flex items-center gap-2">
            <div class="flex gap-1">
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

            <p class="text-slate-500">({{ product.rating.rate }})</p>
            <NuxtLink
              to="/"
              class="text-slate-900 underline underline-offset-2"
            >
              {{ product.rating.count }} Reviews
            </NuxtLink>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row items-center gap-4 pb-8 mb-4 border-b-4 border-slate-100"
        >
          <button
            class="w-full sm:w-auto flex items-center gap-3 text-sm font-semibold text-slate-800 px-6 py-2 rounded-lg border-2 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition duration-200"
            @click="addToFavorites(product)"
          >
            <Icon name="material-symbols:favorite-outline" />
            Add to Favorite
          </button>
          <button
            class="w-full sm:w-auto flex items-center gap-3 text-sm font-semibold text-slate-800 px-6 py-2 rounded-lg border-2 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition duration-200"
            @click="addToCart(product)"
          >
            <Icon name="ic:baseline-add-shopping-cart" />
            Add to Cart
          </button>
        </div>

        <p class="text-slate-400 mb-4 text-sm sm:text-base lg:text-lg">
          {{ product.description }}
        </p>
      </div>
    </div>
  </div>
</template>
