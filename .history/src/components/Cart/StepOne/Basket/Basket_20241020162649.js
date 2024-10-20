import styles from "./Basket.module.scss";
import { Icon, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { fn } from "@/utils";
import { useCart } from "@/hooks";

const SERVER_HOST = "https://proyecto-final-back-c64o.onrender.com";

const buildImageUrl = (url) => {
  return url.startsWith("/") ? `${SERVER_HOST}${url}` : url;
};

export function Basket(props) {
  const { games } = props;
  const { changeQuantityItem, deleteItem } = useCart();

  const options = Array.from({ length: 25 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  return (
    <div className={styles.basket}>
      <h2>Cesta</h2>
      <div className={styles.block}>
        {map(games, (game) => {
          const coverImageUrl = buildImageUrl(
            game.attributes.cover.data.attributes.url
          );

          return (
            <div key={game.id} className={styles.product}>
              <Image src={coverImageUrl} alt={game.attributes.title} />
              <div>
                <div className={styles.info}>
                  <div>
                    <p>{game.attributes.title}</p>
                    <p>{game.attributes.platform.data.attributes.title}</p>
                  </div>
                  <Icon
                    name="trash alternate online"
                    link
                    onClick={() => deleteItem(game.id)}
                  />
                </div>
                <div className={styles.quantity}>
                  <Dropdown
                    className="number"
                    options={options}
                    selection
                    value={game.quantity}
                    compact
                    onChange={(_, data) =>
                      changeQuantityItem(game.id, data.value)
                    }
                  />
                  <span>
                    {fn.calcDiscountedPrice(
                      game.attributes.price,
                      game.attributes.discount
                    )}
                    €
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
