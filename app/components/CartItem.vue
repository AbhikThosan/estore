<script setup lang="ts">
import { useCart } from "~/composables/useCart";
import { ref, defineProps, onMounted } from "vue";
import { useFavoriteProduct } from "~/composables/useFavoriteProduct";
import type { Product } from "~/types/ProductType";

const props = defineProps<{ product: Product }>();
const { cart } = useCart();
const quantity = ref(1);
const totalPrice = ref(props.product.price);

const { addToFavorites } = useFavoriteProduct();

onMounted(() => {
  const cartItem = cart.items.find((item) => item.id === props.product.id);
  if (cartItem) {
    quantity.value = cartItem.quantity;
    totalPrice.value = cartItem.quantity * props.product.price;
  }
});

const increaseQuantity = () => {
  if (quantity.value < 5) {
    quantity.value += 1;
    totalPrice.value = props.product.price * quantity.value;
    const cartItem = cart.items.find((item) => item.id === props.product.id);
    if (cartItem) {
      cartItem.quantity = quantity.value;
    }
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
    totalPrice.value = props.product.price * quantity.value;
    const cartItem = cart.items.find((item) => item.id === props.product.id);
    if (cartItem) {
      cartItem.quantity = quantity.value;
    }
  }
};

const removeItem = () => {
  const itemIndex = cart.items.findIndex(
    (item) => item.id === props.product.id
  );
  if (itemIndex !== -1) {
    cart.items.splice(itemIndex, 1);
  }
};
</script>

<template>
  <div
    class="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border rounded-lg shadow-md bg-white mb-4"
  >
    <div class="flex-shrink-0">
      <img
        :src="product.image"
        :alt="product.title"
        class="h-24 w-24 md:h-32 md:w-32 object-contain"
      />
    </div>
    <div class="flex flex-col w-full md:w-1/2 gap-2 md:gap-4">
      <h2
        class="text-sm md:text-base font-semibold text-slate-900 text-center md:text-left"
      >
        {{ product.title }}
      </h2>
      <div
        class="flex justify-center md:justify-start gap-4 text-sm font-semibold"
      >
        <button
          class="flex items-center gap-1 text-slate-500"
          @click="addToFavorites(product)"
        >
          Add to Favorites
        </button>
        <button
          class="flex items-center gap-1 text-red-600"
          @click="removeItem"
        >
          Remove
        </button>
      </div>
    </div>
    <div class="flex justify-center md:justify-start items-center gap-2">
      <button
        @click="decreaseQuantity"
        class="px-[8px] border-2 rounded-lg bg-slate-100 hover:bg-slate-300"
      >
        -
      </button>
      <span class="px-4 font-semibold">{{ quantity }}</span>
      <button
        @click="increaseQuantity"
        class="px-[8px] border-2 rounded-lg bg-slate-100 hover:bg-slate-300"
      >
        +
      </button>
    </div>
    <div class="flex flex-col items-center md:items-end">
      <p class="text-lg font-bold text-slate-900">${{ totalPrice }}</p>
    </div>
  </div>
</template>
