<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-500">{{ error.statusCode }}</h1>
      <p class="text-xl text-gray-700 mt-4">{{ error.message }}</p>
      <p class="text-lg text-gray-500 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        @click="goHome"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useError } from "vue-router";

const router = useRouter();
const error = useError();

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
/* Add any styles for your error page here */
</style>
