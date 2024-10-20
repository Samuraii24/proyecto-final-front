import styles from "./Info.module.scss";
import { Container } from "semantic-ui-react";

export function Info(props) {
  const { game } = props;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Container className={styles.info}>
      <div className={styles.summary}>
        <p>{game.summary}</p>
      </div>
      <div className={styles.more}>
        <ul>
          <li>
            <span>Fecha de lanzamiento:</span> {formatDate(game.releaseDate)}
          </li>
        </ul>
      </div>
    </Container>
  );
}
