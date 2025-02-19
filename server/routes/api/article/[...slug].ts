import { createRouter, defineEventHandler, useBase } from "h3";
import { useDefaultFetch } from "~/composables/useDefaultFetch";

const router = createRouter();

router
  .get(
    "/lists",
    defineEventHandler(async (event) => {
      let query = getQuery(event);
      try {
        let data = await useDefaultFetch(
          "/article/lists",
          { method: "GET", query },
          event
        );
        return data;
      } catch (err) {
        console.log(err);
      }
    })
  )
  .get(
    "/info",
    defineEventHandler(async (event) => {
      let query = getQuery(event);
      try {
        let data = await useDefaultFetch(
          "/article/info",
          { method: "GET", query },
          event
        );
        return data;
      } catch (err) {
        console.log(err);
      }
    })
  )
  .post(
    "/update",
    defineEventHandler(async (event) => {
      try {
        const body = await readBody(event);
        let data = await useDefaultFetch(
          "/article/update",
          { method: "POST", body },
          event
        );
        return data;
      } catch (err) {
        return err;
      }
    })
  )
  .post(
    "/store",
    defineEventHandler(async (event) => {
      try {
        const body = await readBody(event);
        let data = await useDefaultFetch(
          "/article/store",
          { method: "POST", body },
          event
        );
        return data;
      } catch (err) {
        return err;
      }
    })
  )
  .post(
    "/destroy",
    defineEventHandler(async (event) => {
      try {
        const body = await readBody(event);
        let data = await useDefaultFetch(
          "/article/destroy",
          { method: "POST", body },
          event
        );
        return data;
      } catch (err) {
        return err;
      }
    })
  );

export default useBase("/api/article", router.handler);
