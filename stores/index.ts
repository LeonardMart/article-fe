import { defineStore } from "pinia";
import appSetting from "@/app-setting";
export const useAppStore = defineStore("app", {
  state: () => ({
    mainLayout: "app",
    menu: "vertical",
    layout: "full",
    rtlClass: "ltr",
    animation: "",
    navbar: "navbar-sticky",
    locale: "en",
    sidebar: false,
    isShowMainLoader: true,
    semidark: false,
    isShowLoader: false,
    asyncLoader: {
      open: false,
      title: "Processing, please wait...",
    },
  }),

  actions: {
    setMainLayout(payload: any = null) {
      this.mainLayout = payload; //app , auth
    },
    toggleMenu(payload: any = null) {
      payload = payload || this.menu; // vertical, collapsible-vertical, horizontal
      this.sidebar = false; // reset sidebar state
      localStorage.setItem("menu", payload);
      this.menu = payload;
    },
    toggleLayout(payload: any = null) {
      payload = payload || this.layout; // full, boxed-layout
      localStorage.setItem("layout", payload);
      this.layout = payload;
    },
    toggleRTL(payload: any = null) {
      payload = payload || this.rtlClass; // rtl, ltr
      localStorage.setItem("rtlClass", payload);
      this.rtlClass = payload;
      document
        .querySelector("html")
        ?.setAttribute("dir", this.rtlClass || "ltr");
    },
    toggleAnimation(payload: any = null) {
      payload = payload || this.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
      payload = payload?.trim();
      localStorage.setItem("animation", payload);
      this.animation = payload;
      appSetting.changeAnimation();
    },
    toggleNavbar(payload: any = null) {
      payload = payload || this.navbar; // navbar-sticky, navbar-floating, navbar-static
      localStorage.setItem("navbar", payload);
      this.navbar = payload;
    },
    toggleSemidark(payload: any = null) {
      payload = payload || false;
      localStorage.setItem("semidark", payload);
      this.semidark = payload;
    },
    toggleLocale(payload: any = null, setLocale: any) {
      payload = payload || this.locale;
      localStorage.setItem("i18n_locale", payload);
      this.locale = payload;
      setLocale(payload);
      if (this.locale?.toLowerCase() === "ae") {
        this.toggleRTL("rtl");
      } else {
        this.toggleRTL("ltr");
      }
    },
    toggleSidebar(state: boolean = false) {
      this.sidebar = !this.sidebar;
    },
    toggleMainLoader(state: boolean = false) {
      this.isShowMainLoader = true;
      setTimeout(() => {
        this.isShowMainLoader = false;
      }, 500);
    },
    setLoader(state: boolean = true) {
      this.isShowLoader = state;
    },
    setAsyncLoader(
      state: boolean = true,
      title = "Processing, please wait..."
    ) {
      this.asyncLoader = {
        open: state,
        title,
      };
    },
  },
  getters: {},
});
