<script setup lang="ts">
import CartSummary from "~/components/CartSummary.vue";
import CartItemsContainer from "~/components/CartItemsContainer.vue";
</script>

<template>
  <div class="mx-auto mt-[100px] py-4 px-4 md:px-16">
    <h2 class="text-2xl font-bold mb-4">Your Cart</h2>

    <div class="flex flex-col lg:flex-row gap-8">
      <div class="w-full lg:w-2/3">
        <CartItemsContainer />
      </div>
      <div class="w-full lg:w-1/3">
        <CartSummary />
      </div>
    </div>
  </div>
</template>
