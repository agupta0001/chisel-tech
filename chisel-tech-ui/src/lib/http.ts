import axios, { AxiosInstance } from "axios";

class Http {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
  }

  private _parseError(error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error(error.toString());
    }
  }

  async get(
    url: string,
    queryParams: { params?: {} } = {},
    options: { signal?: AbortSignal } = {}
  ): Promise<any> {
    try {
      const response = await this.axios.get(url, {
        ...queryParams,
        ...options,
      });
      return response.data;
    } catch (error: any) {
      this._parseError(error);
    }
  }

  async post(url: string, data: {} = {}): Promise<any> {
    try {
      return await this.axios.post(url, {
        ...data,
      });
    } catch (error: any) {
      this._parseError(error);
    }
  }

  async patch(url: string, data: {} = {}): Promise<any> {
    try {
      return await this.axios.patch(url, {
        ...data,
      });
    } catch (error: any) {
      this._parseError(error);
    }
  }

  async delete(url: string): Promise<any> {
    try {
      return await this.axios.delete(url);
    } catch (error: any) {
      this._parseError(error);
    }
  }
}

export default new Http();
