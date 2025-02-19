export const useDollarFetch = <T>(url: string, options?: FetchOptions) => {
  return $fetch<T>(url, {
    ...options,
    server: false,
    async onResponse({ request, response, options }) {
      const data = response._data;

      // if (data.code === 502) {
      //   window.location.href = useRuntimeConfig().public.BASE_URL + "/";
      // }
    },

    async onResponseError({ request, response, options }) {
      console.log("[fetch response error]");
    },
    async onRequest({ request, options }) {},
  });
};
