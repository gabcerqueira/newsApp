import { WsRestApiVersao } from "./httpClient";

export type SetUseCases = {
  [key: string]: UseCase;
};

export type UseCase = {
  [key: string]: WsRestApiVersao;
};

export type ServerConfigType = {
  server: {
    app: string;
    defaultHeader: object;
  };
  desenv: {
    host: string;
    url: string;
  };
  production: {
    host: string;
    url: string;
  };
  path: {
    api: string;
    // acompanhamento: string;
  };
  pathUseCases: SetUseCases;
  proxy: string;
};
