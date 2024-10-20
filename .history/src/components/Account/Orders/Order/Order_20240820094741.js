import styles from "./Order.module.scss";

export function Order(props) {
  const { order } = props;
  return (
    <>
      <div className={styles.order}>
        <div>
          <span>fecha compra</span>
          <p>{order.attributes.totalPayment.toFixed(2)}€</p>
        </div>
      </div>
    </>
  );
}
