import { ENV, authFetch } from "@/utils";

export class Order {
  async getAll(userId) {
    try {
      const filters = `filters[user][id][$eq]=${userId}`;
      const ordenation = "sort[0]=createdAt:desc";
      const urlParams = `${filters}&${ordenation}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${urlParams}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
