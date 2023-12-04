import { ServerConfigType } from "./@types/configTypes";

export const serverConfig: ServerConfigType = {
  server: {
    app: "News app",
    defaultHeader: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
    },
  },
  path: {
    api: "/api",
  },

  pathUseCases: {
    auth: {
      checkUserSession: {
        servico: "/checkUserSession",

        metodo: "get",
      },

      login: {
        servico: "/auth/login",
        metodo: "post",
      },
    },
    user: {
      create: {
        metodo: "post",
        servico: "/user",
      },
      selectCategories: {
        metodo: "post",
        servico: "/user/selectCategories",
      },
      addReadingTime: {
        metodo: "post",
        servico: "/user/addReadingTime",
      },
    },
    news: {
      getCategories: {
        servico: "/category",
        metodo: "get",
      },
      getNewsWithCategories: {
        servico: "/news/findNewsWithCategories",
        metodo: "get",
      },
      getNewsPaginated: {
        servico: "/news/find",
        metodo: "get",
      },
      getNewsByCategories: {
        servico: "/news/findNewsByCategories",
        metodo: "get",
      },
    },
  },
  proxy: "https://cf0e-2804-d45-b977-6900-b49e-ab3f-5468-1352.ngrok-free.app",
  desenv: {
    host: "",
    url: "localhost:3000",
  },
  production: {
    host: "",
    url: "",
  },
};
