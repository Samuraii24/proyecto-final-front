import styles from "./Order.module.scss";
import { DateTime } from "luxon";

export function Order(props) {
  const { order } = props;
  const createdAt = new Date(order.attributes.createdAt).toISOString();

  return (
    <>
      <div className={styles.order}>
        <div>
          <span>{DateTime.fromISO(createdAt)}</span>
          <p>{order.attributes.totalPayment.toFixed(2)}€</p>
        </div>
      </div>
    </>
  );
}
