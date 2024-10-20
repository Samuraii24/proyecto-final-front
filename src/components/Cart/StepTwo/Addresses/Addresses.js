import styles from "./Addresses.module.scss";
import { Address } from "@/api";
import { useAuth } from "@/hooks";
import { useState, useEffect } from "react";
import { add, map } from "lodash";
import classNames from "classnames";

const addressCtrl = new Address();

export function Addresses(props) {
  const { addressSelected, setAddressSelected } = props;
  const [address, setAddress] = useState(null);
  const { user } = useAuth();
  console.log(addressSelected);

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll(user.id);
        setAddress(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.addresses}>
      <h2>Dirección de envio</h2>

      {map(address, (address) => (
        <div
          key={address.id}
          className={classNames(styles.address, {
            [styles.active]: address.id === addressSelected?.id,
          })}
          onClick={() => setAddressSelected(address)}
        >
          <p>
            {address.attributes.name}({address.attributes.title})
          </p>
          <p>
            {address.attributes.address},{address.attributes.city},
            {address.attributes.state}, {address.attributes.postal_code}
          </p>
        </div>
      ))}
    </div>
  );
}
