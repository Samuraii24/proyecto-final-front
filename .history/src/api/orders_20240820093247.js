import { ENV, authFetch } from "@/utils";

export class Order {
  async getAll(userId) {
    try {
      const filters = `filters[user][id][$eq]=${userId}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${filters}`;

      const response = await authFetch();
      const result = await response.json();
    } catch (error) {
      throw error;
    }
  }
}
