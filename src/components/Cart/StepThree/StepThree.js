import styles from "./StepThree.module.scss";
import { Button, Icon } from "semantic-ui-react";
import Link from "next/link";
import { Separator } from "@/components/Shared";

export function StepThree() {
  return (
    <div className={styles.stepThree}>
      <Separator height={50} />
      <Icon name="check circle outline" />
      <h2>Compra realizada con éxito. ¡A disfrutar!</h2>

      <Button as={Link} href="/account" primary>
        Ver compra
      </Button>
    </div>
  );
}
