import styles from "./GridGames.module.scss";
import Link from "next/link";
import { map } from "lodash";
import { fn } from "@/utils";
import { Label } from "@/components/Shared";

const BASE_URL = "https://proyecto-final-back-c64o.onrender.com";

export function GridGames(props) {
  const { games } = props;

  return (
    <div className={styles.gridGames}>
      {map(games, (game) => (
        <Link
          key={game.id}
          href={`/${game.attributes.slug}`}
          className={styles.game}
        >
          <div>
            <img
              src={`${BASE_URL}${game.attributes.cover.data.attributes.url}`}
            />
            {game.attributes.discount > 0 && (
              <Label.Discount className={styles.discount}>
                {`-${game.attributes.discount}%`}
              </Label.Discount>
            )}
          </div>
          <div>
            <span>{game.attributes.title}</span>
            <span className={styles.price}>
              {fn.calcDiscountedPrice(
                game.attributes.price,
                game.attributes.discount
              )}
              €
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
