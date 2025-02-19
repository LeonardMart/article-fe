<template>
  <div class="">
    <DeleteModal
      :isVisible="deleteModal"
      :data="{ id: deletedData?.id, name: deletedData?.title }"
      @update:isVisible="deleteModal = $event"
      @confirm="deleteData"
      title="Article"
    />
    <TabGroup as="div">
      <TabList class="">
        <div
          class="flex flex-col sm:flex-row items-center justify-center sm:justify-start sm:items-start w-full"
        >
          <Tab as="template" v-slot="{ selected }">
            <a
              href="javascript:;"
              class="w-full sm:w-fit text-center text-base font-semibold px-3 py-2 focus:outline-none"
              :class="{
                'border-t-2 border-x-2 border-blue-700 text-white font-bold focus:outline-none bg-blue-700':
                  selected,
                'border-t-2 border-slate-100 sm:border-slate-100 md:border-slate-100 lg:border-slate-100 bg-slate-100':
                  !selected,
              }"
              @click="updateConfiguration('publish')"
            >
              Published
            </a>
          </Tab>
          <div
            class="bg-gray-300 h-[1px] w-full lg:w-[1px] md:w-[1px] sm:w-[1px] lg:flex md:flex sm:flex lg:h-auto md:h-auto sm:h-auto lg:bg-gray-300 md:bg-gray-300 sm:bg-gray-300"
          ></div>
          <Tab as="template" v-slot="{ selected }">
            <a
              href="javascript:;"
              class="w-full sm:w-fit text-center text-base font-semibold px-3 py-2 focus:outline-none"
              :class="{
                'border-t-2 border-x-2 border-blue-700 text-white font-bold focus:outline-none bg-blue-700':
                  selected,
                'border-t-2 border-slate-100 sm:border-slate-100 md:border-slate-100 lg:border-slate-100 bg-slate-100':
                  !selected,
              }"
              @click="updateConfiguration('draft')"
            >
              Drafts
            </a>
          </Tab>
          <div
            class="bg-gray-300 h-[1px] w-full lg:w-[1px] md:w-[1px] sm:w-[1px] lg:flex md:flex sm:flex lg:h-auto md:h-auto sm:h-auto lg:bg-gray-300 md:bg-gray-300 sm:bg-gray-300"
          ></div>
          <Tab as="template" v-slot="{ selected }">
            <a
              href="javascript:;"
              class="w-full sm:w-fit text-center text-base font-semibold px-3 py-2 focus:outline-none"
              :class="{
                'border-t-2 border-x-2 border-blue-700 text-white font-bold focus:outline-none bg-blue-700':
                  selected,
                'border-t-2 border-slate-100 sm:border-slate-100 md:border-slate-100 lg:border-slate-100 bg-slate-100':
                  !selected,
              }"
              @click="updateConfiguration('trash')"
            >
              Trashed
            </a>
          </Tab>
        </div>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div
            class="bg-white datatable hidden lg:block md:block sm:block border-gray-500 shadow-lg"
          >
            <vue3-datatable
              :rows="rows"
              :columns="cols"
              :totalRows="totalItems"
              :page="route.query.page"
              :pageSize="pageLimit"
              :sortable="true"
              @change="changeServer"
              skin="whitespace-nowrap bh-table-hover no-scrollbar"
              :isServerMode="true"
              :showFirstPage="false"
              :showLastPage="false"
              :showNumbersCount="3"
              :stickyHeader="true"
              :stickyFirstColumn="false"
              :sortColumn="'created_at'"
              :sortDirection="'desc'"
              :pagination="false"
            >
              <template #action="data">
                <div class="flex items-center space-x-2">
                  <client-only>
                    <div>
                      <button @click="editHandler(data.value.id)" type="button">
                        <icon-pencil class="w-5 hover:text-blue-700" />
                      </button>
                    </div>
                    <div>
                      <button @click="deleteHandler(data)" type="button">
                        <icon-trash-lines class="w-5 h-5 hover:text-red-500" />
                      </button>
                    </div>
                  </client-only>
                </div>
              </template>
            </vue3-datatable>
          </div>
        </TabPanel>
        <TabPanel>
          <div
            class="bg-white datatable hidden lg:block md:block sm:block border-gray-500 shadow-lg"
          >
            <vue3-datatable
              :rows="rows"
              :columns="cols"
              :totalRows="totalItems"
              :page="route.query.page"
              :pageSize="pageLimit"
              :sortable="true"
              @change="changeServer"
              skin="whitespace-nowrap bh-table-hover no-scrollbar"
              :isServerMode="true"
              :showFirstPage="false"
              :showLastPage="false"
              :showNumbersCount="3"
              :stickyHeader="true"
              :stickyFirstColumn="false"
              :sortColumn="'created_at'"
              :sortDirection="'desc'"
              :pagination="false"
            >
              <template #action="data">
                <div class="flex items-center space-x-2">
                  <client-only>
                    <div>
                      <button @click="editHandler(data.value.id)" type="button">
                        <icon-pencil class="w-5 hover:text-blue-700" />
                      </button>
                    </div>
                    <div>
                      <button @click="deleteHandler(data)" type="button">
                        <icon-trash-lines class="w-5 h-5 hover:text-red-500" />
                      </button>
                    </div>
                  </client-only>
                </div>
              </template>
            </vue3-datatable>
          </div>
        </TabPanel>
        <TabPanel>
          <div
            class="bg-white datatable hidden lg:block md:block sm:block border-gray-500 shadow-lg"
          >
            <vue3-datatable
              :rows="rows"
              :columns="cols"
              :totalRows="totalItems"
              :page="route.query.page"
              :pageSize="pageLimit"
              :sortable="true"
              @change="changeServer"
              skin="whitespace-nowrap bh-table-hover no-scrollbar"
              :isServerMode="true"
              :showFirstPage="false"
              :showLastPage="false"
              :showNumbersCount="3"
              :stickyHeader="true"
              :stickyFirstColumn="false"
              :sortColumn="'created_at'"
              :sortDirection="'desc'"
              :pagination="false"
            >
            </vue3-datatable>
          </div>
        </TabPanel>
      </TabPanels>
      <div class="p-2">
        <TablePagination
          :key="pageParams"
          v-model:current-page="pageParams"
          :total-list-data="totalItems"
          v-model:items-per-page="pageLimit"
        />
      </div>
    </TabGroup>
  </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
//@ts-ignore
import Vue3Datatable from "@bhplugin/vue3-datatable";
import { getNumbering } from "~/helpers/helper";
import { toast } from "~/components/toast";

interface DeletedData {
  id: number;
  title: string;
}

const route = useRoute();

const pageParams = ref(
  route.query.page ? parseInt(route.query.page.toString()) : 1
);

const router = useRouter();
const rows = ref();
const pageLimit = ref(10);
const totalItems = ref(0);
const deleteModal = ref<boolean>(false);
const deletedData = ref<DeletedData>();
const runtimeConfig = useRuntimeConfig();

const updateConfiguration = async (value: string) => {
  if (value != route.query.tab) {
    await router.push({
      query: {
        ...route.query,
        page: 1,
        tab: String(value),
      },
    });
    rows.value = null;
    totalItems.value = 0;
    pageParams.value = 1;
  }
};

const deleteHandler = (data: any) => {
  deletedData.value = data.value;
  deleteModal.value = true;
};
const fetchData = async () => {
  try {
    const params = {
      limit: pageLimit.value,
      offset:
        (Number(route.query.page) - 1) * (Number(route.query.limit) || 10),
      status: route.query.tab,
    };
    const response = await useDollarFetch(
      `${runtimeConfig.public.BASE_URL}/api/article/lists`,
      { method: "GET", params: params }
    );
    rows.value = getNumbering(response.result);
    totalItems.value = response.total;
  } catch (err) {}
};

const deleteData = async (id: number) => {
  let data = await useDollarFetch(
    `${runtimeConfig.public.BASE_URL}/api/article/destroy`,
    {
      method: "POST",
      body: {
        id,
      },
    }
  );
  if (data.code == 200) {
    await fetchData();
    toast({
      msg: data.message[0],
      showCloseButton: true,
    });
  } else {
    toast({
      msg: data.message[0],
      showCloseButton: true,
      duration: 5000,
    });
  }
};

const cols = computed(() => {
  const baseCols = [
    { field: "rowNumber", title: "No.", sort: false },
    { field: "title", title: "Title", sort: false },
    { field: "category", title: "Category", sort: false },
  ];
  if (route.query.tab != "trash") {
    baseCols.push({ field: "action", title: "Action", sort: false });
  }
  return baseCols;
});

const changeServer = async (dataServer: any) => {
  await router.push({
    query: {
      ...route.query,
      order: dataServer.sort_column,
      sort: dataServer.sort_direction,
    },
  });
};

const editHandler = (id: number) => {
  router.push(`/edit/${id}`);
};

onMounted(async () => {
  await router.push("/?page=1&tab=publish");
  await fetchData();
});

watch([pageParams, pageLimit], async () => {
  await updateQueryParams();
  await fetchData();
});

watch(
  () => [route.query.tab, route.query.page],
  async () => {
    await fetchData();
  }
);

const updateQueryParams = async () => {
  await router.push({
    query: {
      ...route.query,
      page: pageParams.value,
    },
  });
};
</script>
