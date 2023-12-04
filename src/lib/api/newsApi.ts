import { Api } from "./api";

export class NewsApi extends Api {
  token: string;

  constructor(token: string) {
    super();
    this.token = token;
    this.defaultHeader = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      // 'X-Requested-With': 'XMLHttpRequest',
    };
  }
}
