<template>
  <div
    class="main-section relative font-poppins text-sm font-normal antialiased"

  >
    <div class="relative">
      <div
        v-show="store.isShowMainLoader"
        class="screen_loader animate__animated fixed inset-0 z-[60] grid place-content-center bg-[#fafafa] bg-opacity-50 text-red-600"
      >
        <svg
          width="64"
          height="64"
          xmlns="http://www.w3.org/2000/svg"
          class="animate-spin"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
            opacity="0.9764705882352941"
            d="M 250.5 43 L 273.5 43 L 274.5 44 L 290.5 45 L 309.5 49 L 336.5 58 Q 383.5 78 415 113.5 Q 441.8 142.7 457 183.5 L 463 202.5 L 468 228.5 L 468 237.5 L 469 238.5 L 469 273.5 L 468 274.5 L 468 282.5 L 463 309.5 L 450 345.5 Q 430.5 386.5 398.5 415 Q 369.3 441.8 328.5 457 L 305.5 464 L 283.5 468 L 274.5 468 L 273.5 469 L 238.5 469 L 237.5 468 L 221.5 467 L 202.5 463 L 166.5 450 Q 125.5 430.5 97 398.5 Q 70.2 369.3 55 328.5 L 49 309.5 L 44 283.5 L 44 274.5 L 43 273.5 L 43 237.5 L 44 236.5 L 44 228.5 L 48 206.5 L 56 180.5 L 69 152.5 L 75 142.5 L 80.5 137 Q 86 132 98.5 134 L 109 140.5 L 114 150.5 L 114 159.5 L 98 190.5 L 90 214.5 L 86 236.5 L 85 261.5 L 86 262.5 L 86 275.5 L 87 276.5 L 88 288.5 L 98 321.5 Q 112.9 356.1 138.5 380 Q 162.2 402.8 195.5 416 L 223.5 424 L 235.5 425 L 236.5 426 L 261.5 427 L 262.5 426 L 275.5 426 L 276.5 425 L 288.5 424 L 321.5 414 Q 356.8 398.8 381 372.5 Q 403.1 349.1 416 316.5 L 424 288.5 L 425 276.5 L 426 275.5 L 427 250.5 L 426 249.5 L 426 236.5 L 425 235.5 L 424 223.5 L 414 190.5 Q 398.5 154.5 371.5 130 Q 348.4 108.6 316.5 96 L 288.5 88 L 276.5 87 L 275.5 86 L 250.5 85 L 240 78.5 Q 233 73 235 58.5 L 241.5 48 L 250.5 43 Z"
          />
        </svg>
      </div>
      <div
        class="main-container min-h-screen text-black dark:text-white-dark"
        :class="[store.navbar]"
      >
        <layout-header />

        <div class="flex flex-col min-h-screen">
          <div
            class="animation px-6 py-8 bg-slate-200 min-h-screen overflow-hidden"
          >
            <NuxtPage />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import appSetting from "@/app-setting";
import { useAppStore } from "@/stores/index";
const store = useAppStore();
const showTopButton = ref(false);
const { setLocale } = useI18n();
onMounted(() => {
  // set default settings
  appSetting.init(setLocale);

  window.onscroll = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      showTopButton.value = true;
    } else {
      showTopButton.value = false;
    }
  };

  const eleanimation: any = document.querySelector(".animation");
  eleanimation.addEventListener("animationend", function () {
    appSetting.changeAnimation("remove");
  });
  store.toggleMainLoader();
});

const goToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
</script>
