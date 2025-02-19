<template>
  <div class="flex flex-col space-y-4 sm:space-y-0 md:space-y-0 lg:space-y-0 sm:flex-row md:flex-row lg:flex-row w-full items-center justify-between">
    <div class="flex flex-row items-center justify-between sm:justify-normal md:justify-normal lg:justify-normal w-full sm:space-x-4 md:space-x-4 lg:space-x-4">
      <div v-if="!noTotal">
        <p class="text-black hidden sm:block md:block lg:block">
          Showing {{ startEntry }} to {{ endEntry }} of
          {{ totalListData }} entries
        </p>
        <p class="text-black sm:hidden md:hidden lg:hidden">
          {{ startEntry }} - {{ endEntry }} of
          {{ totalListData }} entries
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <!-- <select
          id="itemsPerPage"
          v-model="currentItemsPerPage"
          @change="updateItemsPerPage"
          open-direction="above"
          class="border border-gray-300 rounded-md px-3 py-1 text-sm"
        >
          <option v-for="option in offsetOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select> -->
      </div>
    </div>

    <ul
      v-if="totalListData > 0 && totalPages > 1"
      class="flex items-center space-x-1 rtl:space-x-reverse"
    >
      <!-- Previous Button -->
      <li>
        <button
          type="button"
          class="flex justify-center rounded px-2 py-2 font-semibold transition shadow-sm"
          :class="
            currentPage === 1
              ? 'bg-black/5 text-white border'
              : 'bg-white text-black hover:bg-blue-700 hover:text-white border'
          "
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          <icon-caret-down class="w-5 h-5 rotate-90 rtl:-rotate-90" />
        </button>
      </li>

      <!-- Page Numbers -->
      <li>
        <button
          type="button"
          class="flex justify-center rounded px-2 py-1 sm:px-3.5 md:px-3.5 lg:px-3.5 sm:py-2 md:py-2 lg:py-2 font-semibold transition border hover:bg-blue-700 hover:text-white shadow-sm"
          :class="
            1 === currentPage ? 'bg-blue-700 text-white' : 'bg-white text-black'
          "
          @click="changePage(1)"
        >
          1
        </button>
      </li>

      <li v-if="showStartEllipsis">
        <span class="px-2">...</span>
      </li>

      <li v-for="page in middlePages" :key="page">
        <button
          type="button"
          class="flex justify-center rounded px-2 py-1 sm:px-3.5 md:px-3.5 lg:px-3.5 sm:py-2 md:py-2 lg:py-2 font-semibold transition border hover:bg-blue-700 hover:text-white shadow-sm"
          :class="
            page === currentPage
              ? 'bg-blue-700 text-white'
              : 'bg-white text-black'
          "
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </li>

      <li v-if="showEndEllipsis">
        <span class="px-2">...</span>
      </li>

      <li>
        <button
          type="button"
          class="flex justify-center rounded px-2 py-1 sm:px-3.5 md:px-3.5 lg:px-3.5 sm:py-2 md:py-2 lg:py-2 font-semibold transition border hover:bg-blue-700 hover:text-white shadow-sm"
          :class="
            totalPages === currentPage
              ? 'bg-blue-700 text-white'
              : 'bg-white text-black'
          "
          @click="changePage(totalPages)"
        >
          {{ totalPages }}
        </button>
      </li>

      <!-- Next Button -->
      <li>
        <button
          type="button"
          class="flex justify-center rounded px-2 py-2 font-semibold transition shadow-sm border"
          :class="
            currentPage === totalPages
              ? 'bg-black/5 text-white'
              : 'bg-white text-black hover:bg-blue-700 hover:text-white'
          "
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          <icon-caret-down class="w-5 h-5 -rotate-90 rtl:rotate-90" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    totalListData: { type: Number, required: true },
    currentPage: { type: Number, required: true, default: 1 },
    itemsPerPage: { type: Number, default: 20 }, // Default ke 20
    noTotal: { type: Boolean, default: false },
    paginationAlign: { type: String, default: "end" },
  },
  emits: ["update:currentPage"],
  setup(props, { emit }) {
    const currentPage = ref(props.currentPage);

    const totalPages = computed(() =>
      Math.ceil(props.totalListData / props.itemsPerPage)
    );

    const startEntry = computed(
      () => (currentPage.value - 1) * props.itemsPerPage + 1
    );

    const endEntry = computed(() =>
      Math.min(currentPage.value * props.itemsPerPage, props.totalListData)
    );

    const changePage = (page: number) => {
      if (page !== currentPage.value && page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        emit("update:currentPage", page);
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        changePage(currentPage.value - 1);
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        changePage(currentPage.value + 1);
      }
    };

    const showStartEllipsis = computed(() => currentPage.value > 3);
    const showEndEllipsis = computed(
      () => currentPage.value < totalPages.value - 2
    );

    const middlePages = computed(() => {
      const pages = [];
      const start = Math.max(2, currentPage.value - 1);
      const end = Math.min(totalPages.value - 1, currentPage.value + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });

    return {
      currentPage,
      totalPages,
      startEntry,
      endEntry,
      changePage,
      prevPage,
      nextPage,
      showStartEllipsis,
      showEndEllipsis,
      middlePages,
    };
  },
});
</script>

