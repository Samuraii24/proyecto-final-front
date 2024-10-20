import styles from "./Order.module.scss";
import { DateTime } from "luxon";
import { forEach, map } from "lodash";
import { useState } from "react";
import { Image } from "semantic-ui-react";
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

  const getImageUrl = (product) => {
    // Asegura que no haya doble barra en la URL
    const baseUrl = product.attributes.cover.data.attributes.url;
    return baseUrl.startsWith("/") ? baseUrl.slice(1) : baseUrl;
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
        {map(products, (product, index) => (
          <div key={index} className={styles.product}>
            <Image src={getImageUrl(product)} />
          </div>
        ))}
      </BasicModal>
    </>
  );
}
