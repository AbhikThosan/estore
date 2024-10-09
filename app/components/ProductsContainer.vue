<script setup lang="ts">
import type { PropType } from "vue";
const props = defineProps({
  products: {
    type: Array as PropType<Array<any>>,
    required: true,
  },
});
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
