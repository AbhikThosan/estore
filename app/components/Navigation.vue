<script setup lang="ts">
import { useCart } from "~/composables/useCart";
import { useNuxtApp } from "#app";
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

const { cart } = useCart();
const { $toast } = useNuxtApp();
const router = useRouter();

const isSticky = ref(false);
const mobileMenuOpen = ref(false);

const goToCart = () => {
  if (cart.items.length === 0) {
    $toast.error("Your cart is empty!");
  } else {
    router.push("/cart");
  }
};

const handleScroll = () => {
  isSticky.value = window.scrollY > 50;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    :class="[
      'py-4 border-b fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isSticky ? 'bg-white shadow-lg' : 'bg-transparent',
    ]"
  >
    <nav class="container flex items-center justify-between mx-auto">
      <NuxtLink to="/" class="flex gap-1 items-center">
        <img
          width="56px"
          src="~/assets/icon-green.png"
          alt="EStore Logo"
        />
        <span class="text-3xl font-bold">EStore</span>
      </NuxtLink>

      <ul class="hidden md:flex gap-6 ml-auto text-xl font-bold capitalize">
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/favorite">Favorite Products</NuxtLink>
        </li>
        <li>
          <a @click.prevent="goToCart" class="cursor-pointer">Cart</a>
        </li>
      </ul>

      <button
        @click="toggleMobileMenu"
        class="md:hidden focus:outline-none"
        aria-label="Toggle mobile menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <ul
        v-if="mobileMenuOpen"
        class="absolute top-full left-0 w-full bg-white flex flex-col items-center gap-4 text-xl font-bold py-6 shadow-lg md:hidden transition-all duration-300"
      >
        <li>
          <NuxtLink to="/" @click="mobileMenuOpen = false">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/favorite" @click="mobileMenuOpen = false"
            >Favorite Products</NuxtLink
          >
        </li>
        <li>
          <a
            @click.prevent="
              goToCart;
              mobileMenuOpen = false;
            "
            class="cursor-pointer"
            >Cart</a
          >
        </li>
      </ul>
    </nav>
  </header>
</template>
