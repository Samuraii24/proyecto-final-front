import styles from "./FullModalScreen.module.scss";
import { Modal, Icon } from "semantic-ui-react";

export function FullModalScreen(props) {
  const { children, show, onClose } = props;
  return (
    <Modal
      open={show}
      className={styles.fullModal}
      onClose={onClose}
      closeIcon={false}
    >
      <Modal.Content>{children}</Modal.Content>
      <Icon name="close" className={styles.close} onClick={onClose} />
    </Modal>
  );
}
