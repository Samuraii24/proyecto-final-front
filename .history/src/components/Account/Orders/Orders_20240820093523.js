import { useState, useEffect } from "react";
import { Order } from "@/api";
import { NoResult } from "@/components/Shared";

const orderCtrl = new Order();

export function Orders() {
  const [orders, setOrders] = useState(null);

  if (!orders) return <NoResult text="Aún no has realizado ninguna compra" />;
  return (
    <div>
      <h2>Orders</h2>
    </div>
  );
}
