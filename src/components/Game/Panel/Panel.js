import styles from "./Panel.module.scss";
import { Button, Container, Icon, Image } from "semantic-ui-react";
import { fn } from "@/utils";
import { WishlistIcon } from "@/components/Shared/WishListIcon/WishlistIcon";
import { useCart } from "@/hooks";
import { useState } from "react";

const SERVER_HOST = "http://localhost:1337";

export function Panel(props) {
  const { gameId, game } = props;
  const [loading, setLoading] = useState(false);
  const { addCart } = useCart();

  const platform = game.platform.data;
  const imageUrl = game.cover.data.attributes.url.startsWith("/")
    ? `${SERVER_HOST}${game.cover.data.attributes.url}`
    : `${game.cover.data.attributes.url}`;

  const platformIconUrl =
    platform.attributes.icon.data.attributes.url.startsWith("/")
      ? `${SERVER_HOST}${platform.attributes.icon.data.attributes.url}`
      : platform.attributes.icon.data.attributes.url;

  const buyPrice = fn.calcDiscountedPrice(game.price, game.discount);

  const addCartWrapper = () => {
    setLoading(true);
    addCart(gameId);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Container className={styles.panel}>
      <div className={styles.imgContainer}>
        <Image src={imageUrl} />
      </div>

      <div className={styles.actionsContainer}>
        <div>
          <h2>{game.title}</h2>
          <div className={styles.moreInfo}>
            <span>
              <Image src={platformIconUrl} />
              {platform.attributes.title}
            </span>
            <span>
              <Icon name="check" />
              Disponible
            </span>
          </div>
          <div className={styles.price}>
            {game.discount > 0 && (
              <>
                <span className={styles.originalPrice}>
                  <Icon name="tag" />
                  {game.price}€
                </span>
                <span className={styles.discount}>{game.discount}%</span>
              </>
            )}

            <span className={styles.price}>{buyPrice}€</span>
          </div>
          <Button primary fluid onClick={addCartWrapper} loading={loading}>
            Comprar
          </Button>
          <WishlistIcon gameId={gameId} className={styles.heart} />
        </div>
      </div>
    </Container>
  );
}
