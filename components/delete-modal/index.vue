<template>
  <div>
    <!-- Modal -->
    <client-only>
      <TransitionRoot appear :show="isVisible" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-[51] bg-white">
          <!-- Background Overlay -->
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-[black]/60" />
          </TransitionChild>

          <!-- Modal Content -->
          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center px-4 py-8">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark"
                >
                  <div class="p-5 flex flex-col w-full space-y-8 bg-white">
                    <!-- Modal Header -->
                    <div class="flex justify-end">
                      <button
                        type="button"
                        class="text-gray-400"
                        @click="closeModal"
                      >
                        <icon-x class="w-6 text-black" />
                      </button>
                    </div>

                    <div class="text-red-700 items-center justify-center flex">
                      <img
                        src="../../assets/images/trash-elipse.svg"
                        class="w-20 h-20"
                      />
                    </div>
                    <!-- Buttons -->
                    <div class="flex flex-col justify-center items-center">
                      <div class="font-bold text-xl">Delete {{ props.title }}</div>
                      <div
                        class="font-normal text-base text-center text-gray-700"
                      >
                        Are you sure you want to delete
                        <span class="font-semibold text-gray-700">{{
                          props.data.name
                        }}</span>
                        ?
                      </div>
                    </div>
                    <div class="flex justify-end space-x-2">
                      <button
                        type="button"
                        @click="closeModal"
                        class="bg-gray-300 py-2 w-full rounded-full font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        @click="confirmAction"
                        class="bg-red-700 py-2 w-full rounded-full text-white"
                      >
                        Yes, please
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogOverlay,
} from "@headlessui/vue";

interface Body {
  id: string;
}

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["refreshData", "update:isVisible", "confirm"]);

const body = ref<Body>({
  id: "",
});

watch(
  () => props.data,
  (data) => {
    body.value.id = data.id;
  }
);

const confirmAction = () => {
  emit("confirm", body.value.id); // Emit confirm event with data
  closeModal();
};

const closeModal = () => {
  emit("update:isVisible", false);
};
</script>
