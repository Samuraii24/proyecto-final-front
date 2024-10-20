import styles from "./HeaderWallpaper.module.scss";
import { Image } from "semantic-ui-react";

const SERVER_HOST = "https://proyecto-final-back-c64o.onrender.com";

export function HeaderWallpaper(props) {
  const { image } = props;

  // Condicional para evitar doble barra en la URL
  const imageUrl = image.startsWith("/")
    ? `${SERVER_HOST}${image}`
    : `${SERVER_HOST}/${image}`;

  return (
    <div className={styles.headerWallpaper}>
      <Image src={imageUrl} />
    </div>
  );
}
