import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { forEach, map } from "lodash";
import { Cart } from "@/api";
import { useAuth, useCart } from "@/hooks";
import { fn } from "@/utils";
import styles from "./Resume.module.scss";

const cartCtrl = new Cart();

export function Resume(props) {
  const { games, addressSelected } = props;
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { deleteAllItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    let totalTemp = 0;

    forEach(games, (game) => {
      const price = fn.calcDiscountedPrice(
        game.attributes.price,
        game.attributes.discount
      );
      totalTemp += price * game.quantity;
    });

    setTotal(totalTemp.toFixed(2));
  }, [games]);

  const onPay = async () => {
    setLoading(true);

    // Simulación de tiempo de carga (por ejemplo, 2 segundos)
    setTimeout(async () => {
      try {
        // Simula la acción de eliminar todos los ítems del carrito
        deleteAllItems();

        // Redirige al último paso (step 3)
        goToStepEnd();
      } catch (error) {
        console.error("Error al realizar el pedido:", error);
      } finally {
        setLoading(false); // Asegura que el estado de carga se desactive
      }
    }, 2000); // 2000 milisegundos = 2 segundos
  };

  const goToStepEnd = () => {
    router.replace({ query: { ...router.query, step: 3 } });
  };

  if (!total) return null;

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.products}>
          {map(games, (game) => (
            <div key={game.id} className={styles.product}>
              <div>
                <p>{game.attributes.title}</p>
                <span>{game.attributes.platform.data.attributes.title}</span>
              </div>
              <span>
                {game.quantity > 0 && `${game.quantity}x`}
                {fn.calcDiscountedPrice(
                  game.attributes.price,
                  game.attributes.discount
                )}
                €
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.blockTotal}>
        <div>
          <span>Total</span>
          <span>{total}€</span>
        </div>

        <Button
          primary
          fluid
          disabled={!addressSelected}
          onClick={onPay}
          loading={loading}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
}
