import { authFetch, ENV } from "@/utils";
import { forEach } from "lodash";

const SERVER_HOST = "http://localhost:1337";

// Función utilitaria para construir la URL completa
const buildApiUrl = (path) => {
  return path.startsWith("/") ? `${SERVER_HOST}${path}` : path;
};

export class Cart {
  add(gameId) {
    const games = this.getAll();
    const objIndex = games.findIndex((game) => game.id === gameId);

    if (objIndex < 0) {
      games.push({
        id: gameId,
        quantity: 1,
      });
    } else {
      const game = games[objIndex];
      games[objIndex].quantity = game.quantity + 1;
    }

    localStorage.setItem(ENV.CART, JSON.stringify(games));
  }

  getAll() {
    const response = localStorage.getItem(ENV.CART);

    if (!response) {
      return [];
    } else {
      return JSON.parse(response);
    }
  }

  count() {
    const response = this.getAll();
    let count = 0;

    forEach(response, (item) => {
      count += item.quantity;
    });

    return count;
  }

  changeQuantity(gameId, quantity) {
    const games = this.getAll();
    const objIndex = games.findIndex((game) => game.id === gameId);

    games[objIndex].quantity = quantity;

    localStorage.setItem(ENV.CART, JSON.stringify(games));
  }

  delete(gameId) {
    const games = this.getAll();

    const updateGames = games.filter((game) => game.id !== gameId);

    localStorage.setItem(ENV.CART, JSON.stringify(updateGames));
  }

  async paymentCart(token, products, idUser, address) {
    try {
      const addressShipping = address;

      const url = buildApiUrl(ENV.ENDPOINTS.PAYMENT_ORDER);

      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          products,
          idUser,
          addressShipping,
        }),
      };

      console.log({ token, products, idUser, addressShipping });
      const response = await authFetch(url, params);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json(); // Asumiendo que quieres procesar la respuesta como JSON
    } catch (error) {
      console.error("Payment error:", error);
      throw error;
    }
  }
}
