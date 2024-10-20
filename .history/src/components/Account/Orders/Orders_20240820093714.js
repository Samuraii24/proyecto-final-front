import { useState, useEffect } from "react";
import { Order } from "@/api";
import { NoResult } from "@/components/Shared";
import { useAuth } from "@/hooks";

const orderCtrl = new Order();

export function Orders() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCtrl.getAll(user.id);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!orders) return <NoResult text="Aún no has realizado ninguna compra" />;
  return (
    <div>
      <h2>Orders</h2>
    </div>
  );
}
