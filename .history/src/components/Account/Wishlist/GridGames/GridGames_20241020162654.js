import styles from "./GridGames.module.scss";
import Link from "next/link";
import { map } from "lodash";
import { Label, WishlistIcon } from "@/components/Shared";
import { fn } from "@/utils";

const SERVER_HOST = "https://proyecto-final-back-c64o.onrender.com";

const buildImageUrl = (url) => {
  return url.startsWith("/") ? `${SERVER_HOST}${url}` : url;
};

export function GridGames(props) {
  const { wishlist, onReload } = props;

  return (
    <div className={styles.gridGames}>
      {map(wishlist, (item) => {
        const game = item.attributes.game.data;
        const coverImageUrl = buildImageUrl(
          game.attributes.cover.data.attributes.url
        );

        return (
          <div key={item.id} className={styles.game}>
            <Link href={`/${game.attributes.slug}`}>
              <div>
                <img src={coverImageUrl} alt={game.attributes.title} />
                {game.attributes.discount > 0 && (
                  <Label.Discount className={styles.discount}>
                    {`-${game.attributes.discount}%`}
                  </Label.Discount>
                )}
              </div>
              <div>
                <span>{game.attributes.title}</span>
              </div>
            </Link>

            <WishlistIcon
              gameId={game.id}
              className={styles.wishlistIcon}
              removeCallback={onReload}
            />
          </div>
        );
      })}
    </div>
  );
}
