<template>
  <header
    class="z-40 no-scrollbar sticky top-0"
    :class="{ dark: store.semidark && store.menu === 'horizontal' }"
  >
    <div class="shadow-xl no-scrollbar">
      <div
        class="relative flex w-full h-16 items-center bg-slate-100 px-5 py-2.5 dark:bg-[#0e1726]"
      >
        <div class="flex flex-row items-end space-x-6">
          <!-- Logo -->
          <NuxtLink :to="{ path: '/', query: { page: '1' } }" class="main-logo flex shrink-0 items-center">
            <div class="text-xl font-extrabold text-blue-700 font-serif">
              ARTICLE
            </div>
          </NuxtLink>

          <div class="flex flex-row space-x-4">
            <!-- All Posts -->
            <NuxtLink :to="{ path: '/', query: { page: '1', tab: 'publish' } }" class="main-logo flex shrink-0 items-end">
              <div :class="getActiveClass('/')" class="text-base font-bold text-end">
                All Posts
              </div>
            </NuxtLink>

            <!-- Add New -->
            <NuxtLink to="/add-new" class="main-logo flex shrink-0 items-end">
              <div :class="getActiveClass('/add-new')" class="text-base font-bold text-end">
                Add New
              </div>
            </NuxtLink>

            <!-- Preview -->
            <NuxtLink :to="{ path: '/preview', query: { page: '1' } }" class="main-logo flex shrink-0 items-end">
              <div :class="getActiveClass('/preview')" class="text-base font-bold text-end">
                Preview
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
import { useRoute } from "vue-router";

const store = useAppStore();
const route = useRoute();

// Fungsi untuk mengecek apakah path & query cocok
const isActive = (path: string) => {
  return route.path === path;
};

// Fungsi untuk memberikan class aktif
const getActiveClass = (path: string, query: Record<string, any> = {}) => {
  return isActive(path) ? "text-black" : "text-gray-500";
};
</script>


