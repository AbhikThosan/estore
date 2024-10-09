<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCart } from "~/composables/useCart";
import CartItem from "./CartItem.vue";

const { cart } = useCart();
const isLoading = ref(true);

const updateCartItem = (productId: number, newQuantity: number) => {
  const cartItem = cart.items.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity = newQuantity;
  }
};

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <div class="space-y-4">
    <div v-if="isLoading" class="text-lg text-center">Loading cart...</div>
    <div v-else-if="cart.items.length > 0" class="flex flex-col gap-6">
      <CartItem
        v-for="product in cart.items"
        :key="product.id"
        :product="product"
        @update-quantity="updateCartItem"
      />
    </div>
    <p v-else class="text-lg text-center md:text-left">Your cart is empty.</p>
  </div>
</template>
