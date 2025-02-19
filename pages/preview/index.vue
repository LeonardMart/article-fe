<template>
  <div class="flex flex-col space-y-4">
    <div
      v-for="row in rows"
      :key="row.id"
      class="border-b p-6 flex bg-white flex-col space-y-4 rounded-lg"
    >
      <div class="flex flex-col space-y-1.5">
        <div class="flex flex-row justify-between items-center">
          <div class="text-xl font-bold">{{ row.title }}</div>
          <div class="text-sm font-semibold text-gray-400">
            {{ row.createdAt }}
          </div>
        </div>
        <div class="text-sm text-gray-400">{{ row.category }}</div>
      </div>
      <div v-html="row.content" class="text-base"></div>
    </div>
    <TablePagination
      :key="pageParams"
      v-model:current-page="pageParams"
      :total-list-data="totalItems"
      v-model:items-per-page="pageLimit"
    />
  </div>
</template>

<script setup lang="ts">
import { formattingDate } from "~/helpers/helper";

interface Data {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
  createdAt: string;
}
const route = useRoute();
const router = useRouter();
const rows = ref<Data[]>([]);
const pageParams = ref(
  route.query.page ? parseInt(route.query.page.toString()) : 1
);
const pageLimit = ref(10);
const totalItems = ref(0);
const runtimeConfig = useRuntimeConfig();

const fetchData = async () => {
  const params = {
    limit: pageLimit.value,
    offset: (Number(route.query.page) - 1) * (Number(route.query.limit) || 10),
    status: "publish",
  };
  const response = await useDollarFetch(
    `${runtimeConfig.public.BASE_URL}/api/article/lists`,
    { method: "GET", params: params }
  );
  rows.value = formattingDate(response.result);
  totalItems.value = response.total;
};

const updateQueryParams = async () => {
  await router.push({
    query: {
      ...route.query,
      page: pageParams.value,
    },
  });
};

onMounted(async () => {
  await fetchData();
});

watch([pageParams, pageLimit], async () => {
  await updateQueryParams();
  await fetchData();
});
</script>
