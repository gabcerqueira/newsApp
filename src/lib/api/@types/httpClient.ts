export type HttpMethod = "post" | "get" | "put" | "delete";

export type HttpRequest = {
  url?: string;
  method: HttpMethod;
  body?: Object;
  headers?: any;
  servico?: ServicoCode;
};

export enum ServicoCode {
  ALVARA = 1,
  ARMAZEM = 2,
}

export enum HttpStatusCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const HTTP_ERROS: Record<number, string> = {
  302: "HttpErros.302",
  400: "HttpErros.400", //400 Bad Request
  401: "HttpErros.401", //401 Unauthorized
  403: "HttpErros.403", //403 Forbidden
  404: "HttpErros.404", //404 Not Found
  405: "HttpErros.405", //405 Method Not Allowed
  406: "HttpErros.406", //406 Not Acceptable
  408: "HttpErros.408", //408 Request Timeout
  409: "HttpErros.409", //409 Conflict
  500: "HttpErros.500", //500 Internal Server Error
  502: "HttpErros.502", //502 Bad Gateway
  503: "HttpErros.503", //503 Service Unavailable
  504: "HttpErros.504", //504 Gateway Timeout
};

export type WsRestApiRequest<T = any> = {
  obj?: T;
};

export type WsRestApiError = {
  status?: HttpStatusCode;
  message?: string;
  errors?: Array<string>;
};

export type WsRestApiVersao = {
  servico: string;
  metodo: HttpMethod;
};

export type BodyWrapper<T = any> = {
  versaoRest: WsRestApiVersao;
  errorRest: WsRestApiError;
  listaObj?: T[];
};

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};
