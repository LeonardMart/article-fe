// import { UseFetchOptions } from "#app";

export const useDefaultFetch = (url:string, options: any, event:any) => {
  return $fetch(url, {
    baseURL: useRuntimeConfig().BASE_API,
    ...options,
  });
};
