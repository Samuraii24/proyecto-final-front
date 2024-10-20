import { Confirm as ConfirmSU } from "semantic-ui-react";

export function Confirm(props) {
  const { ...rest } = props; //...rest son los props no controlados

  return <ConfirmSU className="confirm" size="mini" {...rest} />;
}
