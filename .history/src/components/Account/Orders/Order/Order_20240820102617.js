import styles from "./Order.module.scss";
import { DateTime } from "luxon";
import { forEach } from "lodash";
import { useState } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { fn } from "@/utils";
import { BasicModal } from "@/components/Shared";

export function Order(props) {
  const { order } = props;
  const [showModal, setShowModal] = useState(false);
  const createdAt = new Date(order.attributes.createdAt).toISOString();
  const products = order.attributes.products;
  const address = order.attributes.addressShipping;
  const openCloseModal = () => setShowModal((prevState) => !prevState);

  const getTotalProducts = () => {
    let total = 0;

    forEach(products, (product) => {
      total += product.quantity;
    });

    return total;
  };

  return (
    <>
      <div className={styles.order} onClick={openCloseModal}>
        <div>
          <span>
            {DateTime.fromISO(createdAt, { locale: "es" }).toFormat(
              "dd/MM/yyyy"
            )}
          </span>
          <p>{getTotalProducts()} productos</p>
        </div>

        <p>{order.attributes.totalPayment.toFixed(2)}€</p>
      </div>
      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title="Información del pedido"
      >
        {map(products, (product) => (
          <div className={styles.product}>
            <Image src={product.attributes.cover.data.attributes.url} />
          </div>
        ))}
      </BasicModal>
    </>
  );
}
