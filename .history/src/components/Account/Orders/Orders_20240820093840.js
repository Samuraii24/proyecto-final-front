import { useState, useEffect } from "react";
import { Order } from "@/api";
import { NoResult } from "@/components/Shared";
import { useAuth } from "@/hooks";

const orderCtrl = new Order();

export function Orders() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();
  console.log(setOrders);

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCtrl.getAll(user.id);
        setOrders(response.data);
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
