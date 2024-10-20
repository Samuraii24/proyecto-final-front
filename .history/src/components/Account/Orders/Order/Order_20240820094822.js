import styles from "./Order.module.scss";
import { DateTime } from "luxon";

export function Order(props) {
  const { order } = props;
  return (
    <>
      <div className={styles.order}>
        <div>
          <span>{order.attributes.createdAt}</span>
          <p>{order.attributes.totalPayment.toFixed(2)}€</p>
        </div>
      </div>
    </>
  );
}
