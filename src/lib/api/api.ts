import axios, { AxiosResponse } from "axios";
import { serverConfig } from "./config";
import { HttpRequest, HttpResponse } from "./@types/httpClient";

export class Api {
  BASE_URL: string;
  data: any;
  defaultHeader: object;

  constructor() {
    this.BASE_URL = serverConfig.proxy + serverConfig.path.api;

    this.defaultHeader = serverConfig.server.defaultHeader;
  }

  async Fetch(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    console.log("DATA : ", data);

    console.log(
      "Calling service : " +
        this.BASE_URL +
        data.url +
        " with method " +
        data.method
    );

    try {
      axiosResponse = await axios.request({
        url: this.BASE_URL + data.url,
        method: data.method,
        data: data.body,
        headers: data.headers ? data.headers : this.defaultHeader,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
