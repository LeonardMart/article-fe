<template>
  <div
    class="bg-slate-100 p-4 flex flex-row w-full justify-between border-b-[1px] border-gray-300"
  >
    <DeleteModal
      :isVisible="deleteModal"
      :data="{ id: inputData?.id, name: inputData?.title }"
      @update:isVisible="deleteModal = $event"
      @confirm="deleteData"
      title="Article"
    />
    <div class="text-3xl font-bold">Edit Article</div>
    <button @click="deleteHandler" type="button">
      <icon-trash-lines class="w-7 h-auto text-red-500" />
    </button>
  </div>
  <div class="bg-slate-100 p-4 space-y-4">
    <div class="w-full flex flex-col justify-start">
      <div class="flex flex-row space-x-1 items-start justify-start align-top">
        <label class="font-bold text-sm">Title</label>
        <label class="font-extrabold text-red-600 text-sm">*</label>
      </div>
      <input
        type="text"
        id="title"
        v-model="inputData.title"
        placeholder="Input title"
        class="w-full px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none bg-slate-50"
      />
    </div>

    <div class="w-full flex flex-col justify-start">
      <div class="flex flex-row space-x-1 items-start justify-start align-top">
        <label class="font-bold text-sm">Category</label>
        <label class="font-extrabold text-red-600 text-sm">*</label>
      </div>
      <input
        type="category"
        id="title"
        v-model="inputData.category"
        placeholder="Input category"
        class="w-full px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none bg-slate-50"
      />
    </div>

    <div>
      <div class="flex flex-row space-x-1 items-start justify-start align-top">
        <label class="font-bold text-sm">Content</label>
        <label class="font-extrabold text-red-600 text-sm">*</label>
      </div>
      <quillEditor
        :options="options1"
        v-model="inputData.content"
        :value="inputData.content ?? ''"
        style="min-height: 200px"
        @change="handleInput"
        name="projectDesc"
      ></quillEditor>
    </div>

    <div class="flex flex-row space-x-1.5">
      <button
        @click="inputData.status = 'publish'"
        :class="[
          inputData.status == 'publish'
            ? 'bg-blue-700 text-white'
            : 'bg-white text-gray-800',
          'py-2 px-4 rounded-full text-sm font-semibold border-[1px] border-gray-200',
        ]"
      >
        Publish
      </button>
      <button
        @click="inputData.status = 'draft'"
        :class="[
          inputData.status == 'draft'
            ? 'bg-blue-700 text-white'
            : 'bg-white text-gray-800',
          'py-2 px-4 rounded-full text-sm font-semibold border-[1px] border-gray-200',
        ]"
      >
        Draft
      </button>
    </div>

    <div class="w-full py-4 mt-5 justify-end flex flex-row space-x-1.5">
      <button
        @click="updateData"
        class="border border-gray-200 bg-blue-700 rounded-full px-8 py-2 font-semibold text-sm text-white shadow-md"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "~/components/toast";
import quillEditor from "../../components/quill/index.vue";
//@ts-ignore
import { debounce } from "lodash";

interface InputData {
  id: number | null;
  title: string | null;
  content: string | null;
  category: string | null;
  status: string | null;
}

const route = useRoute();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const inputData = ref<InputData>({
  id: null,
  title: null,
  content: null,
  category: null,
  status: null,
});
const deleteModal = ref<boolean>(false);
const content = ref();
const options1 = ref({
  modules: {
    toolbar: [["bold", "italic", "underline", "link"]],
  },
  placeholder: "Enter content",
});

const handleInput = debounce((data: any) => {
  inputData.value.content = String(data.html);
  content.value = String(data.html);
}, 100);

const deleteHandler = () => {
  deleteModal.value = true;
};

const fetchData = async () => {
  const params = {
    id: route.params.id,
  };
  const res = await useDollarFetch(
    `${runtimeConfig.public.BASE_URL}/api/article/info`,
    { method: "GET", params }
  );
  if (res.code == 200) {
    inputData.value = res.result;
  } else {
    toast({ msg: res.message, duration: 5000, showCloseButton: true });
  }
};

const updateData = async () => {
  const res = await useDollarFetch(
    `${runtimeConfig.public.BASE_URL}/api/article/update`,
    { method: "POST", body: inputData.value }
  );
  if (res.code == 200) {
    router.back();
    toast({ msg: res.message, duration: 3000, showCloseButton: true });
  } else {
    toast({ msg: res.message, duration: 5000, showCloseButton: true });
  }
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
    router.back();
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

onMounted(async () => {
  await fetchData();
});

const observer = new MutationObserver(() => {
  const tooltip: any = document.querySelector(".ql-tooltip");
  if (tooltip) {
    const leftValue = parseFloat(tooltip.style.left) || 0;
    const tooltipWidth = tooltip.offsetWidth;
    const viewportWidth = window.innerWidth;

    if (leftValue < 0) {
      tooltip.style.left = "0px";
    } else if (leftValue + tooltipWidth > viewportWidth) {
      tooltip.style.left = `300px`;
    }
  }
});

observer.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true,
});
</script>

<style>
.ql-container.ql-snow {
  border: 1px solid #e5e7eb;
  background-color: #f8fafc;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  position: relative;
}
.ql-toolbar.ql-snow {
  background-color: #f8fafc;
  border-bottom: 1px solid #ccc;
  border: 1px solid #e5e7eb;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
.ql-tooltip {
  left: min(0px, var(--calculated-left));
}
.ql-snow .ql-tooltip {
  /* transform: translateX(0px); */
  width: fit-content;
  left: 0px;
}
</style>
