<script setup lang="ts">
import { computed } from "vue";
import { useCart } from "~/composables/useCart";

const { cart } = useCart();

const originalPrice = computed(() => {
  return cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

const savings = computed(() => {
  return (originalPrice.value * 0.05).toFixed(2);
});

const tax = computed(() => {
  return (originalPrice.value * 0.075).toFixed(2);
});

const storePickup = 99;

const total = computed(() => {
  return (
    originalPrice.value -
    Number(savings.value) +
    Number(tax.value) +
    storePickup
  ).toFixed(2);
});
</script>

<template>
  <div v-if="cart.items.length > 0" class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
    <div class="space-y-2">
      <div class="flex justify-between text-gray-700">
        <span>Original Price</span>
        <span class="font-semibold">${{ originalPrice.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-green-500">
        <span>Savings</span>
        <span class="font-semibold">- ${{ savings }}</span>
      </div>
      <div class="flex justify-between text-gray-700">
        <span>Store Pickup</span>
        <span class="font-semibold">${{ storePickup }}</span>
      </div>
      <div class="flex justify-between text-gray-700">
        <span>Tax</span>
        <span class="font-semibold">${{ tax }}</span>
      </div>
      <div class="flex justify-between text-xl font-bold mt-4">
        <span>Total</span>
        <span>${{ total }}</span>
      </div>
    </div>

    <button
      class="bg-blue-600 text-white w-full py-2 mt-6 rounded-md font-semibold hover:bg-blue-700 transition"
    >
      Proceed to Checkout
    </button>

    <div class="text-center mt-4">
      <NuxtLink to="/" class="text-blue-600 hover:underline">
        or Continue Shopping
      </NuxtLink>
    </div>
    <div class="bg-gray-100 p-4 mt-6 rounded-md">
      <label for="voucher" class="block text-sm text-gray-600 mb-2"
        >Do you have a voucher or gift card?</label
      >
      <input
        type="text"
        id="voucher"
        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter code"
      />
      <button
        class="w-full bg-blue-600 text-white py-2 mt-4 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        Apply Code
      </button>
    </div>
  </div>
</template>
