import styles from "./Payment.module.scss";
import { CardElement } from "@stripe/react-stripe-js";

export function Payment() {
  const cardStyle = {
    style: {
      base: {
        color: "#fff",
        fontSize: "16px",
      },
    },
  };

  return (
    <div className={styles.payment}>
      <h2>Métodos de pago</h2>

      <div className={styles.block}>
        <CardElement options={cardStyle} />
      </div>
    </div>
  );
}
