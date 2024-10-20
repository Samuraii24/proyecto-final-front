import styles from "./Order.module.scss";
import { DateTime } from "luxon";
import { forEach } from "lodash";

export function Order(props) {
  const { order } = props;
  const createdAt = new Date(order.attributes.createdAt).toISOString();

  const getTotalProducts = () => {
    let total = 0;
  };

  return (
    <>
      <div className={styles.order}>
        <div>
          <span>
            {DateTime.fromISO(createdAt, { locale: "es" }).toFormat(
              "dd/mm/yyyy"
            )}
          </span>
          <p>5 items comprados</p>
        </div>

        <p>{order.attributes.totalPayment.toFixed(2)}€</p>
      </div>
    </>
  );
}
